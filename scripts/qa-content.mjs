#!/usr/bin/env node
/**
 * Content QA validator.
 *
 * Runs the format rules from the project brief against every content file as
 * an actual test, so "we implemented the FAQ/schema/quick-answer requirements"
 * is a fact the build can check rather than a claim in a commit message. This
 * is step 5 of the pipeline (§8) and gates the PR in CI.
 *
 *   node scripts/qa-content.mjs [--json] [--allow-bulk-promotion]
 *
 * Exit code 1 on any error. Warnings never fail the build.
 *
 * Beyond the per-file rules it also runs two repo-wide release guards from
 * scripts/lib/release-guards.mjs: the publish-cadence cap (max 3 pages moved
 * to published per release) and the single-source-of-truth check on the brand
 * name and canonical origin.
 *
 * Content files are loaded directly: each one imports only types, so Node's
 * type stripping erases the import entirely and the module is self-contained.
 */
import { readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import {
  MAX_PROMOTIONS,
  checkPromotionCap,
  checkSingleSourceOfTruth,
} from './lib/release-guards.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'src', 'content');

/** Collections that carry published articles, keyed by URL segment. */
const COLLECTIONS = [
  'reviews', 'vs', 'guides', 'benchmarks', 'verdict', 'blog',
  'builds', 'studio', 'experiments',
];

/** Which vertical each URL pattern belongs to, for the tagging check. */
const VERTICAL_OF = {
  reviews: 'A', vs: 'A', benchmarks: 'A', verdict: 'A',
  builds: 'B', studio: 'B', experiments: 'B',
  // /guides/ and /blog/ serve both verticals and are tagged per page.
};

/** Freshness cadence from §4 — how stale a page may get before we flag it. */
const STALENESS_DAYS = {
  benchmarks: 14, vs: 14, reviews: 30, guides: 30, verdict: 30, blog: 90,
  builds: 120, studio: 120, experiments: 120,
};

const MIN_FAQS = 8;
const QUICK_ANSWER_MIN_WORDS = 80;
const QUICK_ANSWER_MAX_WORDS = 220;
const MIN_SOURCES = 3;

const errors = [];
const warnings = [];

/**
 * The hardware record, read from the same file /about/ renders. Normalised so
 * "NVIDIA RTX 4060 8GB" and "RTX 4060 8GB" compare equal, while a multi-GPU
 * label like "RTX 4060 8GB x2" deliberately does not match any single card.
 */
const { site } = await import(
  pathToFileURL(path.join(ROOT, 'src', 'content', 'global', 'site.ts')).href
);

function normaliseGpu(label) {
  return String(label ?? '')
    .toLowerCase()
    .replace(/\bnvidia\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const INVENTORY = new Set(site.hardwareInventory.map((unit) => normaliseGpu(unit.label)));

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

/**
 * Free-text throughput in a comparison table is a provenance hole: a string
 * cell carries no status, so an unverified number can reach a published page
 * without any rule seeing it. Throughput belongs in a typed BenchmarkRow.
 *
 * This is an error at any status rather than only on published pages, because
 * there is no legitimate reason to write a tokens/sec figure as free text —
 * and catching it on the draft is what stops it reaching Checkpoint 3.
 */
const THROUGHPUT_PATTERN = /\d\s*(?:tok(?:ens)?\s*\/\s*s(?:ec)?|tokens?\s+per\s+second|t\/s)\b/i;

function checkFreeTextThroughput(file, c) {
  const tables = [];
  if (c.comparisonTable?.rows) {
    tables.push({ label: 'comparisonTable', rows: c.comparisonTable.rows });
  }
  for (const [index, section] of (c.sections ?? []).entries()) {
    if (section.type === 'table' && section.rows) {
      tables.push({ label: `sections[${index}]`, rows: section.rows });
    }
  }

  for (const table of tables) {
    for (const row of table.rows) {
      for (const cell of row) {
        if (typeof cell?.value === 'string' && THROUGHPUT_PATTERN.test(cell.value)) {
          fail(
            file,
            `${table.label} cell "${cell.value}" states a throughput figure as free text. ` +
              'A table cell carries no provenance — move it into a typed `benchmarks` ' +
              'BenchmarkRow so it has a status the validator can check.',
          );
        }
      }
    }
  }
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

  // A row we intend to measure must name hardware we actually have. Without
  // this, a page can sit in `pending-verification` forever waiting on a card
  // nobody owns — which is how the seed content ended up claiming results on
  // an RTX 3090 and a dual-3090 rig that were never going to exist.
  for (const row of rows) {
    if (row.status !== 'pending-verification') continue;
    if (!INVENTORY.has(normaliseGpu(row.gpu))) {
      fail(
        file,
        `row "${row.gpu}" (${row.model}) is pending-verification but that GPU is not in the ` +
          `hardware inventory in src/content/global/site.ts [${[...INVENTORY].join(', ')}]. ` +
          'Retarget it onto owned hardware, retag it as community-reported with a source, or delete it.',
      );
    }
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

/**
 * Vertical B rules. Each pillar has one thing that makes its posts verifiable
 * rather than promotional, and each is required before publication:
 *   builds      — an artifact, and stated limitations
 *   studio      — a sample with an asset that exists on disk
 *   experiments — a data point, a result, and caveats
 */
function checkVerticalB(file, collection, c) {
  if (collection === 'builds') {
    if (!Array.isArray(c.artifacts) || c.artifacts.length === 0)
      fail(file, 'build pages require at least 1 artifact — a build post without one is a claim');
    if (!Array.isArray(c.limitations) || c.limitations.length === 0)
      fail(file, 'build pages require a non-empty `limitations` list — a build with no stated limitations is marketing, not a field report');

    const labels = new Set((c.artifacts ?? []).map((a) => a.label));
    for (const artifact of c.artifacts ?? []) {
      if (!artifact.caption?.trim()) fail(file, `artifact "${artifact.label}" has no caption`);
      if (artifact.url && !artifact.url.startsWith('https://'))
        fail(file, `artifact "${artifact.label}" has a non-https URL`);
    }

    if (c.status === 'published') {
      for (const result of c.results ?? []) {
        if (result.provenance !== 'measured') continue;
        if (!result.artifactLabel || !labels.has(result.artifactLabel))
          fail(
            file,
            `result "${result.metric}" is marked measured but does not point at an artifact ` +
              `(artifactLabel must be one of: ${[...labels].join(', ') || 'none defined'})`,
          );
      }
    }
  }

  if (collection === 'studio') {
    if (!Array.isArray(c.samples) || c.samples.length === 0) {
      fail(file, 'studio pages require at least 1 sample — no pipeline described without output shown');
      return;
    }
    for (const sample of c.samples) {
      if (!sample.imagePath?.startsWith('/'))
        fail(file, `sample "${sample.label}" needs a root-relative imagePath under /public`);
      else if (c.status === 'published') {
        // Only enforced at publish: a draft may reference an asset not yet produced.
        const asset = path.join(ROOT, 'public', sample.imagePath.replace(/^\//, ''));
        if (!existsSync(asset))
          fail(
            file,
            `sample "${sample.label}" points at ${sample.imagePath} which does not exist in /public — ` +
              'a published studio page must show real output',
          );
      }
    }
  }

  if (collection === 'experiments') {
    if (!['confirmed', 'refuted', 'inconclusive'].includes(c.result))
      fail(file, `experiment result must be confirmed | refuted | inconclusive (got "${c.result}")`);
    if (!Array.isArray(c.caveats) || c.caveats.length === 0)
      fail(file, 'experiment pages require non-empty `caveats` — an n=1 result with no stated limits overclaims');

    if (c.status === 'published') {
      if (!Array.isArray(c.dataPoints) || c.dataPoints.length === 0)
        fail(
          file,
          'published experiment pages require at least 1 dataPoint — publishing a conclusion ' +
            'with no measurements behind it is the exact failure this pillar exists to avoid',
        );
      for (const point of c.dataPoints ?? []) {
        if (typeof point.before !== 'number' || typeof point.after !== 'number')
          fail(file, `dataPoint "${point.metric}" must have numeric before/after values`);
        if (!['GSC', 'GA4', 'Plausible', 'manual-observation'].includes(point.source))
          fail(file, `dataPoint "${point.metric}" has an unrecognised source "${point.source}"`);
      }
    }
  }
}

/** Every page declares its vertical, and it must match its URL pattern. */
function checkVertical(file, collection, c) {
  if (!['A', 'B'].includes(c.vertical)) {
    fail(file, `vertical must be "A" or "B" (got "${c.vertical}") — needed for per-vertical GSC attribution`);
    return;
  }
  const expected = VERTICAL_OF[collection];
  if (expected && c.vertical !== expected)
    fail(file, `/${collection}/ is Vertical ${expected} but this page is tagged "${c.vertical}"`);
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
  checkFreeTextThroughput(file, content);
  checkCollectionRules(file, collection, content);
  checkVerticalB(file, collection, content);
  checkVertical(file, collection, content);
  checkLinks(file, content, canonicals);

  const canonical = content.seo?.canonical;
  if (canonical) {
    if (seen.has(canonical)) fail(file, `duplicate canonical, also used by ${seen.get(canonical)}`);
    else seen.set(canonical, file);
  }
}

const published = all.filter((entry) => entry.content.status === 'published').length;

/* ------------------------------------------------------------------ */
/* Repo-wide release guards                                            */
/* ------------------------------------------------------------------ */

const allowBulk =
  process.argv.includes('--allow-bulk-promotion') || process.env.ALLOW_BULK_PROMOTION === '1';

for (const problem of await checkSingleSourceOfTruth({ cwd: ROOT, site })) {
  fail(problem.file, problem.message);
}

const promotion = await checkPromotionCap({ cwd: ROOT, allowBulk });
for (const message of promotion.errors) fail('release', message);

if (process.argv.includes('--json')) {
  console.log(
    JSON.stringify(
      {
        errors,
        warnings,
        checked: all.length,
        published,
        promotions: promotion.promotions,
        promotionCap: MAX_PROMOTIONS,
        promotionCheckSkipped: promotion.skipped ? promotion.reason : false,
      },
      null,
      2,
    ),
  );
} else {
  for (const { file, message } of warnings) console.log(`  warn  ${file}: ${message}`);
  for (const { file, message } of errors) console.log(`  ERROR ${file}: ${message}`);

  if (promotion.skipped) {
    console.log(`  note  promotion cap: ${promotion.reason}`);
  } else {
    for (const note of promotion.notes) console.log(`  note  promotion cap: ${note}`);
    const verb = allowBulk && promotion.promotions.length > MAX_PROMOTIONS ? ' (override active)' : '';
    console.log(
      `  note  this branch publishes ${promotion.promotions.length} page(s), cap ${MAX_PROMOTIONS}${verb}`,
    );
    for (const item of promotion.promotions) {
      console.log(`          · ${item.file} (${item.kind})`);
    }
  }

  console.log(
    `\n${all.length} content files checked · ${published} published · ` +
      `${errors.length} error(s) · ${warnings.length} warning(s)`,
  );
}

process.exit(errors.length > 0 ? 1 : 0);
