#!/usr/bin/env node
/**
 * Checkpoint ledger.
 *
 *   npm run pipeline:log -- --checkpoint 2 --slug rtx-5080-vs-4090 \
 *     --caught "invented 5080 bandwidth spec; two FAQs were filler"
 *   npm run pipeline:log -- --report
 *
 * The brief asks which checkpoints actually catch errors and which rubber-stamp,
 * because that answer decides which ones are safe to loosen on the business
 * sites later. That question is only answerable if every review is recorded,
 * including the ones where nothing was found — a checkpoint with a long run of
 * empty catches is the finding.
 */
import { readFile } from 'node:fs/promises';
import { LOG_PATH, logCheckpoint } from './lib/pipeline.mjs';

const args = process.argv.slice(2);

function valueOf(flag) {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

async function readLog() {
  try {
    const raw = await readFile(LOG_PATH, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch {
    return [];
  }
}

if (args.includes('--report')) {
  const entries = await readLog();
  const reviews = entries.filter((entry) => entry.stage === 'human-review');

  if (reviews.length === 0) {
    console.log('No human reviews logged yet.');
    process.exit(0);
  }

  const byCheckpoint = new Map();
  for (const review of reviews) {
    const bucket = byCheckpoint.get(review.checkpoint) ?? { total: 0, caught: 0, items: [] };
    bucket.total += 1;
    if (review.caught && review.caught.trim() && review.caught.trim() !== 'nothing') {
      bucket.caught += 1;
      bucket.items.push(review.caught);
    }
    byCheckpoint.set(review.checkpoint, bucket);
  }

  console.log('Checkpoint effectiveness\n');
  for (const [checkpoint, bucket] of [...byCheckpoint].sort((a, b) => a[0] - b[0])) {
    const rate = ((bucket.caught / bucket.total) * 100).toFixed(0);
    console.log(`Checkpoint ${checkpoint}: caught something in ${bucket.caught}/${bucket.total} reviews (${rate}%)`);
    for (const item of bucket.items.slice(-5)) {
      console.log(`   · ${item}`);
    }
    console.log();
  }

  console.log(
    'A checkpoint at a low rate across many reviews is a candidate to loosen.\n' +
      'A checkpoint that keeps catching things stays manual — especially Checkpoint 2.',
  );
  process.exit(0);
}

const checkpoint = Number(valueOf('--checkpoint'));
const slug = valueOf('--slug');
const caught = valueOf('--caught') ?? 'nothing';

if (!checkpoint || !slug) {
  console.error(
    'Usage:\n' +
      '  npm run pipeline:log -- --checkpoint <1|2|3> --slug <slug> --caught "<what you found>"\n' +
      '  npm run pipeline:log -- --report',
  );
  process.exit(1);
}

const entry = await logCheckpoint({
  stage: 'human-review',
  checkpoint,
  slug,
  caught,
});

console.log(`Logged checkpoint ${checkpoint} for ${slug}: ${entry.caught}`);
