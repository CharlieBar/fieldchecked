/**
 * Release guards — checks that need git history or a repo-wide scan, rather
 * than the per-file content rules in qa-content.mjs.
 *
 * 1. Promotion cap. Publishing is staggered on purpose: a burst of new URLs
 *    indexed on the same day makes it impossible to attribute a ranking change
 *    to any one page, which is the whole point of the experiment. This fails
 *    the build when a branch promotes more than MAX_PROMOTIONS pages.
 *
 * 2. Single source of truth. The brand name and the canonical origin live in
 *    src/content/global/site.ts. This fails the build if either gets copied
 *    anywhere else, so "changing the domain is a one-file edit" stays a fact.
 */
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const MAX_PROMOTIONS = 3;

const SITE_FILE = 'src/content/global/site.ts';

function git(args, { cwd }) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function tryGit(args, { cwd }) {
  try {
    return git(args, { cwd });
  } catch {
    return null;
  }
}

/** Parse the publish status out of a content file's source. */
function statusOf(source) {
  const match = /^\s*status:\s*'(draft|published)'/m.exec(source ?? '');
  return match ? match[1] : null;
}

/**
 * Work out what to diff against.
 *
 * In a pull request the base branch is the right comparison. On a push to a
 * branch, the merge-base with the default branch is. QA_BASE_REF overrides
 * both, which is what makes this testable.
 */
function resolveBaseRef(cwd) {
  if (process.env.QA_BASE_REF) {
    return tryGit(['rev-parse', '--verify', `${process.env.QA_BASE_REF}^{commit}`], { cwd })
      ? { ref: process.env.QA_BASE_REF, source: 'QA_BASE_REF' }
      : { ref: null, source: `QA_BASE_REF=${process.env.QA_BASE_REF} (not found)` };
  }

  // GitHub Actions sets GITHUB_BASE_REF only on pull_request events.
  if (process.env.GITHUB_BASE_REF) {
    const remote = `origin/${process.env.GITHUB_BASE_REF}`;
    if (tryGit(['rev-parse', '--verify', `${remote}^{commit}`], { cwd })) {
      return { ref: remote, source: 'pull request base' };
    }
  }

  for (const candidate of ['origin/main', 'main']) {
    if (!tryGit(['rev-parse', '--verify', `${candidate}^{commit}`], { cwd })) continue;
    const mergeBase = tryGit(['merge-base', 'HEAD', candidate], { cwd });
    if (mergeBase) return { ref: mergeBase, source: `merge-base with ${candidate}` };
  }

  return { ref: null, source: 'no base branch reachable' };
}

/**
 * Count pages this branch moves onto the live index.
 *
 * Two things count toward the same cap, because they have the same effect on
 * indexing: a page whose status flips draft → published, and a brand-new file
 * added already published.
 */
