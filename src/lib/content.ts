import { allContent } from '@/content';
import type { AnyContent } from '@/types/content';

/** Resolve an internal link (as written in a content file's `related`). */
export function byPath(path: string): AnyContent | undefined {
  const normalized = path.endsWith('/') ? path : `${path}/`;
  return allContent().find((item) => item.seo.canonical === normalized);
}

/**
 * Hub descriptors. Kept here rather than in each route so the labels,
 * breadcrumb names and intro copy have exactly one home.
 */
export const hubs = {
  reviews: {
    label: 'Review',
    name: 'Reviews',
    path: '/reviews/',
    eyebrow: 'Hardware reviews',
    headline: 'GPU reviews for people who run models locally',
    intro:
      'Reviews written around one question: what can this card actually hold, and how fast does it move once it holds it. Gaming frame rates are somebody else’s beat.',
  },
  vs: {
    label: 'Comparison',
    name: 'Vs',
    path: '/vs/',
    eyebrow: 'Head to head',
    headline: 'Direct comparisons for local AI hardware and tooling',
    intro:
      'Two options, one table, and a clear answer at the top. Every comparison states who wins, who it loses to, and the situations where the loser is still the right buy.',
  },
  guides: {
    label: 'Guide',
    name: 'Guides',
    path: '/guides/',
    eyebrow: 'Build & setup',
    headline: 'Setup and build guides for local inference rigs',
    intro:
      'Budget tiers, multi-GPU builds, driver and runtime gotchas — the parts that cost you a weekend if nobody warns you first.',
  },
  benchmarks: {
    label: 'Benchmark',
    name: 'Benchmarks',
    path: '/benchmarks/',
    eyebrow: 'Living dataset',
    headline: 'Tokens per second, by model and by GPU',
    intro:
      'A dataset rather than an article: throughput per model per card, re-run and re-published on a fixed cadence, with the provenance of every row stated in the row itself.',
  },
  verdict: {
    label: 'Curated verdict',
    name: 'Verdict',
    path: '/verdict/',
    eyebrow: 'What people report',
    headline: 'What the community actually says',
    intro:
      'Synthesised from public discussion — subreddits, forums, reviewer videos — with every source linked. These pages are not our own hands-on testing, and they say so on every page.',
  },
  blog: {
    label: 'Article',
    name: 'Blog',
    path: '/blog/',
    eyebrow: 'News & explainers',
    headline: 'Model releases and hardware news, translated for hobbyists',
    intro:
      'What a new model or card release means for someone with one GPU and a power budget, without the launch-day hyperbole.',
  },
} as const;

export type HubKey = keyof typeof hubs;
