import type { GuideContent } from '@/types/content';

export const guide: GuideContent = {
  slug: 'best-gpu-for-local-llm-inference-2026',
  status: 'draft',
  vertical: 'A',
  datePublished: '2026-08-12',
  difficulty: 'beginner',
  timeEstimate: '10 min read',

  seo: {
    title: 'Best GPU for Local LLM Inference in 2026: Buy Capacity First',
    description:
      'A buying guide organised around the constraint that actually decides your experience — VRAM capacity — with a tier-by-tier breakdown of what each budget genuinely runs.',
    keywords: [
      'best gpu for local llm inference 2026',
      'best gpu for local ai 2026',
      'cheapest gpu for local llm',
      'how much vram for llm',
      'gpu buying guide local ai',
    ],
    canonical: '/guides/best-gpu-for-local-llm-inference-2026/',
  },

  hero: {
    eyebrow: 'Buying guide',
    headline: 'The Best GPU for Local LLM Inference in 2026',
    subheadline:
      'Pick the tier that holds the models you want. Everything else — bandwidth, architecture, power — is a second-order decision.',
    lastUpdated: '2026-08-12',
  },

  quickAnswer:
    'For most people building a local inference rig in 2026, a used 24GB card is the best buy: it runs 27B-class models at full speed with real context length and pairs into a 48GB configuration for 70B models. If your budget is tighter, a 16GB card handles everything up to about 14B parameters comfortably and is the sensible floor for serious use. Below 12GB you are limited to 7B-class models and will feel it quickly. Choose capacity first, because capacity determines which models run at full speed at all; choose bandwidth second, because it determines how fast that full speed is. Buying a fast card that cannot hold your model is the most common and most expensive mistake in this category.',

  requirements: [
    'A rough idea of the largest model you want to run — parameter count matters more than brand',
    'A target context length: 4k, 16k and 64k have very different memory costs',
    'PSU headroom for the card you are considering, plus a second one if you may expand',
    'Case clearance — many capable cards are three slots and physically large',
  ],

  comparisonTable: {
    columns: ['Tier', 'VRAM', 'Runs comfortably', 'Typical cost', 'Verdict'],
    rows: [
      [
        { value: 'Entry' },
        { value: '8–12 GB', numeric: true },
        { value: '7B–8B at 4-bit, short context', delta: 'worse' },
        { value: '$250–400', numeric: true, delta: 'better' },
        { value: 'Workable for chat, frustrating for anything else', delta: 'worse' },
      ],
      [
        { value: 'Mainstream' },
        { value: '16 GB', numeric: true },
        { value: '14B at 4-bit with useful context', delta: 'neutral' },
        { value: '$700–900', numeric: true, delta: 'neutral' },
        { value: 'The sensible floor for serious local use', delta: 'neutral' },
      ],
      [
        { value: 'Value pick' },
        { value: '24 GB (used)', numeric: true },
        { value: '27B at 4-bit, 16k context', delta: 'better' },
        { value: '$600–750', numeric: true, delta: 'better' },
        { value: 'Best capacity per dollar; the default recommendation', delta: 'better' },
      ],
      [
        { value: 'Dual card' },
        { value: '48 GB (2×24)', numeric: true },
        { value: '70B at 4-bit, usable context', delta: 'better' },
        { value: '$1,300–1,500', numeric: true, delta: 'worse' },
        { value: 'The realistic entry point for 70B-class models', delta: 'better' },
      ],
    ],
  },

  sections: [
    {
      type: 'callout',
      tone: 'win',
      heading: 'The one-sentence version',
      body: 'Work out the largest model you genuinely want to run, add roughly 30% for context and overhead, and buy the cheapest card that holds that number — then worry about speed.',
    },
    {
      type: 'prose',
      heading: 'Why capacity comes first',
      body: [
        'Local inference has a cliff, not a slope. A model whose weights and KV cache fit in VRAM runs at the card\'s full speed. A model that does not fit has the remainder read from system RAM, which is roughly an order of magnitude slower, and throughput collapses accordingly.',
        'This makes GPU selection a threshold problem. A card that is 40% faster is worth having; a card that holds your model when the alternative does not is worth several times that, because the alternative is not slower output but output too slow to use.',
      ],
    },
    {
      type: 'prose',
      heading: 'Estimating what a model needs',
      body: [
        'A reasonable rule of thumb at 4-bit quantisation is roughly 0.6GB of weights per billion parameters — so about 4.5GB for an 8B model, 9GB for 14B, and 17GB for 27B. Those are weights alone.',
        'Context is the part people forget. KV cache grows with context length and model size, and at long context it can rival the weights themselves. A configuration that loads happily at 4k can fail at 32k, usually partway through a long document rather than at load time.',
        'Add roughly 30% headroom over the weight estimate for a comfortable working setup. Buying exactly enough capacity means running at the edge, where small changes in context or runtime version push you over.',
      ],
    },
    {
      type: 'steps',
      heading: 'How to choose in four steps',
      steps: [
        {
          title: 'Name the largest model you actually want',
          body: 'Not the largest that exists — the largest you have a concrete reason to run. This single number determines your tier and most of your budget.',
        },
        {
          title: 'Add your real context length',
          body: 'If you work with long documents or codebases, plan for 16k or more and budget capacity accordingly. If you mostly chat, 4k–8k is enough and the requirement is much smaller.',
        },
        {
          title: 'Find the cheapest card that clears the total',
          body: 'This is usually a used 24GB card. Compare on capacity per dollar first; only compare throughput between cards that both clear the requirement.',
        },
        {
          title: 'Check the boring constraints',
          body: 'Power supply headroom, case clearance and airflow. Sustained inference load is steady rather than bursty, which stresses cooling differently from gaming.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'Do not buy for a model you might run someday',
      body: 'Capacity you never use costs real money in purchase price, power and heat. If 14B models cover your work today, a 16GB card is not a compromise — and by the time your needs change, the market will have moved.',
    },
    {
      type: 'prose',
      heading: 'What about unified-memory systems?',
      body: [
        'Machines with large pools of memory shared between CPU and GPU are an increasingly common alternative, and they solve capacity elegantly — a large unified pool can hold models no consumer discrete card can.',
        'The trade-off is bandwidth. Unified memory is typically slower than dedicated GPU memory, so these systems run very large models at modest speed rather than mid-size models quickly. If your priority is running something big at all, that is a good trade. If you want fast interactive output from a mid-size model, a discrete card generally still wins.',
      ],
    },
    {
      type: 'list',
      heading: 'Common buying mistakes',
      style: 'unordered',
      items: [
        'Choosing on benchmark throughput between cards where only one can hold the model',
        'Forgetting KV cache, then discovering the limit halfway through a long document',
        'Buying two mismatched cards, which is slower and less predictable than a matched pair',
        'Under-provisioning the power supply for a second card you already intend to add',
        'Assuming more system RAM fixes a VRAM shortfall — it enables loading, not speed',
      ],
    },
  ],

  faqs: [
    {
      question: 'What is the best GPU for local LLM inference in 2026?',
      answer:
        'For most buyers, a used 24GB card. It runs 27B-class models at full speed with 16k context and pairs into a 48GB setup for 70B models, at a lower price than most current-generation 16GB cards.',
    },
    {
      question: 'How much VRAM do I need to run a local LLM?',
      answer:
        'At 4-bit quantisation, roughly 0.6GB per billion parameters for weights, plus headroom for KV cache. An 8B model needs about 6GB in practice, a 14B model about 12GB, and a 27B model about 20GB with usable context.',
    },
    {
      question: 'Is 16GB of VRAM enough for local AI?',
      answer:
        'It is enough for models up to about 14B parameters with a useful context window, which covers most chat, coding and summarisation work. It is tight for 27B models and insufficient for 70B without offloading.',
    },
    {
      question: 'What is the cheapest GPU that can run a decent local LLM?',
      answer:
        'A 12GB card in the $250–400 range runs 7B and 8B models at 4-bit acceptably. Below that, capacity forces either very small models or aggressive quantisation that noticeably degrades output quality.',
    },
    {
      question: 'Do I need two GPUs to run a 70B model locally?',
      answer:
        'Practically, yes. A 70B model at 4-bit needs roughly 40GB, so two 24GB cards splitting the layers is the standard approach. Single-card configurations require offloading to system RAM and produce only a few tokens per second.',
    },
    {
      question: 'Does GPU memory bandwidth matter more than capacity?',
      answer:
        'Only once capacity is sufficient. Bandwidth sets how fast a model that fits will run; capacity sets whether it fits at all. Buying bandwidth over capacity is the more common and more costly error.',
    },
    {
      question: 'Should I buy a new mid-range card or a used high-end one?',
      answer:
        'Used high-end cards typically offer better capacity per dollar, which is what matters for local inference. New mid-range cards offer better efficiency, a warranty and stronger image-generation performance.',
    },
    {
      question: 'Will more system RAM make my local LLM faster?',
      answer:
        'No. System RAM lets a larger model load by offloading layers, but generation speed is then governed by much slower system memory bandwidth. It converts a hard failure into a slow success.',
    },
    {
      question: 'Are unified-memory machines a good alternative to a GPU?',
      answer:
        'They are excellent at holding very large models, since the memory pool is large and shared. They are generally slower per token than dedicated GPU memory, so they favour running big models at moderate speed over running mid-size models quickly.',
    },
    {
      question: 'How much does context length affect VRAM requirements?',
      answer:
        'Substantially. KV cache scales with both context length and model size, and at long context it can approach the size of the weights. Always size your card for the context you actually work at, not the model alone.',
    },
  ],

  schema: {
    '@type': 'Article',
    itemList: [
      {
        name: 'Used 24GB card — best overall for local LLM inference',
        description: '27B-class models at full speed, and a two-card path to 70B.',
        url: '/reviews/rtx-4070-ti-super-local-ai/',
      },
      {
        name: '16GB current-generation card — best for speed within the envelope',
        description: 'Fastest option for 14B-class models, with a warranty and lower power draw.',
        url: '/reviews/rtx-4080-super-local-llm/',
      },
      {
        name: 'Dual 24GB configuration — entry point for 70B models',
        description: '48GB pooled capacity at 4-bit quantisation with usable context.',
        url: '/guides/multi-gpu-setup-for-local-ai/',
      },
    ],
  },

  related: [
    '/vs/rtx-4080-super-vs-rtx-4070-ti-super/',
    '/guides/multi-gpu-setup-for-local-ai/',
    '/blog/vram-is-still-the-bottleneck/',
  ],
};

export default guide;