export async function checkPromotionCap({ cwd, allowBulk }) {
  const result = { skipped: false, reason: '', promotions: [], errors: [], notes: [] };

  if (!tryGit(['rev-parse', '--git-dir'], { cwd })) {
    result.skipped = true;
    result.reason = 'not a git repository';
    return result;
  }

  const { ref: base, source } = resolveBaseRef(cwd);

  if (!base) {
    // Being unable to resolve a base must not become a way to slip a bulk
    // promotion through CI unnoticed.
    if (process.env.CI) {
      result.errors.push(
        `Cannot resolve a base ref to diff against (${source}). ` +
          'The promotion cap cannot be enforced. Ensure the workflow checks out ' +
          'enough history (actions/checkout with fetch-depth: 0).',
      );
    } else {
      result.skipped = true;
      result.reason = `${source} — promotion cap not checked locally`;
    }
    return result;
  }

  result.notes.push(`comparing against ${base.slice(0, 12)} (${source})`);

  // The launch itself is exempt, and only ever once: if the base commit has no
  // content pages at all, there is no prior state to attribute a ranking change
  // against, so staggering the first release would buy nothing. As soon as the
  // default branch carries content, the cap applies normally.
  const baseContent = tryGit(['ls-tree', '-r', '--name-only', base, 'src/content/'], { cwd }) ?? '';
  const basePages = baseContent
    .split('\n')
    .filter((line) => line.endsWith('.ts') && !line.endsWith('index.ts'));

  if (basePages.length === 0) {
    result.skipped = true;
    result.reason = 'initial launch — base branch has no content pages, nothing to attribute against';
    return result;
  }

  const changed = tryGit(['diff', '--name-only', `${base}...HEAD`, '--', 'src/content'], { cwd });
  if (changed === null) {
    result.skipped = true;
    result.reason = 'git diff failed';
    return result;
  }

  const files = changed.split('\n').filter((line) => line.endsWith('.ts') && !line.endsWith('index.ts'));

  for (const file of files) {
    const before = tryGit(['show', `${base}:${file}`], { cwd });
    let after = null;
    try {
      after = await readFile(path.join(cwd, file), 'utf8');
    } catch {
      continue; // Deleted on this branch.
    }

    const wasStatus = statusOf(before);
    const nowStatus = statusOf(after);
    if (nowStatus !== 'published') continue;

    if (before === null) {
      result.promotions.push({ file, kind: 'added as published' });
    } else if (wasStatus === 'draft') {
      result.promotions.push({ file, kind: 'draft → published' });
    }
  }

  if (result.promotions.length > MAX_PROMOTIONS && !allowBulk) {
    result.errors.push(
      `This branch publishes ${result.promotions.length} pages; the cap is ${MAX_PROMOTIONS} per release.\n` +
        result.promotions.map((p) => `           · ${p.file} (${p.kind})`).join('\n') +
        '\n         Staggering releases is what keeps ranking changes attributable to a\n' +
        '         specific page. Split this into separate PRs, or if the burst is\n' +
        '         deliberate, re-run with --allow-bulk-promotion (or ALLOW_BULK_PROMOTION=1)\n' +
        '         and record the reason in EXPERIMENT-LOG.md.',
    );
  }

  return result;
}

/** Strip comments so a brand name in a code comment is not a false positive. */
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
}

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else if (/\.(ts|tsx|mjs)$/.test(entry.name)) out.push(full);
  }
  return out;
}

/**
 * Fail if the canonical origin or the brand name is duplicated outside
 * site.ts. The design layer must not contain brand strings; prose copy under
 * src/content/ legitimately may.
 */
export async function checkSingleSourceOfTruth({ cwd, site }) {
  const errors = [];
  const origin = site.url;
  const host = new URL(origin).host.replace(/^www\./, '').split('.')[0];
  const originPattern = new RegExp(`https?://[\\w.-]*${host}[\\w.-]*`, 'i');

  const files = [
    ...(await walk(path.join(cwd, 'src'))),
    ...(await walk(path.join(cwd, 'scripts'))),
  ];

  for (const absolute of files) {
    const relative = path.relative(cwd, absolute).split(path.sep).join('/');
    if (relative === SITE_FILE) continue;

    const source = await readFile(absolute, 'utf8');
    const code = stripComments(source);

    const url = originPattern.exec(code);
    if (url) {
      errors.push({
        file: relative,
        message: `hardcodes the site origin ("${url[0]}") — derive it from site.url in ${SITE_FILE}`,
      });
    }

    // Brand strings are only a problem in the design layer. Content files are
    // allowed to say the brand name in prose the reader actually sees.
    const isDesignLayer = relative.startsWith('src/app/') || relative.startsWith('src/components/');
    if (isDesignLayer && code.includes(site.name)) {
      errors.push({
        file: relative,
        message: `hardcodes the brand name "${site.name}" — use site.name from ${SITE_FILE}`,
      });
    }
  }

  return errors;
}
