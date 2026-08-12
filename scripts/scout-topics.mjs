#!/usr/bin/env node
/**
 * Pipeline stage 1 — topic scouting (Haiku).
 *
 *   npm run pipeline:scout -- --pillar vs --count 5
 *
 * Reads the existing content registry so it proposes gaps rather than
 * duplicates, then stops at Checkpoint 1 for a human to approve the topic,
 * the angle and the target keyword before a single word gets drafted.
 */
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import {
  MODELS,
  ROOT,
  checkpointBanner,
  client,
  generateStructured,
  houseRules,
  loadSite,
  logCheckpoint,
} from './lib/pipeline.mjs';

const args = process.argv.slice(2);
const pillar = valueOf('--pillar') ?? 'any';
const count = Number(valueOf('--count') ?? 5);

function valueOf(flag) {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

const SCHEMA = {
  type: 'object',
  properties: {
    candidates: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          pillar: {
            type: 'string',
            enum: ['reviews', 'vs', 'guides', 'benchmarks', 'verdict', 'blog'],
          },
          slug: { type: 'string' },
          workingTitle: { type: 'string' },
          targetKeyword: { type: 'string' },
          angle: { type: 'string' },
          whyNow: { type: 'string' },
          gapFilled: { type: 'string' },
          verifiabilityRisk: {
            type: 'string',
            enum: ['low', 'medium', 'high'],
          },
        },
        required: [
          'pillar',
          'slug',
          'workingTitle',
          'targetKeyword',
          'angle',
          'whyNow',
          'gapFilled',
          'verifiabilityRisk',
        ],
        additionalProperties: false,
      },
    },
  },
  required: ['candidates'],
  additionalProperties: false,
};

async function existingSlugs() {
  const contentDir = path.join(ROOT, 'src', 'content');
  const pillars = ['reviews', 'vs', 'guides', 'benchmarks', 'verdict', 'blog'];
  const listing = [];
  for (const dir of pillars) {
    try {
      const files = await readdir(path.join(contentDir, dir));
      for (const file of files.filter((f) => f.endsWith('.ts'))) {
        listing.push(`${dir}/${file.replace(/\.ts$/, '')}`);
      }
    } catch {
      // Pillar directory not created yet.
    }
  }
  return listing;
}

const site = await loadSite();
const published = await existingSlugs();

const prompt = `We publish at ${site.name}, a benchmark-driven site about local AI hardware:
GPU reviews, comparisons, setup guides, tokens/sec datasets, curated community
verdicts, and news explainers.

Content that already exists (do not propose these again):
${published.map((slug) => `- ${slug}`).join('\n')}

Propose ${count} topic candidates${pillar === 'any' ? ' across any pillar' : ` for the /${pillar}/ pillar`}.

For each candidate state the gap it fills against the list above, and rate
verifiabilityRisk: how hard would it be for a one-person publication with a
single RTX 4080 Super workstation to fact-check the central claims? Rate 'high'
if the piece would require hardware we do not own, and say so plainly — a topic
we cannot verify is a topic we should not publish.

Favour long-tail queries a person types when they are about to spend money, over
broad head terms we have no chance of ranking for.`;

const anthropic = client();

const { data, raw } = await generateStructured({
  anthropic,
  model: MODELS.scout,
  system: `You scout topics for a small, honest technical publication.\n\n${houseRules(site.name)}`,
  prompt,
  schema: SCHEMA,
});

for (const [index, candidate] of data.candidates.entries()) {
  console.log(`\n${index + 1}. [${candidate.pillar}] ${candidate.workingTitle}`);
  console.log(`   slug:     ${candidate.slug}`);
  console.log(`   keyword:  ${candidate.targetKeyword}`);
  console.log(`   angle:    ${candidate.angle}`);
  console.log(`   why now:  ${candidate.whyNow}`);
  console.log(`   gap:      ${candidate.gapFilled}`);
  console.log(`   verify:   ${candidate.verifiabilityRisk} risk`);
}

await logCheckpoint({
  stage: 'scout',
  checkpoint: 1,
  model: MODELS.scout,
  pillar,
  candidates: data.candidates.length,
  usage: raw.usage,
});

checkpointBanner(
  1,
  'Approve topic, angle and target keyword',
  [
    'Before drafting, confirm for the candidate you pick:',
    '  · the keyword is one real people search, not one that sounds plausible',
    '  · the angle is something we can say honestly with the hardware we own',
    '  · verifiabilityRisk is not "high" — if it is, drop it or buy the hardware',
    '',
    'Then draft it:',
    '  npm run pipeline:draft -- --pillar <pillar> --slug <slug> --keyword "<keyword>"',
  ].join('\n'),
);
