#!/usr/bin/env node
/**
 * Pipeline stage 2 — drafting (Sonnet).
 *
 *   npm run pipeline:draft -- --pillar vs --slug rtx-5080-vs-rtx-4090 \
 *     --keyword "rtx 5080 vs 4090 for local llm"
 *
 * Writes a content file conforming to src/types/content.ts, then stops at
 * Checkpoint 2 — the fact-check gate, and the one the brief flags as most
 * likely to matter. Everything it produces is written as status: 'draft' with
 * pending-verification data, so nothing it invents can reach the index before
 * a human has reproduced it on the rig.
 */
import { access, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  MODELS,
  ROOT,
  checkpointBanner,
  client,
  generate,
  houseRules,
  loadSite,
  logCheckpoint,
  readRepoFile,
} from './lib/pipeline.mjs';

const args = process.argv.slice(2);
const pillar = valueOf('--pillar');
const slug = valueOf('--slug');
const keyword = valueOf('--keyword');

function valueOf(flag) {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

if (!pillar || !slug || !keyword) {
  console.error(
    'Usage: npm run pipeline:draft -- --pillar <pillar> --slug <slug> --keyword "<keyword>"',
  );
  process.exit(1);
}

const VALID = ['reviews', 'vs', 'guides', 'benchmarks', 'verdict', 'blog'];
if (!VALID.includes(pillar)) {
  console.error(`--pillar must be one of: ${VALID.join(', ')}`);
  process.exit(1);
}

const target = path.join(ROOT, 'src', 'content', pillar, `${slug}.ts`);
try {
  await access(target);
  console.error(`${path.relative(ROOT, target)} already exists. Pick another slug.`);
  process.exit(1);
} catch {
  // Good — the file does not exist yet.
}

const site = await loadSite();

// The type definitions are the spec. Handing them over verbatim beats
// describing the shape in prose and then hoping the description stayed current.
const types = await readRepoFile('src/types/content.ts');

/** A finished file of the same kind, as a worked example of house voice. */
const EXEMPLARS = {
  reviews: 'src/content/reviews/rtx-4080-super-local-llm.ts',
  vs: 'src/content/vs/rtx-4080-super-vs-rtx-3090.ts',
  guides: 'src/content/guides/multi-gpu-setup-for-local-ai.ts',
  benchmarks: 'src/content/benchmarks/qwen3-14b.ts',
  verdict: 'src/content/verdict/rtx-5080-local-ai-reddit.ts',
  blog: 'src/content/blog/vram-is-still-the-bottleneck.ts',
};

let exemplar = '';
try {
  exemplar = await readRepoFile(EXEMPLARS[pillar]);
} catch {
  // No exemplar for this pillar yet; the type definitions carry the contract.
}

const EXPORT_NAME = {
  reviews: 'review',
  vs: 'comparison',
  guides: 'guide',
  benchmarks: 'benchmark',
  verdict: 'verdict',
  blog: 'post',
}[pillar];

const today = new Date().toISOString().slice(0, 10);

const system = `You write content files for ${site.name}, a benchmark-driven publication
about local AI hardware. You produce TypeScript source, not prose.

${houseRules(site.name)}

The content contract you must satisfy:

\`\`\`typescript
${types}
\`\`\`

${exemplar ? `A finished file of this kind, for voice and structure:\n\n\`\`\`typescript\n${exemplar}\n\`\`\`` : ''}

Output rules:
- Emit ONLY the TypeScript file contents. No markdown fences, no commentary.
- Export a const named \`${EXPORT_NAME}\` and a matching default export.
- status must be 'draft'. Every benchmark row status must be
  'pending-verification'. You have not measured anything.
- datePublished and hero.lastUpdated: ${today}
- seo.canonical must be exactly '/${pillar}/${slug}/'
- related[] may only reference pages that exist in the exemplar's related
  lists or that you are confident exist. A dangling link fails CI.`;

const prompt = `Write the content file for:

  pillar:  ${pillar}
  slug:    ${slug}
  keyword: ${keyword}

Target that keyword honestly: if the truthful answer is "this is the wrong
product for that job", write that. We would rather be right than upbeat.

Where a number is needed, give a plausible figure and mark it
'pending-verification' — a human replaces it with a measurement before this
page can be published. Do not present any figure as something we measured.`;

const anthropic = client();

console.log(`Drafting ${pillar}/${slug} with ${MODELS.draft}…\n`);

const message = await generate({
  anthropic,
  model: MODELS.draft,
  system,
  prompt,
  maxTokens: 32000,
  effort: 'high',
  onText: (delta) => process.stdout.write(delta),
});

const body = message.content
  .filter((block) => block.type === 'text')
  .map((block) => block.text)
  .join('')
  .replace(/^```(?:typescript|ts)?\n/, '')
  .replace(/\n```\s*$/, '')
  .trim();

await writeFile(target, `${body}\n`, 'utf8');

await logCheckpoint({
  stage: 'draft',
  checkpoint: 2,
  model: MODELS.draft,
  pillar,
  slug,
  keyword,
  file: path.relative(ROOT, target),
  usage: message.usage,
});

console.log(`\n\nWrote ${path.relative(ROOT, target)}`);

checkpointBanner(
  2,
  'Fact-check against the rig — the checkpoint that matters',
  [
    'Register the file in src/content/index.ts, then run: npm run qa',
    '',
    'Now read every claim as an adversary:',
    '  · Reproduce each benchmark row on the rig. Replace the number with what',
    '    you measured and set status to "measured". If you cannot reproduce it,',
    '    delete the row — do not publish a guess.',
    '  · Check every spec against the vendor page. Model names, VRAM, bandwidth',
    '    and TDP are exactly the details that get invented convincingly.',
    '  · On a verdict page, open every source URL. If it does not resolve to a',
    '    real thread saying roughly what the summary claims, the page does not ship.',
    '  · Check the FAQs are questions people ask, not questions that sound askable.',
    '',
    'Record what this checkpoint caught — that record is the experiment:',
    '  npm run pipeline:log -- --checkpoint 2 --slug ' + slug + ' --caught "…"',
  ].join('\n'),
);
