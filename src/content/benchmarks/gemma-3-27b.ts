import type { BenchmarkContent } from '@/types/content';

export const benchmark: BenchmarkContent = {
  slug: 'gemma-3-27b',
  model: 'gemma-3-27b',
  modelDisplayName: 'Gemma 3 27B',
  status: 'draft',
  vertical: 'A',
  datePublished: '2026-08-09',
  updateCadenceDays: 14,

  seo: {
    title: 'Gemma 3 27B Benchmarks: The Model That Exposes 16GB Cards',
    description:
      'Throughput and VRAM figures for Gemma 3 27B on an RTX 4080 Super, 4070 Ti Super and 4060 — the size class where 16GB cards technically succeed and practically run out of room.',
    keywords: [
      'gemma 3 27b benchmark',
      'gemma 3 27b vram',
      'gemma 27b tokens per second',
      '27b model 16gb vram',
      'gemma 3 local inference',
    ],
    canonical: '/benchmarks/gemma-3-27b/',
  },

  hero: {
    eyebrow: 'Living dataset',
    headline: 'Gemma 3 27B: Where 16GB Stops Being Comfortable',
    subheadline:
      'Both 16GB cards load this model. Neither has room left to read anything longer than a short email.',
    lastUpdated: '2026-08-09',
  },

  quickAnswer:
    'Gemma 3 27B at Q4_K_M needs roughly 16GB for weights, which puts it right at the edge of a 16GB card rather than comfortably inside one. The RTX 4080 Super runs it at about 21 tokens per second and the RTX 4070 Ti Super at about 18, but both only with a 4k context window and essentially no margin — raising the window forces layers into system RAM and throughput collapses. On an 8GB RTX 4060 the model is not viable at all: two thirds of it sits in system RAM and generation falls to around 2 tokens per second. If you want to run a 27B model and actually feed it a long document, 16GB is not enough, and this table is the evidence.',

  testRig: [
    { label: 'CPU', value: 'AMD Ryzen 9 7950X' },
    { label: 'System RAM', value: '64 GB DDR5-6000' },
    { label: 'OS', value: 'Ubuntu 24.04 (WSL2)' },
    { label: 'Runtime', value: 'llama.cpp' },
    { label: 'Batch size', value: '1 (single stream)' },
    { label: 'Prompt length', value: '512 tokens' },
  ],

  methodology: [
    'Each configuration is run three times from a cold model load and the median is recorded.',
    'Context length is set to the largest value that keeps all layers resident in VRAM on that card.',
    'Generation throughput is measured over a 256-token completion at a fixed 512-token prompt.',
    'Peak VRAM is sampled during generation, so KV cache growth is reflected in the figure.',
    'Configurations that require offloading are recorded but flagged, since they measure system memory rather than the GPU.',
    'Runs are re-executed every 14 days.',
  ],

  rows: [
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
      notes: 'Running at the edge of capacity; raising context forces a partial offload.',
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
      notes: 'Same squeeze as the 4080 Super, a little slower streaming the weights.',
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
      notes:
        'Around two thirds of the model sits in system RAM. Included to mark the floor, not as a usable configuration.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'The size class that separates the buying advice',
      body: [
        'At 14B, both 16GB cards are comfortable and the conversation is about speed. At 70B, nothing in this price range qualifies and the conversation is about whether local inference is the right approach at all. The 27B class sits between those, and it is where the honest answer stops being simple.',
        'Sixteen-gigabyte cards load this model and run it at a perfectly reasonable pace. They do so with a 4k context window and no margin, which means the model can answer a short question quickly and cannot read a long document at all. That is a real limitation dressed up as an acceptable benchmark number.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'A throughput number alone would call these cards fine',
      body: 'Twenty-one tokens per second reads as a perfectly usable result. It is — for a 4k window. Any comparison that reports throughput without the context length it was measured at will tell you this model runs well on a 16GB card, and you will discover otherwise the first time you paste in a long file.',
    },
    {
      type: 'prose',
      heading: 'What we cannot tell you here',
      body: [
        'The obvious next question is what this model does with 24GB, where the weights fit with room for a genuinely useful context window. We do not own a 24GB card, so there is no row for it and there will not be one until that changes.',
        'That absence is deliberate. Filling the gap with a number from somewhere else, presented in the same table as our own runs, is exactly the blurring this site exists to avoid. Community reports on larger cards belong on a /verdict/ page with their sources attached, not in this dataset.',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much VRAM does Gemma 3 27B need?',
      answer:
        'Roughly 16GB for weights at Q4_K_M, with peak usage near 15.6GB at a 4k context window once KV cache is included. That fits a 16GB card only with the context window kept short.',
    },
    {
      question: 'Can a 16GB GPU run Gemma 3 27B?',
      answer:
        'Yes, at Q4_K_M with a context window of around 4k tokens. It runs at a usable speed, but there is no headroom — raising the window forces layers into system RAM and collapses throughput.',
    },
    {
      question: 'How many tokens per second does Gemma 3 27B produce?',
      answer:
        'About 21 tokens per second on an RTX 4080 Super and 18 on an RTX 4070 Ti Super, both at Q4_K_M with a 4k window. On an 8GB card it drops to roughly 2, because most of the model is read from system RAM.',
    },
    {
      question: 'Can an 8GB GPU run Gemma 3 27B?',
      answer:
        'Not in any practical sense. Two thirds of the model offloads to system RAM and generation falls to around 2 tokens per second. An 8GB card should be running 8B-class models, not 27B ones.',
    },
    {
      question: 'Is a 27B model better than a 14B model for local use?',
      answer:
        'It is more capable per token, but roughly half the speed and far more demanding on capacity. On a 16GB card, a 14B model with a long context window is often more practically useful than a 27B model restricted to 4k.',
    },
    {
      question: 'What context length can I realistically use with Gemma 3 27B?',
      answer:
        'About 4k on a 16GB card. Beyond that you are offloading. Context is where capacity beyond the weights actually goes, and at this model size a 16GB card has almost none to give.',
    },
    {
      question: 'Why is the 4080 Super only slightly faster than the 4070 Ti Super?',
      answer:
        'Both cards hold the model identically, so the difference is memory bandwidth alone. At this size the model occupies nearly all available VRAM on both, which means neither has an advantage in what it can do — only in how fast it streams weights.',
    },
    {
      question: 'Would a 24GB card fix the context problem?',
      answer:
        'It should, since the extra capacity goes straight to KV cache. We do not own one, so there is no row for it in this dataset and we are not going to publish a number we did not measure.',
    },
    {
      question: 'Does Gemma 3 27B work well at lower quantisation levels?',
      answer:
        'It runs, but quality degradation becomes noticeable below 4-bit on this size class. Q4_K_M is generally the floor worth using; going lower to buy context tends to cost more than it gains.',
    },
  ],

  schema: {
    '@type': 'Dataset',
    dataset: {
      measurementTechnique:
        'Single-stream local inference throughput at the maximum fully-resident context length per card',
      variableMeasured: 'Generation throughput (tokens/sec), peak VRAM (GB), usable context length',
    },
    about: [{ name: 'Gemma 3 27B', type: 'SoftwareApplication' }],
  },

  related: [
    '/benchmarks/qwen3-14b/',
    '/vs/rtx-4080-super-vs-rtx-4070-ti-super/',
    '/guides/best-gpu-for-local-llm-inference-2026/',
  ],
};

export default benchmark;
