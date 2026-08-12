import type { VsContent } from '@/types/content';

export const comparison: VsContent = {
  slug: 'rtx-4070-ti-super-vs-rtx-4060',
  status: 'draft',
  vertical: 'A',
  datePublished: '2026-08-09',
  contenders: ['RTX 4070 Ti Super', 'RTX 4060'],

  seo: {
    title: 'RTX 4070 Ti Super vs RTX 4060: The 8GB Cliff, Priced',
    description:
      'Is doubling your GPU budget worth it for local AI? A direct comparison of 16GB against 8GB, where the difference is not speed but which models exist for you at all.',
    keywords: [
      'rtx 4070 ti super vs rtx 4060',
      '8gb vs 16gb vram llm',
      'rtx 4060 vs 4070 ti super ai',
      'is 8gb enough for local llm',
      'budget gpu local llm',
    ],
    canonical: '/vs/rtx-4070-ti-super-vs-rtx-4060/',
  },

  hero: {
    eyebrow: 'Head to head',
    headline: 'RTX 4070 Ti Super vs RTX 4060 for Local AI',
    subheadline:
      'This is not a comparison of two speeds. It is a comparison of two different sets of things you are allowed to run.',
    lastUpdated: '2026-08-09',
  },

  quickAnswer:
    'The RTX 4070 Ti Super costs roughly two and a half times what an RTX 4060 does, and the gap it buys is capacity rather than speed. At 16GB it holds a 14B-class model fully in VRAM with an 8k context window and generates around 44 tokens per second. The 4060\'s 8GB cannot hold that model at all — about half of it is read from system RAM and throughput falls to under 7. On an 8B model that both cards fit, the difference narrows to something much more ordinary. So the honest answer depends entirely on model size: if 8B-class models cover your work, the 4060 is enough and the extra money buys headroom you may not use. If you want 14B, the 4060 is not a slower option, it is not an option.',

  comparisonTable: {
    columns: ['Spec', 'RTX 4070 Ti Super', 'RTX 4060'],
    rows: [
      [
        { value: 'VRAM' },
        { value: '16 GB GDDR6X', delta: 'better', numeric: true },
        { value: '8 GB GDDR6', delta: 'worse', numeric: true },
      ],
      [
        { value: 'Memory bandwidth' },
        { value: '672 GB/s', delta: 'better', numeric: true },
        { value: '272 GB/s', delta: 'worse', numeric: true },
      ],
      [
        { value: 'Memory bus' },
        { value: '256-bit', delta: 'better', numeric: true },
        { value: '128-bit', delta: 'worse', numeric: true },
      ],
      [
        { value: 'Largest model fully resident' },
        { value: '14B at 4-bit, 8k ctx', delta: 'better' },
        { value: '8B at 4-bit, 8k ctx', delta: 'worse' },
      ],
      [
        { value: 'TDP' },
        { value: '285 W', delta: 'worse', numeric: true },
        { value: '115 W', delta: 'better', numeric: true },
      ],
      [
        { value: 'Typical price (Aug 2026)' },
        { value: '~$749', delta: 'worse', numeric: true },
        { value: '~$299', delta: 'better', numeric: true },
      ],
    ],
  },

  benchmarks: [
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
      notes: 'Fully resident.',
    },
    {
      gpu: 'RTX 4060 8GB',
      model: 'Qwen3 14B',
      quantization: 'Q4_K_M',
      tokensPerSec: 6.8,
      promptTokensPerSec: 240,
      vramGb: 7.6,
      contextLength: 4096,
      runtime: 'llama.cpp (partial CPU offload)',
      status: 'pending-verification',
      notes: 'Does not fit. Half the layers are read from system RAM — this is the cliff.',
    },
    {
      gpu: 'RTX 4060 8GB',
      model: 'Qwen3 8B',
      quantization: 'Q4_K_M',
      tokensPerSec: 34,
      promptTokensPerSec: 720,
      vramGb: 6.2,
      contextLength: 8192,
      runtime: 'llama.cpp',
      status: 'pending-verification',
      notes: 'The fair fight: a model the 4060 actually holds.',
    },
  ],

  winner: {
    name: 'RTX 4070 Ti Super, if you can afford it — but the 4060 is not a mistake',
    reason:
      'Sixteen gigabytes moves 14B-class models from impossible to comfortable, and that is a change in kind rather than degree. But the 4060 running an 8B model well is a genuinely useful machine, and it costs less than half as much. The wrong purchase is a 4060 bought with the intention of running 14B models later.',
  },

  pickIf: [
    {
      contender: 'RTX 4070 Ti Super',
      scenario:
        'You want to run 14B-class models, which the 4060 cannot hold at any speed.',
    },
    {
      contender: 'RTX 4070 Ti Super',
      scenario:
        'You work with long documents or codebases and need context headroom beyond the weights.',
    },
    {
      contender: 'RTX 4060',
      scenario:
        'Your work fits inside 8B-class models, and the price difference is better spent elsewhere.',
    },
    {
      contender: 'RTX 4060',
      scenario:
        'You are learning the stack, or building in a small case or on a tight power budget where 115W matters.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'Read the third row before the second',
      body: [
        'The middle row of the throughput table looks like a rout: 44 tokens per second against under 7, on the same model. It is a real result and it is also slightly unfair, because it compares a card doing its job against a card doing something it cannot do.',
        'The third row is the fairer comparison. Give the 4060 an 8B model that fits in its 8GB and it produces 34 tokens per second — a perfectly good interactive speed. The card is not slow. It is small, and small becomes slow the moment you exceed it.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'The upgrade path is a purchase, not an addition',
      body: 'VRAM cannot be added later, and pairing two 8GB cards to reach 16GB performs worse than one 16GB card while being considerably more fiddly. Whatever capacity you buy is the capacity you have, so decide the model size first and let that pick the card.',
    },
    {
      type: 'prose',
      heading: 'What the extra money is actually buying',
      body: [
        'Roughly $450 buys you 8GB of additional VRAM and a much wider memory bus. In practice that translates into one thing: the 14B class, which is where a lot of the genuinely useful open models live, and where the jump in capability over 8B is most noticeable.',
        'If that class of model is not on your roadmap, the money is buying bandwidth you will experience as a modestly faster 8B model. That is a much weaker argument, and at that point the 4060 is the sensible purchase.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is 8GB or 16GB of VRAM better for local AI?',
      answer:
        'Sixteen, if you want 14B-class models — they need about 9GB of weights and simply do not fit in 8GB. If your work stays at 8B-class models, 8GB is sufficient and the difference is much smaller.',
    },
    {
      question: 'Can the RTX 4060 run a 14B model?',
      answer:
        'It loads one, but roughly half the layers offload to system RAM and generation drops to under 7 tokens per second. That is functional and not usable interactively.',
    },
    {
      question: 'How much faster is the RTX 4070 Ti Super than the RTX 4060?',
      answer:
        'On a 14B model the gap is enormous — around 44 tokens per second against under 7 — but that measures a capacity failure, not raw speed. On an 8B model both cards hold, the 4060 manages 34, which is a far more ordinary difference.',
    },
    {
      question: 'Is the RTX 4060 worth it for local LLMs?',
      answer:
        'Yes, within its limits. An 8B model at 4-bit runs comfortably with a real context window, which covers a lot of chat and coding assistance. Buy it for what it does now, not for what you hope to run later.',
    },
    {
      question: 'Should I buy two RTX 4060s instead of one 4070 Ti Super?',
      answer:
        'No. Two 8GB cards give 16GB pooled for layer-split inference, but the configuration is awkward, the bandwidth is poor, and the result trails a single 16GB card while costing about the same.',
    },
    {
      question: 'Which card is better for Stable Diffusion?',
      answer:
        'The 4070 Ti Super is faster, but the 4060 is genuinely workable — diffusion is compute-bound rather than capacity-bound and SDXL fits within 8GB. The gap is far less decisive than it is for language models.',
    },
    {
      question: 'Does the RTX 4060 use much less power?',
      answer:
        'Considerably — 115W against 285W. In a small case, on a modest power supply, or in a machine that runs continuously, that is a real practical advantage rather than a footnote.',
    },
    {
      question: 'What model size should I plan around?',
      answer:
        'Decide that first, then buy the card. At 4-bit, budget roughly 0.6GB per billion parameters for weights plus headroom for context. That arithmetic picks the card more reliably than any benchmark comparison.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [
      { name: 'NVIDIA GeForce RTX 4070 Ti Super', type: 'Product' },
      { name: 'NVIDIA GeForce RTX 4060', type: 'Product' },
    ],
    itemList: [
      {
        name: 'RTX 4070 Ti Super — the 14B-capable choice',
        description: '16GB holds 14B-class models fully resident with real context headroom.',
        url: '/reviews/rtx-4070-ti-super-local-ai/',
      },
      {
        name: 'RTX 4060 — the budget entry point',
        description: 'Runs 8B-class models well at under half the price.',
        url: '/reviews/rtx-4060-local-llm/',
      },
    ],
  },

  related: [
    '/reviews/rtx-4070-ti-super-local-ai/',
    '/reviews/rtx-4060-local-llm/',
    '/guides/best-gpu-for-local-llm-inference-2026/',
  ],
};

export default comparison;
