import type { BenchmarkContent } from '@/types/content';

export const benchmark: BenchmarkContent = {
  slug: 'llama-3-3-70b',
  model: 'llama-3-3-70b',
  modelDisplayName: 'Llama 3.3 70B',
  status: 'draft',
  datePublished: '2026-08-11',
  updateCadenceDays: 14,

  seo: {
    title: 'Llama 3.3 70B Tokens per Second: What It Takes to Run It Locally',
    description:
      'Throughput for Llama 3.3 70B across single-card, dual-card and offloaded configurations — and the point where "runs locally" stops meaning "usable locally".',
    keywords: [
      'llama 3.3 70b tokens per second',
      'llama 70b local benchmark',
      '70b model vram requirements',
      'run 70b locally two gpus',
      'llama 3.3 70b gpu requirements',
    ],
    canonical: '/benchmarks/llama-3-3-70b/',
  },

  hero: {
    eyebrow: 'Living dataset',
    headline: 'Llama 3.3 70B: The Capacity Cliff, Measured',
    subheadline:
      'The same model on the same runtime, ranging from sixteen tokens per second to two, depending entirely on whether it fits.',
    lastUpdated: '2026-08-11',
  },

  quickAnswer:
    'Llama 3.3 70B at 4-bit quantisation needs roughly 40GB for weights alone, which puts it out of reach of any single consumer GPU. Two 24GB cards splitting the layers deliver around 16 tokens per second with an 8k context window — slower than a 14B model but genuinely usable. Single-card configurations must offload most of the model to system RAM, which drops throughput to roughly 2–3 tokens per second regardless of how fast the GPU is. This dataset is the clearest illustration on the site of why capacity dominates GPU selection: the fastest 16GB card and the slowest one perform almost identically here, because neither is doing the work.',

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
    'Multi-GPU rows use explicit layer splits rather than automatic placement, which is often conservative.',
    'Offloaded configurations record how many layers remained on the GPU, since that ratio drives the result more than the GPU model does.',
    'Peak VRAM is sampled during generation and, for multi-GPU rows, reported as the total across cards.',
    'Runs are re-executed every 14 days.',
  ],

  rows: [
    {
      gpu: 'RTX 3090 24GB ×2',
      model: 'Llama 3.3 70B',
      quantization: 'Q4_K_M',
      tokensPerSec: 16,
      promptTokensPerSec: 480,
      vramGb: 42.6,
      contextLength: 8192,
      runtime: 'llama.cpp (tensor split)',
      status: 'pending-verification',
      notes: 'All layers resident across two cards. The configuration most people should target.',
    },
    {
      gpu: 'RTX 3090 24GB ×2',
      model: 'Llama 3.3 70B',
      quantization: 'Q5_K_M',
      tokensPerSec: 12.5,
      promptTokensPerSec: 410,
      vramGb: 46.8,
      contextLength: 4096,
      runtime: 'llama.cpp (tensor split)',
      status: 'pending-verification',
      notes: 'Higher precision fits in 48GB only by giving up most of the context window.',
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
      notes: 'Roughly a third of layers on GPU. The rest is read from system RAM.',
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
      notes: 'Nearly identical to the newer card above — neither is the bottleneck here.',
    },
  ],

  sections: [
    {
      type: 'callout',
      tone: 'warn',
      heading: 'The two 16GB rows are the point of this page',
      body: 'A current-generation card and a previous-generation one, separated by a full architecture and a memory-technology jump, produce results within a rounding error of each other. When a model does not fit, GPU choice stops mattering — system RAM bandwidth sets the speed.',
    },
    {
      type: 'prose',
      heading: 'What 70B actually costs',
      body: [
        'At 4-bit quantisation, 70B parameters occupy roughly 40GB before context. No consumer GPU ships that much memory, so every viable local configuration is a multi-card one — which turns a GPU purchase into a build decision involving power supply, case airflow and slot layout.',
        'The reward is real. Sixteen tokens per second is slower than reading speed for most people, but it is fast enough for drafting, analysis and code work where you are reading output as it arrives rather than waiting on a wall of text.',
      ],
    },
    {
      type: 'prose',
      heading: 'Why offloading disappoints',
      body: [
        'Generating each token requires reading through the model weights. When part of the model lives in system RAM, that portion is read over a bus roughly an order of magnitude slower than GPU memory, and the whole generation waits on it.',
        'This is why offloading behaves like a cliff rather than a gradient. Moving from all layers on GPU to two-thirds on GPU does not cost a third of your speed — it costs most of it, because the slowest path dominates.',
      ],
    },
    {
      type: 'prose',
      heading: 'Quantisation choices at this size',
      body: [
        'Q4_K_M is the practical default for 70B on 48GB, and the Q5_K_M row shows why: the higher-precision variant fits, but only by cutting the context window in half and giving up throughput on top.',
        'For most local work the extra precision does not pay for the lost context. A model that can see your whole file at 4-bit beats a slightly more precise one that cannot.',
      ],
    },
  ],

  faqs: [
    {
      question: 'How many tokens per second does Llama 3.3 70B run at locally?',
      answer:
        'Around 16 tokens per second on two 24GB cards with all layers resident and an 8k context window. Single-card configurations with CPU offload manage roughly 2–3 tokens per second, which is too slow for interactive use.',
    },
    {
      question: 'How much VRAM does Llama 3.3 70B need?',
      answer:
        'Roughly 40GB for weights at 4-bit quantisation, plus room for KV cache — about 42–43GB in practice at 8k context. That requires two 24GB cards; 32GB from two 16GB cards is only viable at more aggressive quantisation.',
    },
    {
      question: 'Can a single GPU run a 70B model?',
      answer:
        'Not usefully. No consumer card has enough memory, so most of the model is offloaded to system RAM and throughput falls to a few tokens per second. It produces output, but not at a speed anyone works with.',
    },
    {
      question: 'Is 16 tokens per second fast enough to be useful?',
      answer:
        'For most reading-along workflows, yes — it is roughly conversational pace. It is noticeably slower than a 14B model, and it becomes painful for tasks that generate long outputs or use extended reasoning.',
    },
    {
      question: 'Why do different 16GB cards give almost identical 70B results?',
      answer:
        'Because neither card is doing most of the work. When the majority of layers sit in system RAM, generation speed is set by system memory bandwidth, and GPU architecture becomes almost irrelevant to the result.',
    },
    {
      question: 'Do I need NVLink to run 70B across two GPUs?',
      answer:
        'No. Layer-split inference passes only small activation tensors between cards, so PCIe is sufficient. NVLink matters far more for training workloads than for generation.',
    },
    {
      question: 'Would more system RAM speed up an offloaded 70B model?',
      answer:
        'No. Additional RAM lets the model load, but the bottleneck is memory bandwidth, not capacity. The only fix that materially changes throughput is fitting more layers into VRAM.',
    },
    {
      question: 'Should I use Q4_K_M or Q5_K_M for a 70B model?',
      answer:
        'Q4_K_M in most cases. On 48GB of pooled capacity, Q5_K_M fits only by halving the context window and costs throughput as well, and the extra precision rarely compensates for seeing less of your input.',
    },
    {
      question: 'Is a 70B model worth the hardware over a 27B one?',
      answer:
        'It depends on the work. For reasoning-heavy or nuanced tasks the larger model is meaningfully better; for summarisation, straightforward code and chat, a 27B model on a single card is faster and far simpler to run.',
    },
  ],

  schema: {
    '@type': 'Dataset',
    dataset: {
      measurementTechnique:
        'Single-stream local inference throughput across single-GPU, multi-GPU and CPU-offloaded configurations',
      variableMeasured: 'Generation throughput (tokens/sec) and peak VRAM (GB)',
    },
    about: [{ name: 'Llama 3.3 70B', type: 'SoftwareApplication' }],
  },

  related: [
    '/guides/multi-gpu-setup-for-local-ai/',
    '/reviews/rtx-3090-used-local-llm/',
    '/blog/vram-is-still-the-bottleneck/',
  ],
};

export default benchmark;
