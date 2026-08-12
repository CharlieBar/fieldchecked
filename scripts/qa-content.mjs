#!/usr/bin/env node
/**
 * Content QA validator.
 *
 * Runs the format rules from the project brief against every content file as
 * an actual test, so "we implemented the FAQ/schema/quick-answer requirements"
 * is a fact the build can check rather than a claim in a commit message. This
 * is step 5 of the pipeline (§8) and gates the PR in CI.
 *
 *   node scripts/qa-content.mjs [--json]
 *
 * Exit code 1 on any error. Warnings never fail the build.
 *
 * Content files are loaded directly: each one imports only types, so Node's
 * type stripping erases the import entirely and the module is self-contained.
 */
import { readdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'src', 'content');

/** Collections that carry published articles, keyed by URL segment. */
const COLLECTIONS = ['reviews', 'vs', 'guides', 'benchmarks', 'verdict', 'blog'];

/** Freshness cadence from §4 — how stale a page may get before we flag it. */
const STALENESS_DAYS = { benchmarks: 14, vs: 14, reviews: 30, guides: 30, verdict: 30, blog: 90 };

const MIN_FAQS = 8;
const QUICK_ANSWER_MIN_WORDS = 80;
const QUICK_ANSWER_MAX_WORDS = 220;
const MIN_SOURCES = 3;

const errors = [];
const warnings = [];

function fail(file, message) {
  errors.push({ file, message });
}
function warn(file, message) {
  warnings.push({ file, message });
}

function words(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function daysSince(iso) {
  return Math.floor((Date.now() - Date.parse(`${iso}T00:00:00Z`)) / 86_400_000);
}

async function loadCollection(collection) {
  const dir = path.join(CONTENT_DIR, collection);
  let files;
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }

  const loaded = [];
  for (const filename of files.filter((f) => f.endsWith('.ts') && f !== 'index.ts')) {
    const filePath = path.join(dir, filename);
    const module = await import(pathToFileURL(filePath).href);
    const content = module.default ?? Object.values(module)[0];
    if (!content || typeof content !== 'object') {
      fail(path.relative(ROOT, filePath), 'no content object exported');
      continue;
    }
    loaded.push({ file: path.relative(ROOT, filePath), collection, content });
  }
  return loaded;
}

/* ------------------------------------------------------------------ */
/* Rules                                                               */
/* ------------------------------------------------------------------ */

function checkSeo(file, collection, c) {
  const { seo } = c;
  if (!seo) return fail(file, 'missing `seo` export');

  if (!seo.title) fail(file, 'seo.title is empty');
  else if (seo.title.length > 70)
    warn(file, `seo.title is ${seo.title.length} chars — likely truncated in SERPs`);

  if (!seo.description) fail(file, 'seo.description is empty');
  else if (seo.description.length < 110 || seo.description.length > 180)
    warn(file, `seo.description is ${seo.description.length} chars — aim for 140–165`);

  if (!Array.isArray(seo.keywords) || seo.keywords.length < 3)
    fail(file, 'seo.keywords needs at least 3 entries');

  if (!seo.canonical?.startsWith('/') || !seo.canonical.endsWith('/'))
    fail(file, `seo.canonical must be a root-relative path with a trailing slash (got "${seo.canonical}")`);

  // Benchmarks key their route on `model`, everything else on `slug`.
  const key = collection === 'benchmarks' ? c.model : c.slug;
  const expected = `/${collection}/${key}/`;
  if (seo.canonical !== expected)
    fail(file, `seo.canonical "${seo.canonical}" does not match route "${expected}"`);

  if (seo.ogImage) {
    const alt = seo.ogImage.alt ?? '';
    if (!alt.trim()) fail(file, 'seo.ogImage.alt is empty');
    else if (/\.(png|jpe?g|webp|avif)$/i.test(alt) || /^image\s*\d*$/i.test(alt))
      fail(file, `seo.ogImage.alt "${alt}" is a filename, not descriptive alt text`);
  }
}

