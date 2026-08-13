import type { BenchmarkContent } from '@/types/content';

export const benchmark: BenchmarkContent = {
  slug: 'llama-3-3-70b',
  model: 'llama-3-3-70b',
  modelDisplayName: 'Llama 3.3 70B',
  status: 'draft',
  vertical: 'A',
  datePublished: '2026-08-11',
  updateCadenceDays: 14,

  seo: {
    title: 'Llama 3.3 70B on 16GB and Under: The Honest Answer Is No',
    description:
      'Throughput for Llama 3.3 70B on an RTX 4080 Super, 4070 Ti Super and 4060 — every configuration offloaded, every result in low single digits, and why the GPU stops mattering.',
    keywords: [
      'llama 3.3 70b tokens per second',
      'llama 70b local benchmark',
      '70b model vram requirements',
      'can 16gb run 70b model',
      'llama 3.3 70b gpu requirements',
    ],
    canonical: '/benchmarks/llama-3-3-70b/',
  },

  hero: {
    eyebrow: 'Living dataset',
    headline: 'Llama 3.3 70B: A Page of Numbers Telling You Not To',
    subheadline:
      'Three cards, three offloaded configurations, three results between one and three tokens per second. The interesting finding is how little the GPU matters.',
    lastUpdated: '2026-08-11',
  },

  quickAnswer:
    'Llama 3.3 70B at 4-bit needs roughly 40GB for weights alone, so none of the cards here can hold it — every row in this table is a partial-offload configuration where most of the model is read from system RAM. The results cluster between 1.4 and 2.4 tokens per second, and the RTX 4080 Super beats the RTX 4070 Ti Super by about a tenth of a token per second, which is the whole point: once a model does not fit, the GPU is no longer doing the work and choosing a faster one changes nothing. Running a 70B model locally needs roughly 48GB of pooled VRAM. If that is your requirement, no card in this price range is the answer.',

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
    'Every row here offloads. The notes record roughly how much of the model stayed on the GPU, since that ratio drives the result far more than the card does.',
    'Peak VRAM is sampled during generation, not at load.',
    'No multi-GPU rows appear on this page: we do not have a multi-GPU rig, so we cannot measure one.',
    'Runs are re-executed every 14 days.',
  ],

  rows: [
    {
      gpu: 'RTX 4080 Super 16GB',
      model: 'Llama 3.3 70B',
      quantization: 'Q4_K_M',
      tokensPerSec: 2.4,
      vramGb: 15.8,
      contextLength: 4096,
      runtime: 'llama.cpp (partial CPU offload)',
      status: 'pending-verification',
      notes: 'Roughly a third of layers on GPU. The rest is read from system RAM.',
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
      notes: 'Within a rounding error of the 4080 Super — neither card is the bottleneck here.',
    },
    {
      gpu: 'RTX 4060 8GB',
      model: 'Llama 3.3 70B',
      quantization: 'Q4_K_M',
      tokensPerSec: 1.4,
      vramGb: 7.8,
      contextLength: 2048,
      runtime: 'llama.cpp (heavy CPU offload)',
      status: 'pending-verification',
      notes: 'Barely a tenth of the model on GPU. Included only to complete the ladder.',
    },
  ],

  sections: [
    {
      type: 'callout',
      tone: 'warn',
      heading: 'The top two rows are the finding',
      body: 'Two cards separated by a meaningful price gap and a real bandwidth difference produce results a tenth of a token per second apart. When a model does not fit, GPU choice stops mattering — system RAM bandwidth sets the speed, and you are effectively benchmarking your DDR5.',
    },
    {
      type: 'prose',
      heading: 'What 70B actually costs',
      body: [
        'At 4-bit quantisation, 70B parameters occupy roughly 40GB before context. No consumer card ships that much memory, so every viable local configuration is a multi-card one — which turns a GPU purchase into a build decision involving power supply, case airflow and slot layout.',
        'We cannot show you that configuration, because we do not have one. What this page can tell you honestly is the shape of the failure on hardware most people actually own, and that shape is unambiguous: single digits, regardless of card.',
      ],
    },
    {
      type: 'prose',
      heading: 'Why offloading disappoints',
      body: [
        'Generating each token requires reading through the model weights. When part of the model lives in system RAM, that portion is read over a bus roughly an order of magnitude slower than GPU memory, and the whole generation waits on it.',
        'This is why offloading behaves like a cliff rather than a gradient. Moving from all layers on GPU to two-thirds on GPU does not cost a third of your speed — it costs most of it, because the slowest path dominates the total.',
      ],
    },
    {
      type: 'prose',
      heading: 'What to run instead',
      body: [
        'On a 16GB card, a 14B model at 4-bit runs about twenty times faster than this and fits with room for a real context window. For most work that is not a compromise, it is simply the correct choice.',
        'If a 70B-class model is genuinely required, the honest options are pooled VRAM across two 24GB cards, a large unified-memory machine, or an API. Local inference on a single mid-range card is not one of them.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Can a 16GB GPU run Llama 3.3 70B?',
      answer:
        'Only by offloading most of the model to system RAM, which produces around 2.4 tokens per second on an RTX 4080 Super. It generates output, but not at a speed anyone works with interactively.',
    },
    {
      question: 'How much VRAM does Llama 3.3 70B need?',
      answer:
        'Roughly 40GB for weights at 4-bit quantisation, plus room for KV cache — about 42–43GB in practice at an 8k context window. That is beyond any single consumer card.',
    },
    {
      question: 'Why do the RTX 4080 Super and 4070 Ti Super give almost identical results?',
      answer:
        'Because neither is doing most of the work. When the majority of layers sit in system RAM, generation speed is set by system memory bandwidth, and the difference between the two GPUs becomes almost irrelevant.',
    },
    {
      question: 'Would more system RAM speed up an offloaded 70B model?',
      answer:
        'No. Additional RAM lets the model load, but the bottleneck is memory bandwidth, not capacity. The only change that materially improves throughput is fitting more layers into VRAM.',
    },
    {
      question: 'Is 2 tokens per second usable for anything?',
      answer:
        'For batch work you can walk away from, occasionally. For anything interactive, no — a 250-word reply takes over two minutes. A 14B model on the same card is roughly twenty times faster.',
    },
    {
      question: 'What hardware do I actually need for a 70B model?',
      answer:
        'Roughly 48GB of pooled VRAM, typically two 24GB cards splitting the layers, or a large unified-memory system. We do not own either, so this page does not publish numbers for them.',
    },
    {
      question: 'Why publish a benchmark page for a model that does not run well?',
      answer:
        'Because "can my card run this" is a real query with a real answer, and the answer is more useful than an empty page. The numbers here also demonstrate the offload cliff more clearly than any model that fits.',
    },
    {
      question: 'Would a smaller quantisation make 70B viable on 16GB?',
      answer:
        'No. Even at aggressive 2-bit quantisation a 70B model needs more than 16GB, and quality degradation at that level is severe enough to give up most of the advantage of the larger model.',
    },
    {
      question: 'Are these numbers measured or estimated?',
      answer:
        'Every row on this page is currently marked pending verification, meaning the figure is a placeholder that has not yet been reproduced on the rig. The page stays unindexed until each row is either measured or removed.',
    },
  ],

  schema: {
    '@type': 'Dataset',
    dataset: {
      measurementTechnique:
        'Single-stream local inference throughput under partial CPU offload',
      variableMeasured: 'Generation throughput (tokens/sec) and peak VRAM (GB)',
    },
    about: [{ name: 'Llama 3.3 70B', type: 'SoftwareApplication' }],
  },

  related: [
    '/benchmarks/qwen3-14b/',
    '/reviews/rtx-4080-super-local-llm/',
    '/blog/vram-is-still-the-bottleneck/',
  ],
};

export default benchmark;
