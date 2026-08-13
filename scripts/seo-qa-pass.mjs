#!/usr/bin/env node
/**
 * Pipeline stage 3 — technical SEO and schema review (Opus).
 *
 *   npm run pipeline:seo -- --file src/content/vs/rtx-5080-vs-rtx-4090.ts
 *
 * Runs after the deterministic validator, not instead of it: scripts/qa-content.mjs
 * checks what a rule can check, and this pass looks at the things a rule cannot —
 * whether the quick answer really stands alone, whether the FAQs are questions
 * anyone types, whether the schema hints describe the page that actually exists.
 * Ends at Checkpoint 3, the publish gate.
 */
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
  readRepoFile,
} from './lib/pipeline.mjs';

const args = process.argv.slice(2);
const fileArg = args[args.indexOf('--file') + 1];

if (!fileArg || fileArg.startsWith('--')) {
  console.error('Usage: npm run pipeline:seo -- --file src/content/<pillar>/<slug>.ts');
  process.exit(1);
}

const SCHEMA = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['ship', 'revise', 'block'] },
    summary: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          severity: { type: 'string', enum: ['blocker', 'major', 'minor'] },
          area: {
            type: 'string',
            enum: [
              'metadata',
              'schema',
              'quick-answer',
              'faqs',
              'internal-linking',
              'provenance',
              'accuracy',
              'voice',
            ],
          },
          finding: { type: 'string' },
          fix: { type: 'string' },
        },
        required: ['severity', 'area', 'finding', 'fix'],
        additionalProperties: false,
      },
    },
  },
  required: ['verdict', 'summary', 'findings'],
  additionalProperties: false,
};

const site = await loadSite();
const content = await readRepoFile(fileArg);
const types = await readRepoFile('src/types/content.ts');

const system = `You review content files for ${site.name} before publication.

${houseRules(site.name)}

The content contract:

\`\`\`typescript
${types}
\`\`\`

Report every issue you find, including ones you are uncertain about or consider
low-severity. Do not filter for importance — a human triages afterwards, and it
is better to surface a finding that gets dismissed than to silently drop a real
problem. Mark a finding 'blocker' only when publishing as-is would put something
false or unverifiable in front of a reader.

Judge what a linter cannot:
- Does the quick answer actually answer the query if you read it alone, with no
  page around it?
- Would a person type these FAQ questions, or do they only look like questions?
- Do the schema hints describe the page that exists, or an idealised one?
- Is any figure presented with more confidence than its provenance supports?
- Does the title promise something the body does not deliver?`;

const prompt = `Review this content file:

\`\`\`typescript
${content}
\`\`\``;

const anthropic = client();

console.log(`Reviewing ${fileArg} with ${MODELS.qa}…\n`);

const { data, raw } = await generateStructured({
  anthropic,
  model: MODELS.qa,
  system,
  prompt,
  schema: SCHEMA,
  maxTokens: 16000,
});

const ORDER = { blocker: 0, major: 1, minor: 2 };
const findings = [...data.findings].sort(
  (a, b) => ORDER[a.severity] - ORDER[b.severity],
);

console.log(`Verdict: ${data.verdict.toUpperCase()}`);
console.log(`${data.summary}\n`);

for (const finding of findings) {
  console.log(`[${finding.severity}] ${finding.area}: ${finding.finding}`);
  console.log(`  fix: ${finding.fix}\n`);
}

const blockers = findings.filter((f) => f.severity === 'blocker').length;

await logCheckpoint({
  stage: 'seo-qa',
  checkpoint: 3,
  model: MODELS.qa,
  file: path.relative(ROOT, path.resolve(ROOT, fileArg)),
  verdict: data.verdict,
  findings: findings.length,
  blockers,
  usage: raw.usage,
});

checkpointBanner(
  3,
  'Publish approval',
  [
    'Before flipping status to "published":',
    '  · npm run qa passes (typecheck + content validator)',
    '  · every benchmark row on the page is status "measured"',
    '  · every verdict source is a deep link you have opened yourself',
    '  · an EXPERIMENT-LOG.md entry exists with the hypothesis and metric',
    '',
    'Then commit, open a PR, and let the merge trigger the Netlify deploy.',
  ].join('\n'),
);

process.exit(blockers > 0 ? 1 : 0);
