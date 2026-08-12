import type { VsContent } from '@/types/content';

export const comparison: VsContent = {
  slug: 'rtx-5070-ti-vs-rtx-3090',
  status: 'draft',
  datePublished: '2026-08-09',
  contenders: ['RTX 5070 Ti', 'RTX 3090'],

  seo: {
    title: 'RTX 5070 Ti vs RTX 3090 for Local LLMs: New Silicon vs More VRAM',
    description:
      'A current-generation 16GB card against a two-generation-old 24GB one. Which wins for local inference depends entirely on whether your model fits.',
    keywords: [
      'rtx 5070 ti vs rtx 3090',
      '5070 ti vs 3090 local llm',
      'blackwell vs ampere ai',
      'new 16gb vs used 24gb gpu',
      'rtx 5070 ti vs 3090 tokens per second',
    ],
    canonical: '/vs/rtx-5070-ti-vs-rtx-3090/',
  },

  hero: {
    eyebrow: 'Head to head',
    headline: 'RTX 5070 Ti vs RTX 3090 for Local LLMs',
    subheadline:
      'The newer card wins every benchmark they can both complete. The older one completes benchmarks the newer one cannot start.',
    lastUpdated: '2026-08-09',
  },

  quickAnswer:
    'The RTX 5070 Ti is the faster card and the better daily driver: GDDR7 bandwidth pushes 14B-class models to around 60 tokens per second, it draws less power, and it comes with a warranty. The used RTX 3090 wins on the axis that more often decides the purchase — 24GB versus 16GB. That gap is the difference between running a 27B model at 16k context and squeezing it into 4k, and between a realistic two-card path to 70B and no path at all. Buy the 5070 Ti for speed, efficiency and image generation within 16GB. Buy the 3090 if the models you actually want to run do not fit in 16GB.',

  comparisonTable: {
    columns: ['Spec', 'RTX 5070 Ti', 'RTX 3090'],
    rows: [
      [
        { value: 'VRAM' },
        { value: '16 GB GDDR7', delta: 'worse', numeric: true },
        { value: '24 GB GDDR6X', delta: 'better', numeric: true },
      ],
      [
        { value: 'Memory bandwidth' },
        { value: '896 GB/s', delta: 'worse', numeric: true },
        { value: '936 GB/s', delta: 'better', numeric: true },
      ],
      [
        { value: 'Qwen3 14B (Q4_K_M)' },
        { value: '61 tok/s', delta: 'better', numeric: true },
        { value: '44 tok/s', delta: 'worse', numeric: true },
      ],
      [
        { value: 'Gemma 3 27B (Q4_K_M)' },
        { value: '25 tok/s, 4k ctx', delta: 'worse', numeric: true },
        { value: '26 tok/s, 16k ctx', delta: 'better', numeric: true },
      ],
      [
        { value: 'Path to 70B' },
        { value: 'None without a second card', delta: 'worse' },
        { value: 'Add a second 3090', delta: 'better' },
      ],
      [
        { value: 'TDP' },
        { value: '300 W', delta: 'better', numeric: true },
        { value: '350 W', delta: 'worse', numeric: true },
      ],
      [
        { value: 'Typical price (Aug 2026)' },
        { value: '~$749 new', delta: 'worse', numeric: true },
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
    name: 'Split decision — RTX 5070 Ti for throughput, RTX 3090 for capacity',
    reason:
      'There is no honest single winner here. The 5070 Ti is roughly 40% faster on a 14B model and much easier to live with. The 3090 runs a class of model the 5070 Ti cannot hold, and offers a second-card upgrade path that ends at 70B. Decide which of those two sentences describes your problem.',
  },

  pickIf: [
    {
      contender: 'RTX 5070 Ti',
      scenario:
        'Your models are 14B and under, and you want the fastest interactive experience available in that range.',
    },
    {
      contender: 'RTX 5070 Ti',
      scenario:
        'You want current-generation efficiency, a warranty and no used-market condition risk.',
    },
    {
      contender: 'RTX 3090',
      scenario:
        'You work with long documents and need 16k+ context on a 27B-class model without offloading.',
    },
    {
      contender: 'RTX 3090',
      scenario:
        'You intend to reach 70B-class models eventually and want an upgrade path rather than a replacement.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'The 40% that matters and the 40% that does not',
      body: [
        'On a 14B model, the 5070 Ti generates tokens roughly 40% faster. That is a real difference you will feel in interactive use, and it is the strongest argument for buying current-generation silicon.',
        'On a 27B model the two cards produce nearly the same throughput — but the 5070 Ti gets there at 4k context while the 3090 does it at 16k. The numbers look level because the comparison has quietly stopped being like-for-like: one card is running a configuration the other cannot load.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      heading: 'Read benchmark tables for the conditions, not just the number',
      body: 'Any tokens/sec figure without quantisation, context length and VRAM footprint attached is close to meaningless in comparisons like this one. The same model on the same runtime can differ by a factor of ten depending on whether it fully fits in VRAM.',
    },
    {
      type: 'prose',
      heading: 'The upgrade path argument',
      body: [
        'A second 3090 is a well-trodden route: two cards, 48GB pooled, 70B-class models at 4-bit with usable context. The parts are cheap, the software support is mature, and the failure modes are documented.',
        'The equivalent path for a 16GB card is weaker. Two 16GB cards give you 32GB, which is enough for 70B only at aggressive quantisation with little context headroom. You spend nearly the same money to arrive somewhere noticeably worse.',
      ],
    },
    {
      type: 'prose',
      heading: 'Total cost, honestly',
      body: [
        'The 3090 is cheaper to buy and more expensive to run: roughly 50W more under sustained inference load, more heat to move, and thermal-pad maintenance on hard-used cards. Over a couple of years of heavy use the running-cost gap is real, though it rarely closes the purchase-price gap.',
        'The less quantifiable cost is time. Used hardware occasionally needs attention that new hardware does not, and whether that is an interesting afternoon or an intolerable interruption is a personal question rather than a technical one.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is the RTX 5070 Ti better than the RTX 3090 for local LLMs?',
      answer:
        'It is faster on models that fit in 16GB — roughly 40% quicker on a 14B model — but it holds less. The RTX 3090 runs 27B-class models at long context and pairs into a 48GB configuration for 70B, which the 5070 Ti cannot match.',
    },
    {
      question: 'Should I buy a new 16GB card or a used 24GB card in 2026?',
      answer:
        'Decide by constraint. If your models fit in 16GB, the newer card is faster, cooler and warrantied. If your models exceed 16GB, capacity is the only thing that matters and the used 24GB card is the one that runs them.',
    },
    {
      question: 'How many tokens per second does the RTX 5070 Ti get?',
      answer:
        'Around 60 per second on a 14B model at Q4_K_M with the model fully in VRAM, and about 25 on a 27B model at short context. Exact figures depend on runtime build, quantisation and context length.',
    },
    {
      question: 'Why does the RTX 3090 have higher memory bandwidth than a newer card?',
      answer:
        'A wider 384-bit bus. The 5070 Ti uses faster GDDR7 on a narrower 256-bit bus, which lands at similar raw bandwidth while its newer architecture and larger caches convert that bandwidth into higher real throughput.',
    },
    {
      question: 'Can I mix an RTX 5070 Ti and an RTX 3090 in one machine?',
      answer:
        'Technically yes for layer-split inference, but it is awkward: the pair is limited by the slower card in many configurations, and driver and runtime handling of mixed architectures is less well tested. Matched pairs are the safer build.',
    },
    {
      question: 'Which card is better for ComfyUI and image generation?',
      answer:
        'The RTX 5070 Ti. Diffusion workloads are compute-bound and fit comfortably within 16GB, so the newer architecture wins without capacity entering the picture.',
    },
    {
      question: 'Is two 16GB cards as good as two 24GB cards?',
      answer:
        'No. 32GB pooled runs 70B models only at aggressive quantisation with minimal context, while 48GB runs them at 4-bit with room to work. The costs are similar; the outcomes are not.',
    },
    {
      question: 'Does the RTX 5070 Ti support newer quantisation formats?',
      answer:
        'The hardware supports newer low-precision formats, but runtime adoption lags by months. Verify your specific runtime build targets this generation before counting on those efficiency gains.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [
      { name: 'NVIDIA GeForce RTX 5070 Ti', type: 'Product' },
      { name: 'NVIDIA GeForce RTX 3090', type: 'Product' },
    ],
    itemList: [
      {
        name: 'RTX 5070 Ti — fastest 16GB option',
        description: 'Best throughput and efficiency for models up to 14B parameters.',
        url: '/reviews/rtx-5070-ti-local-ai/',
      },
      {
        name: 'RTX 3090 (used) — most capacity per dollar',
        description: '24GB for long-context 27B work and a two-card path to 70B.',
        url: '/reviews/rtx-3090-used-local-llm/',
      },
    ],
  },

  related: [
    '/reviews/rtx-5070-ti-local-ai/',
    '/reviews/rtx-3090-used-local-llm/',
    '/guides/multi-gpu-setup-for-local-ai/',
  ],
};

export default comparison;
