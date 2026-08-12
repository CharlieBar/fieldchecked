import type { VsContent } from '@/types/content';

export const comparison: VsContent = {
  slug: 'rtx-4080-super-vs-rtx-3090',
  status: 'draft',
  datePublished: '2026-08-11',
  contenders: ['RTX 4080 Super', 'RTX 3090'],

  seo: {
    title: 'RTX 4080 Super vs RTX 3090 for Local AI: Speed or Capacity',
    description:
      'Sixteen fast gigabytes against twenty-four slower ones. A direct comparison of the RTX 4080 Super and used RTX 3090 for local LLM inference and image generation.',
    keywords: [
      'rtx 4080 super vs rtx 3090',
      '4080 super vs 3090 local llm',
      '4080 super vs 3090 ai',
      '16gb vs 24gb vram llm',
      'best gpu local llm value',
    ],
    canonical: '/vs/rtx-4080-super-vs-rtx-3090/',
  },

  hero: {
    eyebrow: 'Head to head',
    headline: 'RTX 4080 Super vs RTX 3090 for Local AI',
    subheadline:
      'One card is faster at what it can hold. The other holds more. Almost every buying decision here reduces to which of those you are short of.',
    lastUpdated: '2026-08-11',
  },

  quickAnswer:
    'Choose the used RTX 3090 if you want to run models larger than about 14B parameters — its 24GB of VRAM runs 27B-class models at full speed with real context length, and two cards handle 70B. Choose the RTX 4080 Super if your models fit in 16GB and you want lower power draw, better image-generation throughput, and a warranty. On models both cards hold, the 4080 Super generates tokens roughly 15–20% faster. On models only the 3090 holds, that comparison is meaningless: the 4080 Super has to offload to system RAM and drops to a few tokens per second. Capacity decides first; speed decides second.',

  comparisonTable: {
    columns: ['Spec', 'RTX 4080 Super', 'RTX 3090'],
    rows: [
      [
        { value: 'VRAM' },
        { value: '16 GB GDDR6X', delta: 'worse', numeric: true },
        { value: '24 GB GDDR6X', delta: 'better', numeric: true },
      ],
      [
        { value: 'Memory bandwidth' },
        { value: '736 GB/s', delta: 'worse', numeric: true },
        { value: '936 GB/s', delta: 'better', numeric: true },
      ],
      [
        { value: 'Qwen3 14B (Q4_K_M)' },
        { value: '52 tok/s', delta: 'better', numeric: true },
        { value: '44 tok/s', delta: 'worse', numeric: true },
      ],
      [
        { value: 'Gemma 3 27B (Q4_K_M)' },
        { value: '21 tok/s, 4k ctx', delta: 'worse', numeric: true },
        { value: '26 tok/s, 16k ctx', delta: 'better', numeric: true },
      ],
      [
        { value: 'Llama 3.3 70B' },
        { value: 'Offload only, ~2.4 tok/s', delta: 'worse' },
        { value: 'Needs a second card', delta: 'neutral' },
      ],
      [
        { value: 'Image generation' },
        { value: 'Faster', delta: 'better' },
        { value: 'Slower', delta: 'worse' },
      ],
      [
        { value: 'TDP' },
        { value: '320 W', delta: 'better', numeric: true },
        { value: '350 W', delta: 'worse', numeric: true },
      ],
      [
        { value: 'Typical price (Aug 2026)' },
        { value: '~$899 new', delta: 'worse', numeric: true },
        { value: '~$650 used', delta: 'better', numeric: true },
      ],
      [
        { value: 'Warranty' },
        { value: 'Yes', delta: 'better' },
        { value: 'Used-market risk', delta: 'worse' },
      ],
    ],
  },

  winner: {
    name: 'RTX 3090 (used), for most local LLM buyers',
    reason:
      'Capacity is the constraint that stops people, and 24GB at a lower price solves it. The 4080 Super wins on speed, efficiency and peace of mind, but those matter only after the model fits — and a meaningful share of interesting models do not fit in 16GB.',
  },

  pickIf: [
    {
      contender: 'RTX 3090',
      scenario:
        'You want to run 27B-class models at full speed with a 16k context window rather than squeezing them into 4k.',
    },
    {
      contender: 'RTX 3090',
      scenario:
        'You plan to add a second card and reach 70B-class models on a realistic budget.',
    },
    {
      contender: 'RTX 4080 Super',
      scenario:
        'Image generation in ComfyUI or SDXL/Flux workflows is your main workload, where 16GB is ample and compute matters more.',
    },
    {
      contender: 'RTX 4080 Super',
      scenario:
        'You want a warranty, lower power draw and a card that fits an existing mid-tower without an airflow rethink.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'Why capacity beats speed in this matchup',
      body: [
        'Local inference performance is not a smooth curve. If a model and its KV cache fit in VRAM, the GPU streams weights at hundreds of gigabytes per second. If they do not fit, the shortfall is read from system RAM at a fraction of that rate, and generation slows by roughly an order of magnitude.',
        'This is why a 15–20% throughput advantage on shared models is the less important number in this comparison. It applies only in the region where both cards work, and it is dwarfed by the difference between "runs" and "does not run" everywhere else.',
      ],
    },
    {
      type: 'prose',
      heading: 'Where the 4080 Super genuinely wins',
      body: [
        'Image generation is the clearest case. Diffusion workloads are compute-bound and fit inside 16GB with room to spare, so the newer architecture converts directly into shorter generation times without capacity ever becoming the issue.',
        'The second win is operational rather than technical. A new card carries a warranty, draws less power, runs cooler and does not need thermal-pad maintenance. For someone who wants a machine that works rather than a project, that is worth real money.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      heading: 'The context-length trap',
      body: 'The 27B row above is the one to read twice. Both cards run the model, but the 4080 Super does so at 4k context while the 3090 manages 16k. KV cache grows with context length, so the capacity gap widens exactly as your documents get longer — which is usually when you need the model most.',
    },
    {
      type: 'list',
      heading: 'Cases where neither is the right answer',
      style: 'unordered',
      items: [
        'You need 70B-class models with long context — budget for two 24GB cards rather than choosing between these',
        'Your workload is short bursts of small-model inference — a cheaper 12GB card likely suffices',
        'You need this for fine-tuning rather than inference — the capacity requirements are different and higher',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is the RTX 4080 Super or RTX 3090 better for local LLMs?',
      answer:
        'The RTX 3090 is better for most local LLM work because its 24GB of VRAM runs larger models at full speed. The RTX 4080 Super is faster on models that fit within 16GB, and is the better card for image generation.',
    },
    {
      question: 'How much faster is the RTX 4080 Super than the RTX 3090?',
      answer:
        'On a 14B model that fits comfortably in both, roughly 15–20% faster at token generation. That advantage disappears entirely on models that exceed 16GB, where the 4080 Super must offload to system RAM.',
    },
    {
      question: 'Is 24GB of VRAM worth the extra heat and power?',
      answer:
        'If you run models above about 14B parameters, yes — the alternative is not slower inference but no practical inference at all. If everything you run fits in 16GB, you are paying roughly 30W of extra sustained draw for capacity you never touch.',
    },
    {
      question: 'Which card is better for Stable Diffusion and ComfyUI?',
      answer:
        'The RTX 4080 Super. Diffusion workloads are compute-bound rather than capacity-bound and fit within 16GB, so the newer architecture converts directly into faster image generation.',
    },
    {
      question: 'Can either card run a 70B model on its own?',
      answer:
        'Neither can run one well. A 70B model at 4-bit needs roughly 40GB. The practical route is two 24GB cards splitting the layers, which lands in the mid-teens of tokens per second.',
    },
    {
      question: 'Is buying a used RTX 3090 in 2026 risky?',
      answer:
        'There is real condition variance. Ask for sustained-load memory temperatures, prefer sellers with a return window, and budget for replacing thermal pads on a hard-used card. The price advantage generally still justifies the risk.',
    },
    {
      question: 'Does the RTX 3090 have better memory bandwidth than the 4080 Super?',
      answer:
        'Yes, on paper — a wider 384-bit bus gives it higher raw bandwidth. The 4080 Super still generates tokens faster on models both cards hold, because its newer architecture and larger cache make more effective use of what it has.',
    },
    {
      question: 'Which card is better value for local AI?',
      answer:
        'The used RTX 3090, on a per-gigabyte basis and usually on absolute price too. The 4080 Super costs more and gives you less capacity; what it buys is efficiency, warranty and image-generation speed.',
    },
    {
      question: 'Should I wait for a newer card instead?',
      answer:
        'Only if a specific announced card raises consumer VRAM capacity. Successive generations have improved bandwidth and efficiency while holding capacity flat, and capacity is the constraint that decides what you can run.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [
      { name: 'NVIDIA GeForce RTX 4080 Super', type: 'Product' },
      { name: 'NVIDIA GeForce RTX 3090', type: 'Product' },
    ],
    itemList: [
      {
        name: 'RTX 3090 (used) — best for capacity-bound local LLM work',
        description: '24GB of VRAM runs 27B-class models at full speed and pairs for 70B.',
        url: '/reviews/rtx-3090-used-local-llm/',
      },
      {
        name: 'RTX 4080 Super — best for image generation and efficiency',
        description: 'Faster within 16GB, lower power draw, current-generation warranty.',
        url: '/reviews/rtx-4080-super-local-llm/',
      },
    ],
  },

  related: [
    '/reviews/rtx-3090-used-local-llm/',
    '/reviews/rtx-4080-super-local-llm/',
    '/guides/best-gpu-for-local-llm-inference-2026/',
  ],
};

export default comparison;
