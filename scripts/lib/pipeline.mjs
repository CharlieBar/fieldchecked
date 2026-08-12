/**
 * Shared plumbing for the publishing pipeline (§8 of the brief).
 *
 * Model routing is fixed here rather than in each script so the three-model
 * split stays visible in one place:
 *
 *   scout  → Haiku 4.5  — cheap, high-volume topic scanning
 *   draft  → Sonnet 5   — the writing pass
 *   qa     → Opus 5     — final technical SEO / schema review
 *
 * Every stage writes a checkpoint record. The point of the log is to find out
 * which human checkpoints actually catch errors and which ones rubber-stamp,
 * so the loosen-later decision on the business sites is made from data.
 */
import Anthropic from '@anthropic-ai/sdk';
import { appendFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

export const ROOT = path.resolve(import.meta.dirname, '..', '..');
export const LOG_PATH = path.join(ROOT, '.pipeline', 'checkpoints.jsonl');

export const MODELS = {
  scout: 'claude-haiku-4-5',
  draft: 'claude-sonnet-5',
  qa: 'claude-opus-5',
};

export function client() {
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    console.error(
      'No credentials found. Set ANTHROPIC_API_KEY, or run `ant auth login` and\n' +
        'the SDK will pick up the stored profile automatically.',
    );
    process.exit(1);
  }
  return new Anthropic();
}

/**
 * The house rules every stage is held to. These are the parts of the brief a
 * model must not quietly drop — the experiment only measures anything if the
 * format requirements are actually present on every page.
 */
export const HOUSE_RULES = `
FieldChecked house rules — these are hard requirements, not preferences:

1. Provenance. Every numeric claim carries a status: 'measured' (reproduced on
   our own rig), 'pending-verification', 'community-reported', or
   'vendor-claimed'. Never invent a number and never mark anything 'measured' —
   only a human at Checkpoint 2 may do that.
2. Quick answer. 100-150 words, must stand alone if lifted out of the page and
   still answer the query. This is the extraction target for AI assistants.
3. FAQs. At least 8, phrased as queries people actually type, each answer
   self-contained. No filler questions.
4. Schema. Every page declares a schema hint. Comparison and listicle pages
   additionally declare an itemList.
5. Curated verdict pages must be labelled as synthesis, cite 3+ genuinely
   independent sources as deep links to specific threads, and paraphrase rather
   than quote at length. Never fabricate a source, a URL, or a consensus.
6. Voice. Direct and specific. No hype, no "in today's fast-paced world", no
   hedging a claim you can just state. Assume a reader who builds their own PCs.
7. Content files are TypeScript conforming to src/types/content.ts. Copy lives
   in src/content/ only — never inline in a component.
`.trim();

/** Read a file relative to the repo root. */
export function readRepoFile(relativePath) {
  return readFile(path.join(ROOT, relativePath), 'utf8');
}

/**
 * Append a checkpoint record. `caught` is the field that earns its keep over
 * time: an empty array run after run means that checkpoint is a rubber stamp.
 */
export async function logCheckpoint(record) {
  await mkdir(path.dirname(LOG_PATH), { recursive: true });
  const entry = { timestamp: new Date().toISOString(), ...record };
  await appendFile(LOG_PATH, `${JSON.stringify(entry)}\n`);
  return entry;
}

/**
 * Streamed request. Streaming is the default here because drafting a full
 * content file runs well past the point where a non-streaming request risks
 * an HTTP timeout.
 */
export async function generate({
  anthropic,
  model,
  system,
  prompt,
  maxTokens = 32000,
  effort,
  onText,
}) {
  const params = {
    model,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: prompt }],
  };

  // Haiku 4.5 does not accept the effort parameter; the 5-series models do.
  if (effort && model !== MODELS.scout) {
    params.output_config = { effort };
  }

  const stream = anthropic.messages.stream(params);
  if (onText) stream.on('text', onText);

  const message = await stream.finalMessage();

  if (message.stop_reason === 'refusal') {
    throw new Error(
      `Request declined (${message.stop_details?.category ?? 'unspecified'}). ` +
        'Nothing was written.',
    );
  }

  return message;
}

/** Structured request — used where the caller needs parseable output. */
export async function generateStructured({
  anthropic,
  model,
  system,
  prompt,
  schema,
  maxTokens = 8000,
}) {
  const message = await anthropic.messages.create({
    model,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: prompt }],
    output_config: { format: { type: 'json_schema', schema } },
  });

  if (message.stop_reason === 'refusal') {
    throw new Error('Request declined; nothing was written.');
  }

  const text = message.content.find((block) => block.type === 'text')?.text ?? '';
  return { raw: message, data: JSON.parse(text) };
}

export function checkpointBanner(number, title, instructions) {
  const line = '─'.repeat(64);
  console.log(`\n${line}`);
  console.log(`CHECKPOINT ${number} — ${title}`);
  console.log(line);
  console.log(instructions);
  console.log(`${line}\n`);
}