function checkStructure(file, collection, c) {
  if (!c.hero?.headline) fail(file, 'hero.headline is empty');
  if (!c.hero?.lastUpdated || Number.isNaN(Date.parse(c.hero.lastUpdated)))
    fail(file, 'hero.lastUpdated must be an ISO date (YYYY-MM-DD)');
  else {
    const age = daysSince(c.hero.lastUpdated);
    if (age < 0) fail(file, 'hero.lastUpdated is in the future');
    else if (age > (STALENESS_DAYS[collection] ?? 60))
      warn(file, `not updated in ${age} days — past the ${STALENESS_DAYS[collection]}-day cadence for /${collection}/`);
  }

  if (!c.quickAnswer) {
    fail(file, 'missing quickAnswer — the extraction target is required on every page');
  } else {
    const count = words(c.quickAnswer);
    if (count < QUICK_ANSWER_MIN_WORDS || count > QUICK_ANSWER_MAX_WORDS)
      warn(file, `quickAnswer is ${count} words — target ${QUICK_ANSWER_MIN_WORDS}–${QUICK_ANSWER_MAX_WORDS}`);
  }

  if (!Array.isArray(c.sections) || c.sections.length === 0)
    fail(file, 'sections is empty');

  if (!Array.isArray(c.faqs) || c.faqs.length < MIN_FAQS)
    fail(file, `needs at least ${MIN_FAQS} FAQs (has ${c.faqs?.length ?? 0})`);

  for (const faq of c.faqs ?? []) {
    if (!faq.question?.trim() || !faq.answer?.trim())
      fail(file, 'FAQ with an empty question or answer');
    else if (words(faq.answer) < 15)
      warn(file, `FAQ answer is very short and may not stand alone: "${faq.question}"`);
  }

  if (!c.schema?.['@type']) fail(file, 'missing schema["@type"]');
  if (!['draft', 'published'].includes(c.status))
    fail(file, `status must be "draft" or "published" (got "${c.status}")`);
}

/** Nothing carrying unverified figures may be marked published. */
function checkProvenance(file, collection, c) {
  const rows = [...(c.rows ?? []), ...(c.benchmarks ?? [])];
  for (const row of rows) {
    if (!row.status) fail(file, `benchmark row for "${row.model}" has no provenance status`);
    if (typeof row.tokensPerSec !== 'number' || Number.isNaN(row.tokensPerSec))
      fail(file, `benchmark row for "${row.model}" has a non-numeric tokensPerSec`);
    if (!row.runtime) fail(file, `benchmark row for "${row.model}" does not state a runtime`);
    if (!row.quantization)
      fail(file, `benchmark row for "${row.model}" does not state a quantisation`);
  }

  if (c.status === 'published') {
    const unverified = rows.filter((row) => row.status === 'pending-verification');
    if (unverified.length > 0)
      fail(
        file,
        `published page carries ${unverified.length} pending-verification row(s) — verify on the rig at Checkpoint 2 or keep it draft`,
      );
  }
}

