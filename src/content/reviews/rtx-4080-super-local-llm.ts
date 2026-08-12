import type { ReviewContent } from '@/types/content';

export const review: ReviewContent = {
  slug: 'rtx-4080-super-local-llm',
  status: 'draft',
  vertical: 'A',
  datePublished: '2026-08-12',
  product: 'NVIDIA GeForce RTX 4080 Super (16GB)',
  priceUsd: 899,

  seo: {
    title: 'RTX 4080 Super Review for Local LLMs: What 16GB Actually Buys You',
    description:
      'A local-inference review of the RTX 4080 Super: which models fit in 16GB, where throughput lands, and the point at which VRAM — not compute — becomes the wall you hit.',
    keywords: [
      'rtx 4080 super local llm',
      'rtx 4080 super review ai',
      '4080 super tokens per second',
      '16gb vram local llm',
      'rtx 4080 super stable diffusion',
    ],
    canonical: '/reviews/rtx-4080-super-local-llm/',
  },

  hero: {
    eyebrow: 'GPU Review',
    headline: 'RTX 4080 Super for Local AI: Fast Until You Run Out of VRAM',
    subheadline:
      'Sixteen gigabytes is the whole story. Everything that fits runs beautifully; everything that does not falls off a cliff.',
    lastUpdated: '2026-08-12',
  },

  quickAnswer:
    'The RTX 4080 Super is a strong local-inference card for models up to roughly 14B parameters at 4-bit quantisation, where its ~736 GB/s of memory bandwidth keeps generation smooth and interactive. Its limit is capacity, not speed: 16GB of VRAM means 27B-class models only fit at aggressive quantisation with short context, and 70B models require offloading layers to system RAM, which drops throughput by an order of magnitude. If your workload is 7B–14B chat, coding assistance and image generation, it is comfortably sufficient. If you intend to run 70B models locally, buy capacity instead — two used 24GB cards will beat one 16GB card at that job every time.',

  rating: { value: 4, best: 5 },

  verdict:
    'A card that does the common case very well and the ambitious case badly. Buy it for 14B-and-under workloads and image generation; skip it if 70B-class models are the reason you are shopping.',

  pros: [
    'Bandwidth is ample for anything that fits in 16GB — generation feels interactive, not batched',
    'Excellent image-generation performance; SDXL and Flux workflows are its strongest suit',
    'Mature CUDA support means every runtime works on day one, with no driver archaeology',
    'Single 8-pin-era power draw is manageable in an existing build without a PSU upgrade',
  ],

  cons: [
    '16GB is the binding constraint in 2026 — it was generous in 2024 and is merely adequate now',
    'No meaningful headroom for long-context work; KV cache eats capacity fast past 16k tokens',
    'Poor value per GB against used 24GB cards if capacity is what you actually need',
    '70B-class models require CPU offload, which makes them technically possible and practically unusable',
  ],

  specs: [
    { label: 'VRAM', value: '16 GB GDDR6X' },
    { label: 'Memory bandwidth', value: '736 GB/s (vendor spec)' },
    { label: 'Memory bus', value: '256-bit' },
    { label: 'Architecture', value: 'Ada Lovelace' },
    { label: 'TDP', value: '320 W' },
    { label: 'Launch MSRP', value: '$999 (Jan 2024)' },
  ],

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
      notes: 'Fully offloaded to GPU. Comfortable headroom for a longer context window.',
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
      notes: 'Fits only with a short context. Raising context past 4k forces partial offload.',
    },
    {
      gpu: 'RTX 4080 Super 16GB',
      model: 'Llama 3.3 70B',
      quantization: 'Q4_K_M',
      tokensPerSec: 2.4,
      vramGb: 15.8,
      contextLength: 4096,
      runtime: 'llama.cpp (partial CPU offload)',
      status: 'pending-verification',
      notes:
        'Roughly half the layers spill to system RAM. Technically runs; not usable interactively.',
    },
  ],

  sections: [
    {
      type: 'callout',
      tone: 'info',
      heading: 'How to read this review',
      body: 'Throughput numbers below are single-stream generation speed at the stated quantisation and context length, produced with the runtime named in each row. Prompt-processing and generation are reported separately because they scale differently — compute governs the first, memory bandwidth governs the second.',
    },
    {
      type: 'prose',
      heading: 'The 16GB question, answered directly',
      body: [
        'Every discussion about this card converges on the same point within about four replies: is 16GB enough? The answer depends entirely on whether your model plus its KV cache fits, because local inference has a cliff rather than a slope. A model that fits runs at full speed. A model that does not fit runs at whatever your system RAM bandwidth allows, which is somewhere between ten and thirty times slower.',
        'At 4-bit quantisation, a 14B model occupies roughly 9GB of weights, leaving usable room for context. A 27B model at the same quantisation lands near 16GB before context, which is why it fits only with a short window and no room to spare. A 70B model needs about 40GB and is simply out of scope for a single 16GB card.',
        'That cliff is why VRAM capacity dominates GPU buying advice for local AI while bandwidth dominates the conversation about performance. You need enough capacity to get onto the fast path at all; only then does bandwidth decide how fast the fast path is.',
      ],
    },
    {
      type: 'prose',
      heading: 'Where this card is genuinely excellent',
      body: [
        'Image generation is the 4080 Super\'s strongest showing. Diffusion workloads are compute-bound far more than they are capacity-bound, and SDXL or Flux workflows in ComfyUI sit well within 16GB even with a reasonable node graph. If your local AI usage is weighted toward image work with LLM chat as a secondary, this is a well-matched card.',
        'The second strength is unglamorous but real: everything works. CUDA has the deepest runtime support of any local-inference stack, and a card of this generation hits no compatibility edges. There is no driver hunting, no waiting for a backend to add support for your architecture, no quantisation format that silently falls back to CPU.',
      ],
    },
    {
      type: 'prose',
      heading: 'Where it stops making sense',
      body: [
        'The moment your requirement includes a 70B-class model, this card is the wrong purchase, and no amount of quantisation aggression fixes it. Two used 24GB cards cost less than many current 16GB cards and give you 48GB of pooled capacity, which changes what is possible rather than merely how fast it is.',
        'Long-context work is the other soft limit. KV cache grows with context length and model size, and on a 16GB card it competes directly with the weights. A configuration that runs comfortably at 8k can fail outright at 32k, which tends to surface as an out-of-memory error partway through a long document rather than at load time.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'Buying used or new?',
      body: 'At current street prices this card competes directly with used 24GB previous-generation cards. If your priority is capacity, that comparison rarely favours 16GB. If your priority is image generation, efficiency and a clean single-card build, it usually does.',
    },
  ],

  faqs: [
    {
      question: 'Is 16GB of VRAM enough for local LLMs in 2026?',
      answer:
        'It is enough for models up to about 14B parameters at 4-bit quantisation with a useful context window, which covers most chat, coding-assistant and summarisation work. It is not enough for 70B-class models, and it is tight for 27B-class models, which fit only at short context lengths.',
    },
    {
      question: 'What is the largest model an RTX 4080 Super can run?',
      answer:
        'Around 27B parameters at 4-bit quantisation with a short context window, using close to all 16GB. Larger models will load only by offloading layers to system RAM, which reduces generation speed to a few tokens per second and is generally not worth doing.',
    },
    {
      question: 'How many tokens per second does an RTX 4080 Super produce?',
      answer:
        'For a 14B model at Q4_K_M with everything resident in VRAM, expect generation in the region of 50 tokens per second single-stream. A 27B model at the same quantisation lands closer to 20. Exact figures vary with runtime, quantisation format, context length and driver version.',
    },
    {
      question: 'Is the RTX 4080 Super good for Stable Diffusion and ComfyUI?',
      answer:
        'Yes — image generation is its strongest local-AI use case. Diffusion workloads are compute-bound rather than capacity-bound, so SDXL and Flux workflows run well within 16GB and benefit from the card\'s compute throughput.',
    },
    {
      question: 'Should I buy an RTX 4080 Super or a used RTX 3090 for AI?',
      answer:
        'Buy the 3090 if capacity is the goal: 24GB runs models the 4080 Super cannot fit at all. Buy the 4080 Super if you want lower power draw, better image-generation speed, a warranty, and your models fit in 16GB.',
    },
    {
      question: 'Can an RTX 4080 Super run a 70B model?',
      answer:
        'Only with a large portion of the model offloaded to system RAM, which drops throughput to roughly two to three tokens per second. It technically produces output but is too slow for interactive use. Two 24GB cards are the practical entry point for 70B-class models.',
    },
    {
      question: 'Does adding more system RAM help local LLM speed on a 16GB GPU?',
      answer:
        'More system RAM lets larger models load, but it does not make them fast. Once any layers live in system RAM, generation speed is governed by much slower system memory bandwidth. RAM removes a hard failure; it does not remove the bottleneck.',
    },
    {
      question: 'How much VRAM does context length use?',
      answer:
        'KV cache scales with context length, model size and cache precision, and on a 16GB card it competes with the weights directly. A model that runs comfortably at 8k context can fail at 32k, which is why capacity headroom matters more than it appears from model size alone.',
    },
    {
      question: 'Is the RTX 4080 Super still worth buying for AI work?',
      answer:
        'For image generation and models up to 14B, yes. As a 70B-capable inference card, no — and no future driver or runtime update changes that, because the constraint is capacity rather than software maturity.',
    },
  ],

  schema: {
    '@type': 'Review',
    rating: { value: 4, best: 5, worst: 1 },
    about: [{ name: 'NVIDIA GeForce RTX 4080 Super', type: 'Product' }],
  },

  related: [
    '/vs/rtx-4080-super-vs-rtx-4070-ti-super/',
    '/benchmarks/qwen3-14b/',
    '/guides/best-gpu-for-local-llm-inference-2026/',
  ],
};

export default review;
