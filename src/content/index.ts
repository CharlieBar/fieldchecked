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
  BuildContent,
  ExperimentContent,
  StudioContent,
  BlogContent,
  GuideContent,
  ReviewContent,
  VerdictContent,
  VsContent,
} from '@/types/content';

/* -- reviews ------------------------------------------------------- */
import { review as rtx4080SuperLocalLlm } from './reviews/rtx-4080-super-local-llm';
import { review as rtx4070TiSuperLocalAi } from './reviews/rtx-4070-ti-super-local-ai';
import { review as rtx4060LocalLlm } from './reviews/rtx-4060-local-llm';

/* -- vs ------------------------------------------------------------ */
import { comparison as rtx4080SuperVsRtx4070TiSuper } from './vs/rtx-4080-super-vs-rtx-4070-ti-super';
import { comparison as rtx4070TiSuperVsRtx4060 } from './vs/rtx-4070-ti-super-vs-rtx-4060';
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

/* -- builds (Vertical B) ------------------------------------------- */
import { build as wordpressMcpServer } from './builds/wordpress-mcp-server-claude-code';

/* -- studio (Vertical B) ------------------------------------------- */
import { studio as comfyuiInfographic } from './studio/comfyui-infographic-pipeline';

/* -- experiments (Vertical B) -------------------------------------- */
import { experiment as faqSchemaCitations } from './experiments/faq-schema-ai-citations';

/* -- blog ---------------------------------------------------------- */
import { post as vramIsTheBottleneck } from './blog/vram-is-still-the-bottleneck';
import { post as tokensPerSecondAlone } from './blog/tokens-per-second-is-not-enough';
import { post as quantizationTradeoffs } from './blog/quantization-tradeoffs-explained';

export const reviews: ReviewContent[] = [
  rtx4080SuperLocalLlm,
  rtx4070TiSuperLocalAi,
  rtx4060LocalLlm,
];

export const comparisons: VsContent[] = [
  rtx4080SuperVsRtx4070TiSuper,
  rtx4070TiSuperVsRtx4060,
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

export const builds: BuildContent[] = [wordpressMcpServer];
export const studioPipelines: StudioContent[] = [comfyuiInfographic];
export const experiments: ExperimentContent[] = [faqSchemaCitations];

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
  builds,
  studio: studioPipelines,
  experiments,
  blog: posts,
} as const;

export type CollectionKey = keyof typeof collections;

export function bySlug<T extends { slug: string }>(items: T[], slug: string): T | undefined {
  return items.find((item) => item.slug === slug);
}

/** Everything on the site, newest first — used by the homepage and sitemap. */
export function allContent() {
  return [
    ...reviews,
    ...comparisons,
    ...guides,
    ...benchmarks,
    ...verdicts,
    ...builds,
    ...studioPipelines,
    ...experiments,
    ...posts,
  ].sort(
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
    ...comparisons.flatMap((entry) => entry.benchmarks ?? []),
    ...guides.flatMap((entry) => entry.benchmarks ?? []),
  ];
}