function checkCollectionRules(file, collection, c) {
  if (collection === 'vs') {
    if (!c.comparisonTable?.rows?.length)
      fail(file, 'comparison pages require a comparison table above the fold');
    if (!c.schema?.itemList?.length)
      fail(file, 'comparison pages must stack ItemList schema (§6)');
    if (!c.winner?.name) fail(file, 'comparison pages must state a winner');
    if (!Array.isArray(c.contenders) || c.contenders.length < 2)
      fail(file, 'comparison pages need at least two contenders');
  }

  if (collection === 'guides') {
    if (!Array.isArray(c.requirements) || c.requirements.length === 0)
      warn(file, 'guide has no requirements list');
  }

  if (collection === 'benchmarks') {
    if (!Array.isArray(c.methodology) || c.methodology.length < 3)
      fail(file, 'benchmark pages must document methodology (at least 3 steps)');
    if (!Array.isArray(c.rows) || c.rows.length === 0)
      fail(file, 'benchmark page has no data rows');
    if (!Array.isArray(c.testRig) || c.testRig.length === 0)
      fail(file, 'benchmark page does not describe its test rig');
  }

  if (collection === 'verdict') {
    if (!c.contentLabel?.trim())
      fail(file, 'verdict pages must carry a contentLabel declaring them a curated synthesis');
    if (!Array.isArray(c.sources) || c.sources.length < MIN_SOURCES)
      fail(file, `verdict pages need at least ${MIN_SOURCES} independent sources (has ${c.sources?.length ?? 0})`);

    const hosts = new Set();
    for (const source of c.sources ?? []) {
      if (!source.url?.startsWith('https://'))
        fail(file, `source "${source.name}" has a non-https URL`);
      if (!source.summary?.trim()) fail(file, `source "${source.name}" has no summary`);
      if (!['positive', 'negative', 'mixed'].includes(source.sentiment))
        fail(file, `source "${source.name}" has an invalid sentiment`);

      try {
        const url = new URL(source.url);
        hosts.add(url.hostname.replace(/^www\./, ''));

        // A published verdict must cite the actual threads, not community
        // landing pages — the source array is the whole point of the format.
        const deep = url.pathname.split('/').filter(Boolean).length >= 3;
        if (c.status === 'published' && !deep)
          fail(
            file,
            `source "${source.name}" points at a landing page, not a specific thread — published verdicts require deep links`,
          );
      } catch {
        fail(file, `source "${source.name}" has an unparseable URL`);
      }
    }

    if (hosts.size < 2)
      warn(file, `all sources share ${hosts.size} host — "independent sources" implies more than one venue`);

    for (const theme of c.consensusThemes ?? []) {
      if (theme.supportingSourceCount > (c.sources?.length ?? 0))
        fail(
          file,
          `consensus theme "${theme.theme}" claims ${theme.supportingSourceCount} supporting sources but only ${c.sources.length} are listed`,
        );
    }
  }
}

function checkLinks(file, c, canonicals) {
  for (const link of [...(c.related ?? []), ...(c.relatedReviews ?? [])]) {
    const normalized = link.endsWith('/') ? link : `${link}/`;
    if (!canonicals.has(normalized) && !['/about/', '/contact/'].includes(normalized))
      fail(file, `internal link "${link}" does not resolve to any page`);
    if (normalized === c.seo?.canonical) fail(file, 'page links to itself in `related`');
  }
}

/* ------------------------------------------------------------------ */
/* Run                                                                 */
/* ------------------------------------------------------------------ */

const all = (await Promise.all(COLLECTIONS.map(loadCollection))).flat();

if (all.length === 0) {
  console.error('No content files found — is src/content/ populated?');
  process.exit(1);
}

const canonicals = new Set(all.map((entry) => entry.content.seo?.canonical).filter(Boolean));
const seen = new Map();

for (const { file, collection, content } of all) {
  checkSeo(file, collection, content);
  checkStructure(file, collection, content);
  checkProvenance(file, collection, content);
  checkCollectionRules(file, collection, content);
  checkLinks(file, content, canonicals);

  const canonical = content.seo?.canonical;
  if (canonical) {
    if (seen.has(canonical)) fail(file, `duplicate canonical, also used by ${seen.get(canonical)}`);
    else seen.set(canonical, file);
  }
}

const published = all.filter((entry) => entry.content.status === 'published').length;

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ errors, warnings, checked: all.length, published }, null, 2));
} else {
  for (const { file, message } of warnings) console.log(`  warn  ${file}: ${message}`);
  for (const { file, message } of errors) console.log(`  ERROR ${file}: ${message}`);

  console.log(
    `\n${all.length} content files checked · ${published} published · ` +
      `${errors.length} error(s) · ${warnings.length} warning(s)`,
  );
}

process.exit(errors.length > 0 ? 1 : 0);
