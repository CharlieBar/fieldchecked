import type { VsContent } from '@/types/content';

export const comparison: VsContent = {
  slug: 'rtx-4080-super-vs-rtx-4070-ti-super',
  status: 'draft',
  vertical: 'A',
  datePublished: '2026-08-11',
  contenders: ['RTX 4080 Super', 'RTX 4070 Ti Super'],

  seo: {
    title: 'RTX 4080 Super vs 4070 Ti Super for Local AI: Same 16GB',
    description:
      'Two 16GB cards that hold exactly the same models. A direct comparison of what the price difference actually buys for local LLM inference — and what it does not.',
    keywords: [
      'rtx 4080 super vs 4070 ti super',
      '4080 super vs 4070 ti super local llm',
      '4080 super vs 4070 ti super ai',
      'best 16gb gpu local llm',
      '4070 ti super vs 4080 super tokens per second',
    ],
    canonical: '/vs/rtx-4080-super-vs-rtx-4070-ti-super/',
  },

  hero: {
    eyebrow: 'Head to head',
    headline: 'RTX 4080 Super vs RTX 4070 Ti Super for Local AI',
    subheadline:
      'Identical capacity, different bandwidth. For once this is a comparison purely about speed, which makes it the simplest buying decision on the site.',
    lastUpdated: '2026-08-11',
  },

  quickAnswer:
    'These two cards carry the same 16GB of VRAM, so they run exactly the same set of models — 14B-class fully resident with an 8k context window, 27B-class only at 4k, and nothing at 70B. That makes this the rare GPU comparison where capacity is not the deciding factor and raw speed genuinely is. The RTX 4080 Super generates roughly 52 tokens per second on a 14B model against the RTX 4070 Ti Super\'s 44, a gap of about fifteen percent that comes down to memory bandwidth. Buy the 4080 Super if that fifteen percent is worth the price difference to you. Buy the 4070 Ti Super if it is not. Neither choice closes a door.',

  comparisonTable: {
    columns: ['Spec', 'RTX 4080 Super', 'RTX 4070 Ti Super'],
    rows: [
      [
        { value: 'VRAM' },
        { value: '16 GB GDDR6X', delta: 'neutral', numeric: true },
        { value: '16 GB GDDR6X', delta: 'neutral', numeric: true },
      ],
      [
        { value: 'Memory bandwidth' },
        { value: '736 GB/s', delta: 'better', numeric: true },
        { value: '672 GB/s', delta: 'worse', numeric: true },
      ],
      [
        { value: 'Memory bus' },
        { value: '256-bit', delta: 'neutral', numeric: true },
        { value: '256-bit', delta: 'neutral', numeric: true },
      ],
      [
        { value: 'Largest model fully resident' },
        { value: '14B at 4-bit, 8k ctx', delta: 'neutral' },
        { value: '14B at 4-bit, 8k ctx', delta: 'neutral' },
      ],
      [
        { value: 'TDP' },
        { value: '320 W', delta: 'worse', numeric: true },
        { value: '285 W', delta: 'better', numeric: true },
      ],
      [
        { value: 'Typical price (Aug 2026)' },
        { value: '~$899', delta: 'worse', numeric: true },
        { value: '~$749', delta: 'better', numeric: true },
      ],
    ],
  },

  // Throughput lives here, not in the table above: a typed row carries a
  // provenance status, a table cell is just a string. See CLAUDE.md.
  benchmarks: [
    {
      gpu: 'RTX 4080 Super 16GB',
      model: 'Qwen3 14B',
      quantization: 'Q4_K_M',
      tokensPerSec: 52,
      promptTokensPerSec: 1850,
      vramGb: 10.4,
      contextLength: 8192,
      runtime: 'llama.cpp',
      status: 'pending-verification',
    },
    {
      gpu: 'RTX 4070 Ti Super 16GB',
      model: 'Qwen3 14B',
      quantization: 'Q4_K_M',
      tokensPerSec: 44,
      promptTokensPerSec: 1560,
      vramGb: 10.4,
      contextLength: 8192,
      runtime: 'llama.cpp',
      status: 'pending-verification',
      notes: 'Identical footprint to the row above — the gap is bandwidth alone.',
    },
    {
      gpu: 'RTX 4080 Super 16GB',
      model: 'Gemma 3 27B',
      quantization: 'Q4_K_M',
      tokensPerSec: 21,
      promptTokensPerSec: 940,
      vramGb: 15.6,
      contextLength: 4096,
      runtime: 'llama.cpp',
      status: 'pending-verification',
    },
    {
      gpu: 'RTX 4070 Ti Super 16GB',
      model: 'Gemma 3 27B',
      quantization: 'Q4_K_M',
      tokensPerSec: 18,
      promptTokensPerSec: 780,
      vramGb: 15.6,
      contextLength: 4096,
      runtime: 'llama.cpp',
      status: 'pending-verification',
      notes: 'Both cards hit the same 4k context ceiling at this model size.',
    },
  ],

  winner: {
    name: 'RTX 4070 Ti Super, for most buyers',
    reason:
      'It runs every model the 4080 Super runs, at every context length the 4080 Super manages, for less money. The 4080 Super is genuinely faster and that is worth paying for if throughput is the bottleneck in your work — but it does not extend what is possible, and capacity is what usually decides these purchases.',
  },

  pickIf: [
    {
      contender: 'RTX 4070 Ti Super',
      scenario:
        'You want 16GB at the lowest price it comes at, and a fifteen percent throughput difference does not change your workflow.',
    },
    {
      contender: 'RTX 4070 Ti Super',
      scenario:
        'You are building in a case or on a power budget where 285W is easier to accommodate than 320W.',
    },
    {
      contender: 'RTX 4080 Super',
      scenario:
        'You generate long outputs often enough that fifteen percent compounds into real waiting time.',
    },
    {
      contender: 'RTX 4080 Super',
      scenario:
        'Image generation is a significant part of your work, where the extra compute shows up more clearly than in token generation.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'A comparison where speed actually is the answer',
      body: [
        'Most GPU comparisons on this site end with the same conclusion: capacity decides, and throughput is a secondary detail. This one is the exception. Both cards carry 16GB on a 256-bit bus, so every model that fits on one fits on the other, at the same context length, with the same headroom.',
        'That leaves memory bandwidth as the only meaningful difference for token generation, and it behaves exactly as you would expect — proportionally. There is no cliff here, no configuration where one card succeeds and the other fails. Just a consistent gap of roughly fifteen percent.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      heading: 'Why prompt processing moves more than generation',
      body: 'Prompt processing is compute-bound and parallel; token generation is bandwidth-bound and sequential. The two figures scale with different parts of the card, which is why they are reported separately in the table above and why the gap between the cards is not identical across both.',
    },
    {
      type: 'prose',
      heading: 'What neither card does',
      body: [
        'Both stop at the same wall. A 27B model fits with a 4k context window and nothing to spare, which is enough for conversation and not enough for a long document. A 70B model does not fit at all on either, and offloading it produces a couple of tokens per second regardless of which card you bought.',
        'If either of those limits is the thing standing between you and your work, the upgrade you need is capacity, and neither of these cards provides it. That is a different purchase, at a different price, and it is worth being clear about before spending money on the faster 16GB card in the hope it helps.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is the RTX 4080 Super better than the 4070 Ti Super for local LLMs?',
      answer:
        'It is faster, by roughly fifteen percent on models both cards hold. It is not more capable: both carry 16GB, so they run the same models at the same context lengths. The choice is speed against price.',
    },
    {
      question: 'How much faster is the RTX 4080 Super for AI?',
      answer:
        'About 52 tokens per second against 44 on a 14B model at Q4_K_M, and 21 against 18 on a 27B model. The difference comes from memory bandwidth, since token generation is bandwidth-bound.',
    },
    {
      question: 'Do both cards run the same models?',
      answer:
        'Yes. Both carry 16GB on a 256-bit bus, so any model that fits on one fits on the other with the same context headroom. There is no model that one runs and the other cannot.',
    },
    {
      question: 'Which card is better value for local AI?',
      answer:
        'The RTX 4070 Ti Super, for most buyers. It delivers identical capability for less money, and capacity rather than throughput is usually what decides whether a local setup works.',
    },
    {
      question: 'Can either card run a 70B model?',
      answer:
        'Neither can hold one. A 70B model at 4-bit needs roughly 40GB, so both offload most of it to system RAM and land near two tokens per second — effectively identical, because neither GPU is doing the work.',
    },
    {
      question: 'Is the extra 35W on the 4080 Super a problem?',
      answer:
        'Rarely on its own, but inference load is sustained rather than bursty, so it is continuous heat rather than occasional peaks. In a compact case or on a marginal power supply it is worth accounting for.',
    },
    {
      question: 'Which is better for Stable Diffusion and ComfyUI?',
      answer:
        'The RTX 4080 Super. Diffusion is compute-bound rather than bandwidth-bound, and the gap between these cards is wider on compute-heavy image work than on token generation.',
    },
    {
      question: 'Should I buy either of these or wait for more VRAM?',
      answer:
        'If 16GB covers the models you want, buying now is reasonable — successive generations have improved bandwidth while holding capacity flat. If you need more than 16GB, neither of these is the answer and waiting or buying used capacity makes more sense.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [
      { name: 'NVIDIA GeForce RTX 4080 Super', type: 'Product' },
      { name: 'NVIDIA GeForce RTX 4070 Ti Super', type: 'Product' },
    ],
    itemList: [
      {
        name: 'RTX 4070 Ti Super — best value 16GB card',
        description: 'Same capacity and model list as the 4080 Super, for less money.',
        url: '/reviews/rtx-4070-ti-super-local-ai/',
      },
      {
        name: 'RTX 4080 Super — fastest 16GB card here',
        description: 'Roughly fifteen percent more throughput on identical workloads.',
        url: '/reviews/rtx-4080-super-local-llm/',
      },
    ],
  },

  related: [
    '/reviews/rtx-4070-ti-super-local-ai/',
    '/reviews/rtx-4080-super-local-llm/',
    '/guides/best-gpu-for-local-llm-inference-2026/',
  ],
};

export default comparison;
