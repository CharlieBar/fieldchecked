/**
 * Content registry.
 *
 * Every content file is imported statically here so that routes stay fully
 * typed and statically analysable — no filesystem globbing at request time.
 * Adding a post is a two-line change: create the file, register it below.
 * The automation pipeline (scripts/draft-post.mjs) appends to this file.
 */
import type {
  BenchmarkContent,
  BlogContent,
  GuideContent,
  ReviewContent,
  VerdictContent,
  VsContent,
} from '@/types/content';

/* -- reviews ------------------------------------------------------- */
import { review as rtx4080SuperLocalLlm } from './reviews/rtx-4080-super-local-llm';
import { review as rtx5070TiLocalAi } from './reviews/rtx-5070-ti-local-ai';
import { review as rtx3090UsedLocalLlm } from './reviews/rtx-3090-used-local-llm';

/* -- vs ------------------------------------------------------------ */
import { comparison as rtx4080SuperVsRtx3090 } from './vs/rtx-4080-super-vs-rtx-3090';
import { comparison as rtx5070TiVsRtx3090 } from './vs/rtx-5070-ti-vs-rtx-3090';
import { comparison as ollamaVsLmStudio } from './vs/ollama-vs-lm-studio';

/* -- guides -------------------------------------------------------- */
import { guide as bestGpuLocalLlm2026 } from './guides/best-gpu-for-local-llm-inference-2026';
import { guide as multiGpuSetup } from './guides/multi-gpu-setup-for-local-ai';
import { guide as runQwen3Locally } from './guides/how-to-run-qwen3-locally';

/* -- benchmarks ---------------------------------------------------- */
import { benchmark as qwen314b } from './benchmarks/qwen3-14b';
import { benchmark as llama3370b } from './benchmarks/llama-3-3-70b';
import { benchmark as gemma327b } from './benchmarks/gemma-3-27b';

/* -- verdict ------------------------------------------------------- */
import { verdict as rtx5080RedditVerdict } from './verdict/rtx-5080-local-ai-reddit';
import { verdict as rtx3090StillWorthIt } from './verdict/is-the-rtx-3090-still-worth-it';
import { verdict as strixHaloOwners } from './verdict/strix-halo-128gb-local-llm';

/* -- blog ---------------------------------------------------------- */
import { post as vramIsTheBottleneck } from './blog/vram-is-still-the-bottleneck';
import { post as tokensPerSecondAlone } from './blog/tokens-per-second-is-not-enough';
import { post as quantizationTradeoffs } from './blog/quantization-tradeoffs-explained';

export const reviews: ReviewContent[] = [
  rtx4080SuperLocalLlm,
  rtx5070TiLocalAi,
  rtx3090UsedLocalLlm,
];

export const comparisons: VsContent[] = [
  rtx4080SuperVsRtx3090,
  rtx5070TiVsRtx3090,
  ollamaVsLmStudio,
];

export const guides: GuideContent[] = [
  bestGpuLocalLlm2026,
  multiGpuSetup,
  runQwen3Locally,
];

export const benchmarks: BenchmarkContent[] = [qwen314b, llama3370b, gemma327b];

export const verdicts: VerdictContent[] = [
  rtx5080RedditVerdict,
  rtx3090StillWorthIt,
  strixHaloOwners,
];

export const posts: BlogContent[] = [
  vramIsTheBottleneck,
  tokensPerSecondAlone,
  quantizationTradeoffs,
];

/* ------------------------------------------------------------------ */
/* Lookup helpers                                                      */
/* ------------------------------------------------------------------ */

export const collections = {
  reviews,
  vs: comparisons,
  guides,
  benchmarks,
  verdict: verdicts,
  blog: posts,
} as const;

export type CollectionKey = keyof typeof collections;

export function bySlug<T extends { slug: string }>(items: T[], slug: string): T | undefined {
  return items.find((item) => item.slug === slug);
}

/** Everything on the site, newest first — used by the homepage and sitemap. */
export function allContent() {
  return [...reviews, ...comparisons, ...guides, ...benchmarks, ...verdicts, ...posts].sort(
    (a, b) => b.hero.lastUpdated.localeCompare(a.hero.lastUpdated),
  );
}

/** Only content cleared for indexing at Checkpoint 3. */
export function publishedContent() {
  return allContent().filter((item) => item.status === 'published');
}

/** Every benchmark row on the site, for the homepage ticker and hub table. */
export function allBenchmarkRows() {
  return [
    ...benchmarks.flatMap((entry) => entry.rows),
    ...reviews.flatMap((entry) => entry.benchmarks),
  ];
}
