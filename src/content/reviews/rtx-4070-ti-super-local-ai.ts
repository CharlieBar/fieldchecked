import type { ReviewContent } from '@/types/content';

export const review: ReviewContent = {
  slug: 'rtx-4070-ti-super-local-ai',
  status: 'draft',
  vertical: 'A',
  datePublished: '2026-08-08',
  product: 'NVIDIA GeForce RTX 4070 Ti Super (16GB)',
  priceUsd: 749,

  seo: {
    title: 'RTX 4070 Ti Super Review: The Cheapest Comfortable 16GB',
    description:
      'The RTX 4070 Ti Super for local inference — the least expensive card here that holds a 14B model with room for real context, and where it gives ground to the 4080 Super.',
    keywords: [
      'rtx 4070 ti super local llm',
      'rtx 4070 ti super ai review',
      'rtx 4070 ti super 16gb',
      'rtx 4070 ti super tokens per second',
      'best value 16gb gpu local ai',
    ],
    canonical: '/reviews/rtx-4070-ti-super-local-ai/',
  },

  hero: {
    eyebrow: 'GPU Review',
    headline: 'RTX 4070 Ti Super: 16GB Without the 4080 Price',
    subheadline:
      'The capacity that matters, at the lowest price it comes at here. What you give up is bandwidth, and bandwidth is the cheaper thing to give up.',
    lastUpdated: '2026-08-08',
  },

  quickAnswer:
    'The RTX 4070 Ti Super is the value pick of the three cards on this site for local language models, because it carries the same 16GB as the RTX 4080 Super for meaningfully less money. Capacity decides which models you can run at all, and at 16GB that means 14B-class models fully resident with an 8k context window. What the lower price costs you is memory bandwidth: expect roughly 44 tokens per second on a 14B model against the 4080 Super\'s 52, a difference you will notice but which never changes what is possible. If you are choosing between these two cards, you are choosing how fast, not what.',

  rating: { value: 4, best: 5 },

  verdict:
    'The card to buy if 16GB is the requirement and the budget is finite. It does everything the 4080 Super does, about fifteen percent slower, for noticeably less.',

  pros: [
    '16GB puts 14B-class models fully in VRAM with room for a working context window',
    'Materially cheaper than the 4080 Super for identical capacity',
    'Comfortable power draw and a straightforward fit in most existing builds',
    'Same mature CUDA support as everything else in the range — nothing to troubleshoot',
  ],

  cons: [
    'Noticeably slower than the 4080 Super on models both cards hold',
    '27B-class models fit only at a 4k context window, same squeeze as every 16GB card',
    '70B-class models are out of reach, and no configuration changes that',
    'Little headroom for higher-precision quantisation once context is accounted for',
  ],

  specs: [
    { label: 'VRAM', value: '16 GB GDDR6X' },
    { label: 'Memory bandwidth', value: '672 GB/s (vendor spec)' },
    { label: 'Memory bus', value: '256-bit' },
    { label: 'Architecture', value: 'Ada Lovelace' },
    { label: 'TDP', value: '285 W' },
    { label: 'Typical street price', value: '~$749 (Aug 2026)' },
  ],

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
      notes: 'Fully resident with headroom. The configuration this card is built for.',
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
      notes: 'Fits only with a short context window and no margin.',
    },
    {
      gpu: 'RTX 4070 Ti Super 16GB',
      model: 'Llama 3.3 70B',
      quantization: 'Q4_K_M',
      tokensPerSec: 2.3,
      vramGb: 15.8,
      contextLength: 4096,
      runtime: 'llama.cpp (partial CPU offload)',
      status: 'pending-verification',
      notes: 'Most of the model in system RAM. Runs; not usable.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'Why capacity parity is the headline',
      body: [
        'This card and the RTX 4080 Super hold exactly the same set of models. That sounds like a small observation and it is the most important one on this page, because in local inference the first question is never how fast — it is whether the model fits at all.',
        'Once two cards clear that bar for the same models, the remaining difference is bandwidth, and bandwidth is linear and forgiving. Fifteen percent slower is fifteen percent slower. Not fitting is a factor of ten.',
      ],
    },
    {
      type: 'callout',
      tone: 'win',
      heading: 'The value case in one line',
      body: 'Same capacity as the 4080 Super, same model list, roughly fifteen percent less throughput, for a lower price. If the budget is the constraint rather than the deadline, this is the card.',
    },
    {
      type: 'prose',
      heading: 'Where 16GB still runs out',
      body: [
        'The 27B row above is the honest limit. The model loads, runs at a reasonable pace, and leaves you a 4k context window — enough for a conversation, not enough for a long document. That is the same squeeze every 16GB card in this range hits, and it is the reason the buying advice above 14B gets complicated.',
        'The 70B row is not a limitation so much as a category error. Nothing here runs a 70B model usefully, and no amount of quantisation tuning changes that.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is the RTX 4070 Ti Super good for local LLMs?',
      answer:
        'Yes. Its 16GB holds 14B-class models fully in VRAM with room for an 8k context window, which covers most chat, coding and summarisation work. It is the cheapest card here that clears that bar.',
    },
    {
      question: 'RTX 4070 Ti Super or RTX 4080 Super for AI?',
      answer:
        'They hold the same models, so the choice is speed against price. The 4080 Super is roughly fifteen percent faster on models both cards fit; the 4070 Ti Super costs less. Neither can do anything the other cannot.',
    },
    {
      question: 'How many tokens per second does the RTX 4070 Ti Super get?',
      answer:
        'Around 44 tokens per second on a 14B model at Q4_K_M with everything resident, and about 18 on a 27B model at a 4k context window. Figures vary with runtime, quantisation and context length.',
    },
    {
      question: 'Is 16GB enough for local AI in 2026?',
      answer:
        'It is enough for models up to about 14B with a useful context window, which covers most practical work. It is tight at 27B and insufficient for 70B-class models.',
    },
    {
      question: 'Can the RTX 4070 Ti Super run a 70B model?',
      answer:
        'Only with most of the model offloaded to system RAM, which yields around 2.3 tokens per second. It produces output too slowly to work with. Roughly 48GB of pooled VRAM is the practical requirement for 70B.',
    },
    {
      question: 'Is the RTX 4070 Ti Super worth it over an RTX 4060?',
      answer:
        'If you want to run 14B-class models, yes — decisively. The 4060 cannot hold them at all, so this is not a speed upgrade but a capability one. If 8B models cover your needs, the gap is far less compelling.',
    },
    {
      question: 'How much context can I use on a 14B model with this card?',
      answer:
        'Around 8k comfortably at Q4_K_M, with peak usage near 10.4GB. Pushing toward 32k will start competing with the weights and eventually force an offload.',
    },
    {
      question: 'Does the RTX 4070 Ti Super handle image generation well?',
      answer:
        'Yes. Diffusion work is compute-bound rather than capacity-bound and sits comfortably within 16GB, so SDXL and similar pipelines run well without capacity ever becoming the issue.',
    },
  ],

  schema: {
    '@type': 'Review',
    rating: { value: 4, best: 5, worst: 1 },
    about: [{ name: 'NVIDIA GeForce RTX 4070 Ti Super', type: 'Product' }],
  },

  related: [
    '/vs/rtx-4080-super-vs-rtx-4070-ti-super/',
    '/vs/rtx-4070-ti-super-vs-rtx-4060/',
    '/benchmarks/qwen3-14b/',
  ],
};

export default review;
