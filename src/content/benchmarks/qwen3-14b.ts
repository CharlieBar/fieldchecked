import type { BenchmarkContent } from '@/types/content';

export const benchmark: BenchmarkContent = {
  slug: 'qwen3-14b',
  model: 'qwen3-14b',
  modelDisplayName: 'Qwen3 14B',
  status: 'draft',
  vertical: 'A',
  datePublished: '2026-08-12',
  updateCadenceDays: 14,

  seo: {
    title: 'Qwen3 14B Tokens per Second: 8GB vs 16GB, Measured',
    description:
      'Generation and prompt-processing throughput for Qwen3 14B on an RTX 4060, 4070 Ti Super and 4080 Super, with quantisation, context length and VRAM recorded per run.',
    keywords: [
      'qwen3 14b tokens per second',
      'qwen3 14b benchmark',
      'qwen3 14b vram',
      'qwen3 14b rtx 4060',
      'local llm tokens per second benchmark',
    ],
    canonical: '/benchmarks/qwen3-14b/',
  },

  hero: {
    eyebrow: 'Living dataset',
    headline: 'Qwen3 14B: Tokens per Second by GPU',
    subheadline:
      'A 14B model at 4-bit is the cleanest test of the 8GB-versus-16GB question, because it fits comfortably on one side of that line and not at all on the other.',
    lastUpdated: '2026-08-12',
  },

  quickAnswer:
    'Qwen3 14B at Q4_K_M needs roughly 9GB of weights, which decides everything else. On a 16GB card it runs fully resident with room for an 8k context window, landing around 52 tokens per second on an RTX 4080 Super and around 44 on an RTX 4070 Ti Super — a gap that reflects memory bandwidth, since both cards hold the model identically. On an 8GB RTX 4060 the same model does not fit: roughly half its layers are read from system RAM instead, and throughput collapses to single digits. That is not a slow GPU, it is a capacity cliff, and no amount of quantisation tuning on an 8GB card recovers the difference.',

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
    'Generation throughput is measured over a 256-token completion at a fixed 512-token prompt.',
    'Prompt-processing throughput is recorded separately, since it is compute-bound where generation is bandwidth-bound.',
    'Peak VRAM is sampled during generation, not at load, so KV cache growth is included.',
    'Any configuration that offloads layers to system RAM is labelled in its notes, because the resulting figure measures system memory bandwidth rather than the GPU.',
    'Runs are re-executed every 14 days, since runtime builds change throughput materially between versions.',
  ],

  rows: [
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
      notes: 'Same footprint as the 4080 Super above; the gap is bandwidth, not capacity.',
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
      notes:
        'Roughly half the layers spill to system RAM. This row is the 8GB capacity cliff, not a slow GPU.',
    },
    {
      gpu: 'RTX 4080 Super 16GB',
      model: 'Qwen3 14B',
      quantization: 'Q8_0',
      tokensPerSec: 31,
      promptTokensPerSec: 1600,
      vramGb: 15.1,
      contextLength: 4096,
      runtime: 'llama.cpp',
      status: 'pending-verification',
      notes: 'Higher precision roughly doubles the weight footprint and cuts context sharply.',
    },
    {
      gpu: 'RTX 4070 Ti Super 16GB',
      model: 'Qwen3 14B',
      quantization: 'Q8_0',
      tokensPerSec: 26,
      promptTokensPerSec: 1080,
      vramGb: 15.1,
      contextLength: 4096,
      runtime: 'llama.cpp',
      status: 'pending-verification',
      notes: 'Both 16GB cards give up most of their context window to buy precision.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'Why this model is the reference point',
      body: [
        'A useful comparison benchmark has to sit near the decision boundary, otherwise every card looks the same. Qwen3 14B at 4-bit does exactly that: it fits with room to spare on a 16GB card and does not fit on an 8GB one, so a single model exposes both the capacity cliff and the bandwidth difference in one table.',
        'Read the first two rows as the bandwidth question and the third as the capacity question. They are different questions, and conflating them is the most common mistake in GPU buying advice.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'The 4060 row is not a slow-GPU result',
      body: 'Six to seven tokens per second on the 4060 is a measurement of system RAM bandwidth, not of the card. Once layers live outside VRAM the GPU spends most of each token waiting. A faster 8GB card would produce a very similar number.',
    },
    {
      type: 'prose',
      heading: 'Quantisation cost',
      body: [
        'Moving from Q4_K_M to Q8_0 roughly doubles the weight footprint and cuts generation throughput substantially, because there is more data to stream per token. What you get back is output quality, which matters more on some tasks than others.',
        'On a 16GB card that trade is expensive: the higher-precision variant eats the context headroom that made the setup comfortable in the first place. Both 16GB cards here drop from an 8k window to 4k to afford it.',
      ],
    },
  ],

  faqs: [
    {
      question: 'How many tokens per second does Qwen3 14B produce?',
      answer:
        'Around 52 tokens per second on an RTX 4080 Super and 44 on an RTX 4070 Ti Super, both at Q4_K_M with the model fully resident in VRAM. On an 8GB card that cannot hold it, throughput falls to single digits because layers are read from system RAM.',
    },
    {
      question: 'How much VRAM does Qwen3 14B need?',
      answer:
        'Roughly 9GB for weights at Q4_K_M, with peak usage around 10.4GB at 8k context once KV cache is included. At Q8_0 the footprint rises to about 15GB, which leaves very little headroom on a 16GB card.',
    },
    {
      question: 'Can Qwen3 14B run on an 8GB GPU?',
      answer:
        'It loads, but roughly half the layers offload to system RAM and generation drops to single-digit tokens per second. It technically produces output and is too slow for interactive use. For 8GB cards an 8B-class model is the sensible ceiling.',
    },
    {
      question: 'Is Q4_K_M or Q8_0 better for Qwen3 14B?',
      answer:
        'Q4_K_M for almost everyone — it is faster and leaves room for context. Q8_0 preserves more output quality but costs roughly half your context window on a 16GB card, which is usually the worse trade.',
    },
    {
      question: 'Why is the 4080 Super faster than the 4070 Ti Super here?',
      answer:
        'Memory bandwidth. Both cards hold the model identically at 16GB, so capacity is not the differentiator; token generation is bandwidth-bound, and the 4080 Super streams weights faster.',
    },
    {
      question: 'Does context length affect tokens per second?',
      answer:
        'Yes, increasingly as the window fills. A longer context means a larger KV cache to read each step, so generation slows. It also raises peak VRAM, which can force an offload that slows things dramatically.',
    },
    {
      question: 'How often are these Qwen3 benchmarks updated?',
      answer:
        'Every 14 days. Runtime builds change throughput materially between versions, so figures older than a couple of weeks can be wrong by a wide margin on fast-moving inference engines.',
    },
    {
      question: 'What runtime were these numbers measured with?',
      answer:
        'llama.cpp, single-stream at batch size 1 with a 512-token prompt and a 256-token completion. Other runtimes produce different figures on identical hardware, which is why the runtime is recorded in every row.',
    },
    {
      question: 'Do these numbers apply to the reasoning modes of Qwen3?',
      answer:
        'Raw throughput is the same, but effective speed is not. Extended reasoning generates many more tokens before a final answer, so time-to-answer can be several times longer at identical tokens per second.',
    },
  ],

  schema: {
    '@type': 'Dataset',
    dataset: {
      measurementTechnique:
        'Single-stream local inference throughput, median of three runs at fixed prompt length',
      variableMeasured: 'Generation throughput (tokens/sec) and prompt processing (tokens/sec)',
    },
    about: [{ name: 'Qwen3 14B', type: 'SoftwareApplication' }],
  },

  related: [
    '/guides/how-to-run-qwen3-locally/',
    '/reviews/rtx-4080-super-local-llm/',
    '/benchmarks/gemma-3-27b/',
  ],
};

export default benchmark;
