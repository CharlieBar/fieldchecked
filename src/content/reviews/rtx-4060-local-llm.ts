import type { ReviewContent } from '@/types/content';

export const review: ReviewContent = {
  slug: 'rtx-4060-local-llm',
  status: 'draft',
  vertical: 'A',
  datePublished: '2026-08-10',
  product: 'NVIDIA GeForce RTX 4060 (8GB)',
  priceUsd: 299,

  seo: {
    title: 'RTX 4060 for Local LLMs: What 8GB Actually Runs',
    description:
      'An honest look at the RTX 4060 as a local inference card: which models fit in 8GB, what happens the moment one does not, and who should buy it anyway.',
    keywords: [
      'rtx 4060 local llm',
      'rtx 4060 8gb ai',
      'cheapest gpu for local llm',
      'rtx 4060 tokens per second',
      'is 8gb vram enough for llm',
    ],
    canonical: '/reviews/rtx-4060-local-llm/',
  },

  hero: {
    eyebrow: 'GPU Review',
    headline: 'RTX 4060: The 8GB Card and the 8GB Cliff',
    subheadline:
      'It runs 8B-class models perfectly well and falls off a cliff the moment you ask for more. Whether that is a dealbreaker depends entirely on what you were planning to run.',
    lastUpdated: '2026-08-10',
  },

  quickAnswer:
    'The RTX 4060 is a usable entry point into local inference provided you stay at 8B-class models and 4-bit quantisation, where roughly 5GB of weights leaves enough of its 8GB for a working context window. Past that it stops being a question of speed. A 14B model at 4-bit needs about 9GB, so it does not fit, and roughly half of it is read from system RAM instead — generation falls from tens of tokens per second to single digits. That cliff is the entire story of this card. Buy it to learn on, to run small models, or because it is what fits the budget; do not buy it expecting to grow into larger models later.',

  rating: { value: 3, best: 5 },

  verdict:
    'A legitimate starting point that you will outgrow the moment you get ambitious. The 8GB limit is not a soft constraint you can tune around — it decides which models exist for you.',

  pros: [
    'Genuinely cheap, and cheap is the reason most people are reading this page',
    '8B-class models at 4-bit run comfortably with room for a real context window',
    'Low power draw and a small physical card — fits builds the bigger cards do not',
    'Full CUDA support, so every runtime works on day one with no compatibility hunting',
  ],

  cons: [
    '8GB puts 14B-class models out of reach entirely, not merely slower',
    'The offload cliff is steep and arrives earlier than most buyers expect',
    'Context length competes hard with weights, so long documents are out at any model size',
    'No upgrade path — capacity is the constraint, and it cannot be added later',
  ],

  specs: [
    { label: 'VRAM', value: '8 GB GDDR6' },
    { label: 'Memory bandwidth', value: '272 GB/s (vendor spec)' },
    { label: 'Memory bus', value: '128-bit' },
    { label: 'Architecture', value: 'Ada Lovelace' },
    { label: 'TDP', value: '115 W' },
    { label: 'Typical street price', value: '~$299 (Aug 2026)' },
  ],

  benchmarks: [
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
      notes: 'Fully resident. This is the configuration the card is actually for.',
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
      notes: 'Roughly half the layers in system RAM. The cliff, in one row.',
    },
    {
      gpu: 'RTX 4060 8GB',
      model: 'Gemma 3 27B',
      quantization: 'Q4_K_M',
      tokensPerSec: 2.1,
      promptTokensPerSec: 95,
      vramGb: 7.7,
      contextLength: 2048,
      runtime: 'llama.cpp (heavy CPU offload)',
      status: 'pending-verification',
      notes: 'Included to mark the floor. Not a configuration anyone should use.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'The number that decides everything',
      body: [
        'At 4-bit quantisation a model needs roughly 0.6GB per billion parameters. An 8B model is therefore about 5GB of weights, which fits in 8GB with enough left for a useful context window. A 14B model is about 9GB, which does not fit at all.',
        'There is no gentle degradation between those two states. A model that fits runs at the card\'s full speed; a model that does not has its remainder read from system RAM at roughly a tenth the bandwidth, and every token waits on that. The first two rows in the table above are the same card, the same runtime, and the same quantisation, separated by a factor of five purely because one model fits and one does not.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'Context is not free either',
      body: 'The 8GB budget covers weights and KV cache together. An 8B model leaves headroom for an 8k window; push toward 32k and you will find the ceiling again from the other direction. Size for the context you actually work at, not the model alone.',
    },
    {
      type: 'prose',
      heading: 'Who should buy this card',
      body: [
        'Someone learning the stack, running 8B-class assistants, or doing image generation, where 8GB is workable and compute matters more than capacity. Also anyone for whom the alternative is not buying a card at all — a 4060 running an 8B model well beats an unbought 16GB card running nothing.',
        'It is the wrong purchase if you have already decided you want to run 14B or larger. The extra money for a 16GB card is not buying you speed in that case, it is buying you the ability to run the thing at all, which is a different kind of purchase.',
      ],
    },
    {
      type: 'prose',
      heading: 'What to run on it',
      body: [
        'Stay at 8B-class models at Q4_K_M and the card is unremarkable in the best way — it simply works, quietly, at a speed that feels interactive. That covers general chat, summarisation, and a lot of coding assistance.',
        'Resist the temptation to force a larger model in with aggressive quantisation. Below 4-bit, quality degrades fast enough that a well-run 8B model usually beats a crushed 14B one, and you keep the speed.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is 8GB of VRAM enough for local LLMs?',
      answer:
        'For 8B-class models at 4-bit quantisation, yes — around 5GB of weights leaves room for a useful context window. For 14B models and above, no: they do not fit, and the offloaded remainder drops generation to single-digit tokens per second.',
    },
    {
      question: 'What is the largest model an RTX 4060 can run?',
      answer:
        'About 8B parameters at 4-bit with a comfortable context window. Larger models load only by offloading to system RAM, which is technically functional and practically too slow for interactive use.',
    },
    {
      question: 'How many tokens per second does an RTX 4060 produce?',
      answer:
        'Around 34 tokens per second on an 8B model at Q4_K_M with everything resident in VRAM. On a 14B model that does not fit, the same card manages under 7, because most of the work becomes a system RAM read.',
    },
    {
      question: 'Is the RTX 4060 good for Stable Diffusion?',
      answer:
        'Reasonably, yes. Diffusion workloads are compute-bound rather than capacity-bound and SDXL fits within 8GB, so the card is far better matched to image generation than to large language models.',
    },
    {
      question: 'Should I buy an RTX 4060 or save for a 16GB card?',
      answer:
        'If you intend to run 14B-class models, save — the 16GB card is not a faster version of this one, it runs a category of model the 4060 cannot. If 8B models cover your work, the 4060 is enough and the extra money buys headroom you may never use.',
    },
    {
      question: 'Can I add a second RTX 4060 later to get more VRAM?',
      answer:
        'Two 8GB cards give 16GB of pooled capacity for layer-split inference, but the configuration is fiddly, the bandwidth is poor, and the result trails a single 16GB card. It is not a sensible upgrade path.',
    },
    {
      question: 'Does more system RAM help the RTX 4060 run bigger models?',
      answer:
        'It lets them load, but not run well. Once any layers live in system RAM, generation speed is governed by that much slower memory, so RAM converts a hard failure into a slow success rather than a fast one.',
    },
    {
      question: 'Is the RTX 4060 worth it for local AI in 2026?',
      answer:
        'As an entry point at its price, yes, with clear eyes about the ceiling. As a card you plan to grow into, no — capacity is the binding constraint and it is fixed at purchase.',
    },
  ],

  schema: {
    '@type': 'Review',
    rating: { value: 3, best: 5, worst: 1 },
    about: [{ name: 'NVIDIA GeForce RTX 4060', type: 'Product' }],
  },

  related: [
    '/vs/rtx-4070-ti-super-vs-rtx-4060/',
    '/guides/best-gpu-for-local-llm-inference-2026/',
    '/benchmarks/qwen3-14b/',
  ],
};

export default review;
