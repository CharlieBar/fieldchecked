import type { ReviewContent } from '@/types/content';

export const review: ReviewContent = {
  slug: 'rtx-5070-ti-local-ai',
  status: 'draft',
  datePublished: '2026-08-08',
  product: 'NVIDIA GeForce RTX 5070 Ti (16GB)',
  priceUsd: 749,

  seo: {
    title: 'RTX 5070 Ti Review for Local AI: New Silicon, Same 16GB Ceiling',
    description:
      'The RTX 5070 Ti brings faster memory and newer low-precision support to local inference — and the same 16GB capacity limit that decides which models you can run at all.',
    keywords: [
      'rtx 5070 ti local ai',
      'rtx 5070 ti llm review',
      'blackwell local inference',
      'rtx 5070 ti tokens per second',
      'rtx 5070 ti 16gb vram ai',
    ],
    canonical: '/reviews/rtx-5070-ti-local-ai/',
  },

  hero: {
    eyebrow: 'GPU Review',
    headline: 'RTX 5070 Ti: Faster Where It Fits, Blocked Where It Does Not',
    subheadline:
      'GDDR7 bandwidth is a genuine generational gain for token generation. It does not buy you a single extra gigabyte.',
    lastUpdated: '2026-08-08',
  },

  quickAnswer:
    'The RTX 5070 Ti is a meaningful upgrade for local inference within its capacity envelope: GDDR7 raises memory bandwidth substantially over the previous generation, and generation throughput is bandwidth-bound, so models that fit run noticeably faster. What it does not do is change which models fit. At 16GB it lands in the same category as the 4080 Super — excellent up to 14B-class models, tight at 27B, and out of the running for 70B without offloading. If you are upgrading from a 12GB card, it is a real step up. If you are shopping because 16GB was not enough, it will not be enough either.',

  rating: { value: 4, best: 5 },

  verdict:
    'The best 16GB card for local inference, which is a narrower compliment than it sounds. Buy it for speed within the envelope; do not buy it hoping the envelope grew.',

  pros: [
    'GDDR7 bandwidth translates directly into faster token generation on models that fit',
    'Newer low-precision numeric support improves efficiency on runtimes that target it',
    'Better performance per watt than the previous generation under sustained inference load',
    'Current-generation warranty and driver support with no used-market condition risk',
  ],

  cons: [
    '16GB again — the capacity ceiling that defines the buying decision has not moved',
    'Runtime support for the newest numeric formats varies and lags the hardware',
    'Priced against used 24GB cards that beat it outright on capacity-bound work',
    'Gains are smallest on the image-generation workloads that fit comfortably either way',
  ],

  specs: [
    { label: 'VRAM', value: '16 GB GDDR7' },
    { label: 'Memory bandwidth', value: '896 GB/s (vendor spec)' },
    { label: 'Memory bus', value: '256-bit' },
    { label: 'Architecture', value: 'Blackwell' },
    { label: 'TDP', value: '300 W' },
    { label: 'Launch MSRP', value: '$749' },
  ],

  benchmarks: [
    {
      gpu: 'RTX 5070 Ti 16GB',
      model: 'Qwen3 14B',
      quantization: 'Q4_K_M',
      tokensPerSec: 61,
      promptTokensPerSec: 2100,
      vramGb: 10.4,
      contextLength: 8192,
      runtime: 'llama.cpp',
      status: 'pending-verification',
      notes: 'The generational gain shows up here: bandwidth-bound generation scales with GDDR7.',
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
      notes: 'Faster than the 4080 Super at the same squeeze, and just as short on context.',
    },
    {
      gpu: 'RTX 5070 Ti 16GB',
      model: 'Llama 3.3 70B',
      quantization: 'Q4_K_M',
      tokensPerSec: 2.6,
      vramGb: 15.9,
      contextLength: 4096,
      runtime: 'llama.cpp (partial CPU offload)',
      status: 'pending-verification',
      notes:
        'Faster silicon does not rescue an offloaded model — system RAM bandwidth sets the ceiling.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'What the new memory actually buys',
      body: [
        'Token generation is memory-bandwidth-bound. Producing each token requires reading the model weights, so throughput tracks how fast the card can stream those weights far more closely than it tracks raw compute. That makes a memory-generation jump one of the few spec changes that reliably shows up in tokens per second.',
        'Prompt processing behaves differently. It is compute-bound and parallel, so it benefits from the newer architecture in a more conventional way. This is why the two figures are reported separately throughout this site: a card can be materially better at one and unremarkable at the other.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'The offload cliff is not a software problem',
      body: 'Once part of a model lives in system RAM, generation speed is governed by system memory bandwidth, which is roughly an order of magnitude lower than GPU memory bandwidth. No driver update, runtime optimisation or newer architecture changes that — which is why the 70B row above looks nearly identical across every 16GB card.',
    },
    {
      type: 'prose',
      heading: 'Who should actually buy this',
      body: [
        'Upgrading from a 12GB card is the clearest case. That capacity step moves 14B-class models from awkward to comfortable, and the bandwidth gain compounds it.',
        'Upgrading from an existing 16GB card is much harder to justify for inference alone. You will measure the difference, but you will not be able to run anything you could not run before, and that is usually the reason people are shopping.',
      ],
    },
    {
      type: 'prose',
      heading: 'Runtime support caveat',
      body: [
        'Newer architectures ship numeric formats that runtimes take time to adopt, and the gap between "the hardware supports it" and "your runtime uses it" can be months. Check that your specific runtime build targets this generation before assuming the efficiency gains are available to you today.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is the RTX 5070 Ti good for running local LLMs?',
      answer:
        'Yes, within 16GB. It is the fastest 16GB option for token generation thanks to GDDR7 bandwidth, which suits models up to about 14B parameters at 4-bit with a useful context window. It cannot run 70B-class models without offloading.',
    },
    {
      question: 'How much faster is the RTX 5070 Ti than the RTX 4080 Super for AI?',
      answer:
        'On models that fit in both cards, expect a meaningful but not transformative gain in generation throughput, driven mainly by higher memory bandwidth. On models that fit in neither, the two perform almost identically because both are limited by system RAM during offload.',
    },
    {
      question: 'Is 16GB still a problem on a current-generation card?',
      answer:
        'Yes. Capacity determines which models run at full speed at all, and that constraint is unchanged from the previous generation. A faster 16GB card is faster at the same set of models, not a larger set.',
    },
    {
      question: 'Should I buy an RTX 5070 Ti or two used RTX 3090s?',
      answer:
        'Two 3090s give you 48GB of pooled capacity and open up 70B-class models. The 5070 Ti gives you speed within 16GB, lower power draw and a warranty. Choose by whether your blocker is capacity or throughput.',
    },
    {
      question: 'Does the RTX 5070 Ti help with Stable Diffusion and ComfyUI?',
      answer:
        'It helps, but less dramatically than it helps token generation. Diffusion is compute-bound rather than bandwidth-bound and already fits comfortably in 16GB, so the memory upgrade contributes less to that workload.',
    },
    {
      question: 'What is the largest model an RTX 5070 Ti can run?',
      answer:
        'Around 27B parameters at 4-bit quantisation with a short context window. Beyond that, layers spill to system RAM and throughput collapses to a few tokens per second.',
    },
    {
      question: 'Do local inference runtimes support Blackwell properly?',
      answer:
        'Core support is solid, but the newest low-precision numeric formats are adopted unevenly and lag the hardware by months. Check your specific runtime build rather than assuming the architecture-level features are available.',
    },
    {
      question: 'Is the RTX 5070 Ti worth upgrading to from a 4080 Super?',
      answer:
        'For inference alone, generally no. You gain throughput on models you can already run and gain no new capability, which is rarely what motivates the purchase.',
    },
  ],

  schema: {
    '@type': 'Review',
    rating: { value: 4, best: 5, worst: 1 },
    about: [{ name: 'NVIDIA GeForce RTX 5070 Ti', type: 'Product' }],
  },

  related: [
    '/vs/rtx-5070-ti-vs-rtx-3090/',
    '/benchmarks/gemma-3-27b/',
    '/verdict/rtx-5080-local-ai-reddit/',
  ],
};

export default review;
