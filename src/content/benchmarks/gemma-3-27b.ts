import type { BenchmarkContent } from '@/types/content';

export const benchmark: BenchmarkContent = {
  slug: 'gemma-3-27b',
  model: 'gemma-3-27b',
  modelDisplayName: 'Gemma 3 27B',
  status: 'draft',
  datePublished: '2026-08-09',
  updateCadenceDays: 14,

  seo: {
    title: 'Gemma 3 27B Benchmarks: The Model That Exposes 16GB Cards',
    description:
      'Throughput and VRAM figures for Gemma 3 27B across consumer GPUs — the size class where 16GB cards technically succeed and practically run out of room.',
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
      'Every card in this table can load the model. Only some of them can load it and still see your document.',
    lastUpdated: '2026-08-09',
  },

  quickAnswer:
    'Gemma 3 27B at Q4_K_M needs roughly 16GB for weights, which places it right at the edge of 16GB cards. Those cards run it at around 21–25 tokens per second but only with a 4k context window, leaving no headroom for longer inputs. A 24GB card runs the same quantisation at a similar speed with a 16k window — four times the usable context. This is the size class where capacity and speed decouple most visibly: the throughput numbers across cards look close, while what you can actually do with the model differs enormously. For long-document or codebase work at this model size, 24GB is effectively the minimum.',

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
      gpu: 'RTX 3090 24GB',
      model: 'Gemma 3 27B',
      quantization: 'Q4_K_M',
      tokensPerSec: 26,
      promptTokensPerSec: 810,
      vramGb: 17.2,
      contextLength: 16384,
      runtime: 'llama.cpp',
      status: 'pending-verification',
      notes: 'Full offload with a 16k window and capacity still in reserve.',
    },
    {
      gpu: 'RTX 5070 Ti 16GB',
      model: 'Gemma 3 27B',
      quantization: 'Q4_K_M',
      tokensPerSec: 25,
      promptTokensPerSec: 1080,
      vramGb: 15.6,
      contextLength: 4096,
      runtime: 'llama.cpp',
      status: 'pending-verification',
      notes: 'Matches the 24GB card on speed at a quarter of the context.',
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
      notes: 'Running at the edge of capacity; raising context forces a partial offload.',
    },
    {
      gpu: 'RTX 3090 24GB ×2',
      model: 'Gemma 3 27B',
      quantization: 'Q8_0',
      tokensPerSec: 19,
      promptTokensPerSec: 620,
      vramGb: 30.4,
      contextLength: 32768,
      runtime: 'llama.cpp (tensor split)',
      status: 'pending-verification',
      notes: 'Two cards spent on precision and context rather than a larger model.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'The size class that separates the buying advice',
      body: [
        'At 14B, every 16GB card is comfortable and the conversation is about speed. At 70B, no single consumer card qualifies and the conversation is about how many cards you need. The 27B class sits between those, and it is where the honest answer stops being simple.',
        'Sixteen-gigabyte cards load this model and run it at a perfectly reasonable pace. They do so with a 4k context window and essentially no margin, which means the model can respond quickly to short questions and cannot read a long document at all.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      heading: 'Throughput parity hides a capability gap',
      body: 'The top two rows are within a token per second of each other. One of them can process a 16,000-token document; the other cannot. Any comparison that reports only tokens per second would call these cards equivalent, which is exactly the failure mode this dataset exists to prevent.',
    },
    {
      type: 'prose',
      heading: 'What the dual-card row is for',
      body: [
        'The final row spends 48GB of pooled capacity on a 27B model rather than a 70B one, buying higher precision and a 32k context window instead of more parameters.',
        'That is a legitimate trade and an under-discussed one. For document analysis and code work, a mid-size model with long context and high precision often outperforms a larger model that can only see a fragment of the input.',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much VRAM does Gemma 3 27B need?',
      answer:
        'Roughly 16GB for weights at Q4_K_M, with peak usage near 15.6GB at 4k context on a 16GB card and 17.2GB at 16k context where capacity allows. Higher precision variants need considerably more.',
    },
    {
      question: 'Can a 16GB GPU run Gemma 3 27B?',
      answer:
        'Yes, at Q4_K_M with a short context window of around 4k tokens. It runs at a usable speed, but there is no headroom — raising the context window forces layers into system RAM and collapses throughput.',
    },
    {
      question: 'How many tokens per second does Gemma 3 27B produce?',
      answer:
        'Around 21–26 tokens per second at Q4_K_M with all layers resident in VRAM, depending on the card. The spread across cards is small; the difference in usable context length between them is large.',
    },
    {
      question: 'Why does a 24GB card show similar speed to a 16GB card here?',
      answer:
        'Because both have the model fully resident, so throughput reflects memory bandwidth rather than capacity. The 24GB card converts its extra capacity into context length instead of speed.',
    },
    {
      question: 'Is a 27B model better than a 14B model for local use?',
      answer:
        'It is more capable per token, but roughly half the speed and much more demanding on capacity. On a 16GB card the 14B model with long context is often more practically useful than a 27B model restricted to 4k.',
    },
    {
      question: 'What context length can I realistically use with Gemma 3 27B?',
      answer:
        'About 4k on a 16GB card, 16k on a 24GB card at the same quantisation, and 32k across two cards with higher precision. Context is where capacity beyond the weights actually goes.',
    },
    {
      question: 'Should I use two GPUs for a 27B model or one for a 70B model?',
      answer:
        'If your work involves long documents or codebases, two cards on a 27B model with 32k context is often the better use of the same hardware. If you need maximum reasoning capability on shorter inputs, the 70B model wins.',
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
    '/vs/rtx-5070-ti-vs-rtx-3090/',
    '/guides/best-gpu-for-local-llm-inference-2026/',
  ],
};

export default benchmark;
