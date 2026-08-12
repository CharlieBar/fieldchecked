import type { GuideContent } from '@/types/content';

export const guide: GuideContent = {
  slug: 'multi-gpu-setup-for-local-ai',
  status: 'published',
  vertical: 'A',
  datePublished: '2026-08-06',
  difficulty: 'intermediate',
  timeEstimate: 'An afternoon, plus ordering time',

  seo: {
    title: 'Multi-GPU Setup for Local AI: What Actually Matters',
    description:
      'How to add a second GPU for local inference — layer splitting, PCIe lanes, power and thermals — and which of the usual worries turn out not to matter.',
    keywords: [
      'multi gpu setup for local ai',
      'two gpus local llm',
      'dual gpu llm inference',
      'pcie lanes llm inference',
      'run 70b model two gpus',
    ],
    canonical: '/guides/multi-gpu-setup-for-local-ai/',
  },

  hero: {
    eyebrow: 'Build guide',
    headline: 'Building a Multi-GPU Rig for Local Inference',
    subheadline:
      'Adding a second card is mostly a power and airflow problem. The software part is easier than the forums suggest.',
    lastUpdated: '2026-08-06',
  },

  quickAnswer:
    'Adding a second GPU is the standard way to reach 70B-class models locally: two 24GB cards give you 48GB of pooled capacity, enough to run a 70B model at 4-bit with usable context. For single-stream inference the layers are split across cards and each processes its share in sequence, which means PCIe bandwidth and NVLink matter far less than people expect — a card in an x4 slot works fine. What does matter is power supply headroom, physical clearance and airflow, since two cards under sustained load produce continuous heat rather than gaming-style bursts. Match your cards where possible; mismatched pairs run closer to the slower card and complicate configuration.',

  requirements: [
    'A motherboard with two physically usable PCIe slots — electrical width matters less than you think',
    'A power supply with genuine headroom for both cards under sustained load, plus the right connectors',
    'Case clearance for two large cards, ideally with a gap between them',
    'Case airflow planned for continuous load, not intermittent gaming peaks',
    'Matched cards where possible — the same model and VRAM capacity',
  ],

  comparisonTable: {
    columns: ['Configuration', 'Pooled VRAM', 'Largest practical model', 'Main constraint'],
    rows: [
      [
        { value: 'Single 16GB' },
        { value: '16 GB', numeric: true },
        { value: '14B at 4-bit, good context', delta: 'worse' },
        { value: 'Capacity', delta: 'worse' },
      ],
      [
        { value: 'Single 24GB' },
        { value: '24 GB', numeric: true },
        { value: '27B at 4-bit, 16k context', delta: 'neutral' },
        { value: 'Capacity at long context', delta: 'neutral' },
      ],
      [
        { value: 'Dual 16GB' },
        { value: '32 GB', numeric: true },
        { value: '70B at aggressive quant, short context', delta: 'neutral' },
        { value: 'Tight headroom', delta: 'worse' },
      ],
      [
        { value: 'Dual 24GB' },
        { value: '48 GB', numeric: true },
        { value: '70B at 4-bit with usable context', delta: 'better' },
        { value: 'Power and heat', delta: 'worse' },
      ],
    ],
  },

  sections: [
    {
      type: 'prose',
      heading: 'How layer splitting actually works',
      body: [
        'For single-stream inference, the common approach is to split the model\'s layers across cards: the first portion lives on GPU 0, the remainder on GPU 1. Generating a token means passing activations through layers in order, so the cards work in sequence rather than in parallel.',
        'This has an important consequence. The data crossing between cards at each handoff is small — activations, not weights — so the interconnect carries very little traffic. That is why PCIe bandwidth turns out to be a minor factor for inference, and why an x4 slot for the second card is usually fine.',
        'It also means two cards do not double your speed. They roughly double your capacity while throughput stays in the same range as a single card, sometimes slightly lower. Multi-GPU inference is a capacity strategy, not a performance strategy.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      heading: 'The NVLink question',
      body: 'NVLink helps workloads that move large tensors between cards continuously — training and some fine-tuning. For layer-split single-stream inference the traffic is small enough that its absence is difficult to detect. Do not choose a card or motherboard for NVLink if inference is your goal.',
    },
    {
      type: 'steps',
      heading: 'Building it',
      steps: [
        {
          title: 'Audit the power supply first',
          body: 'Two high-end cards under sustained inference load draw continuously, not in bursts. Total the card TDPs, add the rest of the system, and leave genuine headroom. This is the step most likely to force a purchase you did not plan for.',
        },
        {
          title: 'Check physical fit before ordering',
          body: 'Measure slot spacing and case depth with the actual card dimensions. Two three-slot cards adjacent to each other starve the upper card of air; a gap between them is worth more than any airflow tuning afterwards.',
        },
        {
          title: 'Seat the second card in whatever slot is available',
          body: 'Electrical width is not the constraint people assume for inference. If the choice is between an x4 slot with airflow and an x8 slot sandwiched against the first card, take the airflow.',
        },
        {
          title: 'Confirm both cards are visible to your runtime',
          body: 'Before loading anything large, check that your runtime enumerates both devices and reports the expected VRAM on each. Mismatched driver states are far easier to diagnose here than after a failed model load.',
        },
        {
          title: 'Load a model with an explicit split',
          body: 'Start with a model you know fits, and set the layer split explicitly rather than trusting automatic placement. Automatic heuristics are often conservative and can leave capacity unused on the second card.',
        },
        {
          title: 'Watch temperatures under sustained load',
          body: 'Run a long generation and watch both cards, especially memory temperatures on the upper card. Inference load is steady, so thermal problems that never appear during gaming show up here within minutes.',
        },
      ],
    },
    {
      type: 'prose',
      heading: 'Matched versus mismatched cards',
      body: [
        'Mixing cards works, but it complicates things in ways that are rarely worth it. An uneven split has to be configured manually to make use of the larger card\'s capacity, and the pair often behaves closer to the slower card than a naive average would suggest.',
        'If you already own one card and are adding a second, buying the same model again is usually the least painful path. If you are buying both, matching them is straightforwardly better.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'Heat is the constraint that catches people out',
      body: 'A gaming workload heats a card in bursts with recovery time between them. Sustained inference does not — the load is continuous for as long as the generation runs. Cases that handle gaming comfortably can throttle badly under this pattern, especially for the upper card in a two-card stack.',
    },
    {
      type: 'list',
      heading: 'What does not matter as much as you have been told',
      style: 'unordered',
      items: [
        'PCIe generation and lane count for the second card, in single-stream inference',
        'NVLink, unless you are training or fine-tuning rather than generating',
        'Perfectly matched clock speeds between two cards of the same model',
        'CPU performance, which is largely idle once the model is fully offloaded to GPUs',
      ],
    },
  ],

  faqs: [
    {
      question: 'Do two GPUs make local LLM inference faster?',
      answer:
        'No, not for single-stream generation. Layers are split across cards and processed in sequence, so throughput stays in the same range as one card. What two GPUs buy you is capacity — the ability to run models that do not fit on one card at all.',
    },
    {
      question: 'Do I need NVLink for a dual-GPU local AI setup?',
      answer:
        'No. Layer-split inference moves only small activation tensors between cards, so the interconnect carries very little traffic. NVLink matters much more for training and fine-tuning workloads.',
    },
    {
      question: 'Does the second GPU need a full x16 PCIe slot?',
      answer:
        'No. An x4 slot is generally fine for inference, because model weights stay resident on each card and only small activations cross between them. Prioritise airflow over slot width when choosing where to seat the second card.',
    },
    {
      question: 'Can I mix different GPU models in one inference rig?',
      answer:
        'It works, but the split usually needs manual configuration to use the larger card fully, and the pair often performs closer to the slower card. Matched cards are simpler and more predictable.',
    },
    {
      question: 'What power supply do I need for two GPUs?',
      answer:
        'Total both card TDPs, add the rest of the system, and leave real headroom on top. Inference load is continuous rather than bursty, so a supply that copes with gaming peaks may still be marginal here.',
    },
    {
      question: 'How much VRAM do I need for a 70B model?',
      answer:
        'Roughly 40GB at 4-bit quantisation for the weights, plus room for context. Two 24GB cards giving 48GB pooled is the standard configuration; 32GB from two 16GB cards works only at aggressive quantisation with short context.',
    },
    {
      question: 'Will my CPU bottleneck a dual-GPU inference rig?',
      answer:
        'Not if the model is fully offloaded to the GPUs — the CPU is largely idle during generation. CPU speed matters only when layers spill into system RAM, at which point you have a capacity problem rather than a CPU problem.',
    },
    {
      question: 'Is it better to buy one bigger GPU or two smaller ones?',
      answer:
        'One card is simpler, cooler and quieter, so prefer it if a single card holds your models. Two cards are the answer when no single consumer card has enough capacity, which is the case for 70B-class models.',
    },
    {
      question: 'How do I split layers between two GPUs?',
      answer:
        'Most runtimes accept an explicit split — either a layer count per device or a proportional ratio. Setting it manually is worth doing, since automatic placement is often conservative and leaves capacity unused.',
    },
  ],

  schema: {
    '@type': 'HowTo',
    itemList: [
      { name: 'Audit power supply headroom' },
      { name: 'Verify physical clearance and airflow' },
      { name: 'Seat and enumerate the second card' },
      { name: 'Load a model with an explicit layer split' },
      { name: 'Validate temperatures under sustained load' },
    ],
  },

  related: [
    '/reviews/rtx-4080-super-local-llm/',
    '/guides/best-gpu-for-local-llm-inference-2026/',
    '/benchmarks/llama-3-3-70b/',
  ],
};

export default guide;
