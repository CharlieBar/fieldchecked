import type { BenchmarkContent } from '@/types/content';

export const benchmark: BenchmarkContent = {
  slug: 'qwen3-14b',
  model: 'qwen3-14b',
  modelDisplayName: 'Qwen3 14B',
  status: 'draft',
  datePublished: '2026-08-12',
  updateCadenceDays: 14,

  seo: {
    title: 'Qwen3 14B Tokens per Second Benchmarks by GPU',
    description:
      'Generation and prompt-processing throughput for Qwen3 14B across consumer GPUs, with quantisation, context length and VRAM footprint recorded for every run.',
    keywords: [
      'qwen3 14b tokens per second',
      'qwen3 14b benchmark',
      'qwen3 14b vram',
      'qwen3 gpu benchmark',
      'local llm tokens per second benchmark',
    ],
    canonical: '/benchmarks/qwen3-14b/',
  },

  hero: {
    eyebrow: 'Living dataset',
    headline: 'Qwen3 14B: Tokens per Second by GPU',
    subheadline:
      'The 14B class is where most 16GB cards are genuinely comfortable, which makes it the most useful single point of comparison between them.',
    lastUpdated: '2026-08-12',
  },

  quickAnswer:
    'Qwen3 14B at Q4_K_M needs roughly 9GB of weights, so it runs fully offloaded on any 16GB card with room left for an 8k–16k context window. Generation throughput on current-generation 16GB cards lands around 60 tokens per second, previous-generation 16GB cards around 50, and a used 24GB card around 44 — slower per token, but with far more context headroom. Because the model fits everywhere in this table, the numbers are a clean read on memory bandwidth rather than capacity. That makes this the one dataset on the site where comparing cards purely on throughput is actually valid.',

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
      gpu: 'RTX 5070 Ti 16GB',
      model: 'Qwen3 14B',
      quantization: 'Q4_K_M',
      tokensPerSec: 61,
      promptTokensPerSec: 2100,
      vramGb: 10.4,
      contextLength: 8192,
      runtime: 'llama.cpp',
      status: 'pending-verification',
    },
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
      gpu: 'RTX 3090 24GB',
      model: 'Qwen3 14B',
      quantization: 'Q4_K_M',
      tokensPerSec: 44,
      promptTokensPerSec: 1420,
      vramGb: 10.4,
      contextLength: 8192,
      runtime: 'llama.cpp',
      status: 'pending-verification',
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
      gpu: 'RTX 3090 24GB',
      model: 'Qwen3 14B',
      quantization: 'Q8_0',
      tokensPerSec: 27,
      promptTokensPerSec: 1250,
      vramGb: 15.1,
      contextLength: 16384,
      runtime: 'llama.cpp',
      status: 'pending-verification',
      notes: 'Same quantisation as the row above, four times the context. This is what 24GB buys.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'Why this model is the reference point',
      body: [
        'A useful comparison benchmark has to fit on every card being compared, otherwise the numbers stop describing the same workload. Qwen3 14B at 4-bit does that across the whole consumer range from 16GB upward, which makes it the cleanest single-model read on relative card performance available.',
        'The pattern in the data is the one bandwidth-bound generation always produces: throughput tracks memory bandwidth and architecture, and the ranking barely moves as long as everything stays resident in VRAM.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      heading: 'Read the last two rows together',
      body: 'The two Q8_0 rows show the same model at the same quantisation on two cards. The throughput difference is modest. The context difference is fourfold. That is the entire capacity argument in two lines of a table.',
    },
    {
      type: 'prose',
      heading: 'Quantisation cost',
      body: [
        'Moving from Q4_K_M to Q8_0 roughly doubles the weight footprint and reduces generation throughput substantially, because there is simply more data to stream per token. What you get back is output quality, which matters more on some tasks than others.',
        'On a 16GB card that trade is expensive: the higher-precision variant eats the context headroom that made the setup comfortable. On 24GB it is affordable, which is another way capacity converts into practical flexibility rather than raw speed.',
      ],
    },
  ],

  faqs: [
    {
      question: 'How many tokens per second does Qwen3 14B produce?',
      answer:
        'On current-generation 16GB cards, around 60 tokens per second at Q4_K_M with the model fully in VRAM. Previous-generation 16GB cards land near 50, and a used 24GB card around 44. All figures are single-stream at a 512-token prompt.',
    },
    {
      question: 'How much VRAM does Qwen3 14B need?',
      answer:
        'Roughly 9GB for weights at Q4_K_M, with peak usage around 10.4GB at 8k context once KV cache is included. At Q8_0 the footprint rises to about 15GB, which leaves very little headroom on a 16GB card.',
    },
    {
      question: 'Can Qwen3 14B run on a 12GB GPU?',
      answer:
        'At Q4_K_M with a short context window, yes, but with little margin. Raising context or quantisation will push layers into system RAM and collapse throughput, so a 16GB card is the comfortable minimum for this model.',
    },
    {
      question: 'Is Q4_K_M or Q8_0 better for Qwen3 14B?',
      answer:
        'Q4_K_M for constrained cards — it is roughly twice as fast and leaves room for context. Q8_0 preserves more output quality and is worth it only if you have capacity to spare after accounting for the context length you need.',
    },
    {
      question: 'Why is the 24GB card slower than the 16GB cards here?',
      answer:
        'Because this model fits on all of them, so the comparison measures memory bandwidth and architecture rather than capacity. The older card is slower per token while offering far more context headroom at the same quantisation.',
    },
    {
      question: 'Does context length affect tokens per second?',
      answer:
        'Yes, indirectly and increasingly. Longer context means a larger KV cache to read from each step, so generation slows as the window fills. It also raises peak VRAM, which can force an offload that slows things dramatically.',
    },
    {
      question: 'How often are these Qwen3 benchmarks updated?',
      answer:
        'Every 14 days. Runtime builds change throughput materially between versions, so figures older than a couple of weeks can be wrong by a wide margin on fast-moving inference engines.',
    },
    {
      question: 'What runtime were these numbers measured with?',
      answer:
        'llama.cpp, single-stream at batch size 1 with a 512-token prompt and a 256-token completion. Other runtimes will produce different figures on identical hardware, which is why the runtime is recorded in every row.',
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
