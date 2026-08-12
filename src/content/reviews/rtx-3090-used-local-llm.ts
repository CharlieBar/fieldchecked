import type { ReviewContent } from '@/types/content';

export const review: ReviewContent = {
  slug: 'rtx-3090-used-local-llm',
  status: 'draft',
  datePublished: '2026-08-10',
  product: 'NVIDIA GeForce RTX 3090 (24GB, used)',
  priceUsd: 650,

  seo: {
    title: 'Used RTX 3090 Review: Still the Value Pick for Local LLMs',
    description:
      'Two generations old, 24GB of VRAM, and still the cheapest honest route to running large models locally. What the used RTX 3090 gets right and what it costs you in power and heat.',
    keywords: [
      'used rtx 3090 local llm',
      'rtx 3090 24gb ai',
      'rtx 3090 tokens per second',
      'best value gpu local llm',
      'rtx 3090 vs 4080 ai',
    ],
    canonical: '/reviews/rtx-3090-used-local-llm/',
  },

  hero: {
    eyebrow: 'GPU Review',
    headline: 'The Used RTX 3090 Is Still the Cheapest Way to 24GB',
    subheadline:
      'Old, hot, power-hungry, and still the card most people should buy if capacity is what they are short of.',
    lastUpdated: '2026-08-10',
  },

  quickAnswer:
    'A used RTX 3090 remains the best value in local AI hardware because it solves the constraint that actually blocks people: capacity. Its 24GB of VRAM runs 27B-class models comfortably and 70B models in a two-card configuration, at roughly the street price of a current-generation 16GB card. You pay for that in power draw around 350W, significant heat, no warranty, and the risk inherent in buying a card that may have spent three years mining or gaming. Generation throughput sits below current-generation cards, but the comparison is misleading — the models it holds are ones a 16GB card cannot run at any speed.',

  rating: { value: 4, best: 5 },

  verdict:
    'The default recommendation for anyone whose limit is model size rather than speed. Buy two if you are serious about 70B; buy something newer if you mainly generate images.',

  pros: [
    '24GB of VRAM at a price current-generation cards do not match on a per-gigabyte basis',
    'NVLink support on this generation makes two-card configurations straightforward',
    'Runs 27B-class models at full speed with room for real context length',
    'Mature, boring, fully supported — every local inference runtime targets it well',
  ],

  cons: [
    'Around 350W under sustained load, and it dumps that heat into your case',
    'No warranty, and used-market condition is genuinely variable',
    'Slower generation than current-generation cards on models that fit in both',
    'Large, heavy, and awkward in cases not designed for three-slot cards',
  ],

  specs: [
    { label: 'VRAM', value: '24 GB GDDR6X' },
    { label: 'Memory bandwidth', value: '936 GB/s (vendor spec)' },
    { label: 'Memory bus', value: '384-bit' },
    { label: 'Architecture', value: 'Ampere' },
    { label: 'TDP', value: '350 W' },
    { label: 'Typical used price', value: '$600–750 (Aug 2026)' },
  ],

  benchmarks: [
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
      notes: 'Slower than a 4080 Super on a model both cards hold comfortably.',
    },
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
      notes: 'The case for 24GB: full offload with a 16k window and headroom left over.',
    },
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
      notes: 'Two cards, layers split across both. Interactive, which single-card 70B is not.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'Why an old card still wins',
      body: [
        'Local inference rewards capacity in a way most consumer computing does not. There is no graceful degradation: a model either fits in VRAM and runs at full speed, or it does not fit and runs at a small fraction of that. This turns GPU selection into a threshold problem rather than an optimisation problem, and thresholds are bought with gigabytes.',
        'The 3090 was the last consumer card to ship 24GB at a price that has since fallen into used-market territory. Nothing in the two generations after it changed that arithmetic for buyers on a budget, which is why a card released years ago keeps appearing at the top of buying recommendations written this year.',
      ],
    },
    {
      type: 'callout',
      tone: 'win',
      heading: 'The two-card configuration is the real argument',
      body: 'Two used 3090s land near the price of one current-generation flagship and give you 48GB of pooled capacity. That is enough for 70B-class models at 4-bit with usable context — a category of work that is simply closed to single 16GB cards regardless of how fast they are.',
    },
    {
      type: 'prose',
      heading: 'What buying used actually costs you',
      body: [
        'Power is the honest recurring cost. A pair of these under sustained inference load will draw more than most desk-side builds are provisioned for, and the PSU headroom and case airflow needed are real line items in the budget, not footnotes.',
        'Condition is the other risk. Thermal pads degrade, and cards used hard for years often need repadding to keep memory temperatures in a safe range. Budget for that as a maintenance task rather than treating it as a defect if it appears.',
      ],
    },
    {
      type: 'list',
      heading: 'What to check before buying used',
      style: 'unordered',
      items: [
        'Ask for a screenshot of memory junction temperature under sustained load, not idle',
        'Confirm the card was not run in an open-air mining frame for extended periods',
        'Check that the seller supports a return window — condition problems surface within days, not months',
        'Verify your PSU has the headroom and connectors for the card, and for a second one later',
        'Measure your case: three-slot cards defeat a surprising number of mid-tower builds',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'Where this card is the wrong answer',
      body: 'If your work is primarily image generation, the case weakens considerably: diffusion workloads are compute-bound and fit comfortably in 16GB, so you are paying in power and heat for capacity you will not use.',
    },
  ],

  faqs: [
    {
      question: 'Is a used RTX 3090 still worth buying for AI in 2026?',
      answer:
        'Yes, if capacity is your constraint. 24GB at used-market prices remains the cheapest route to running 27B-class models at full speed, and two cards are the standard entry point for 70B-class models. It is a poor choice if your workload is mainly image generation.',
    },
    {
      question: 'How many tokens per second does an RTX 3090 get on a 14B model?',
      answer:
        'Roughly in the mid-40s per second at Q4_K_M with the model fully resident in VRAM. That is below a current-generation 16GB card on the same model, which matters far less than the models the extra 8GB lets you run at all.',
    },
    {
      question: 'Can two RTX 3090s run a 70B model?',
      answer:
        'Yes. At 4-bit quantisation a 70B model needs roughly 40GB, which fits across two 24GB cards with room for context. Expect throughput in the mid-teens per second — slow compared to a 14B model, but genuinely interactive.',
    },
    {
      question: 'Do I need NVLink to use two RTX 3090s for inference?',
      answer:
        'No. Splitting model layers across cards works over PCIe, and for single-stream inference the interconnect is rarely the bottleneck. NVLink helps some training and fine-tuning workloads more than it helps generation.',
    },
    {
      question: 'How much power does an RTX 3090 use for local LLM inference?',
      answer:
        'Around 350W under sustained load per card. A two-card rig needs a power supply and case airflow provisioned for that continuously, not in gaming-style bursts — inference load is steady in a way gaming load is not.',
    },
    {
      question: 'Should I buy an RTX 3090 or a newer 16GB card?',
      answer:
        'Choose by constraint. If the models you want exceed 16GB, the 3090 is the only one of the two that runs them, so speed comparisons are moot. If your models fit in 16GB and you also generate images, the newer card is the better daily driver.',
    },
    {
      question: 'What should I check when buying a used RTX 3090?',
      answer:
        'Sustained-load memory junction temperature, whether the card was mined on in an open frame, and the return window. Degraded thermal pads are common on hard-used cards and are a maintenance item rather than a dealbreaker.',
    },
    {
      question: 'Does the RTX 3090 support current quantisation formats?',
      answer:
        'It runs the widely-used GGUF formats without issue. Some newer low-precision numeric formats are accelerated only on later architectures, so it misses out on a few efficiency gains while remaining fully functional.',
    },
    {
      question: 'Is the RTX 3090 or 3090 Ti better for local AI?',
      answer:
        'Both carry 24GB, which is the number that matters. The Ti is modestly faster and typically more expensive on the used market; the non-Ti is usually the better value per dollar for inference.',
    },
  ],

  schema: {
    '@type': 'Review',
    rating: { value: 4, best: 5, worst: 1 },
    about: [{ name: 'NVIDIA GeForce RTX 3090', type: 'Product' }],
  },

  related: [
    '/vs/rtx-4080-super-vs-rtx-3090/',
    '/guides/multi-gpu-setup-for-local-ai/',
    '/verdict/is-the-rtx-3090-still-worth-it/',
  ],
};

export default review;
