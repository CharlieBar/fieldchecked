import type { BlogContent } from '@/types/content';

export const post: BlogContent = {
  slug: 'vram-is-still-the-bottleneck',
  status: 'published',
  datePublished: '2026-08-12',
  category: 'explainer',
  readingTimeMinutes: 7,

  seo: {
    title: 'VRAM Is Still the Bottleneck, and Faster Cards Do Not Fix It',
    description:
      'Why capacity rather than compute decides what you can run locally, why each new GPU generation feels like a sidestep, and how to think about the trade properly.',
    keywords: [
      'vram bottleneck local llm',
      'why gpus need more vram ai',
      'gpu capacity vs bandwidth inference',
      'local llm hardware limits',
      'how much vram for local ai',
    ],
    canonical: '/blog/vram-is-still-the-bottleneck/',
  },

  hero: {
    eyebrow: 'Explainer',
    headline: 'VRAM Is Still the Bottleneck',
    subheadline:
      'Every generation gets faster at the models you can already run, and no better at the ones you cannot.',
    lastUpdated: '2026-08-12',
  },

  quickAnswer:
    'Local inference performance has a cliff rather than a slope: a model whose weights and KV cache fit in VRAM runs at the GPU\'s full speed, and one that does not fit has the remainder read from system RAM at roughly a tenth of the bandwidth. That makes capacity a threshold you either clear or you do not, which is why a 40% faster card with the same VRAM feels like a sidestep to local AI users. Compute and bandwidth improvements are real, but they apply only inside the envelope capacity defines. Until consumer VRAM capacity increases, the practical ceiling on what you can run locally stays where it is, no matter how fast the silicon gets.',

  sections: [
    {
      type: 'prose',
      heading: 'The cliff, precisely',
      body: [
        'Generating one token requires reading through the model\'s weights. On a GPU with the model resident, that read happens at hundreds of gigabytes per second. When part of the model lives in system RAM, that part is read across a much narrower path, and every token waits for it.',
        'The consequence is that partial offload is not a partial penalty. Moving a third of the layers to system RAM does not cost a third of your throughput — it costs most of it, because the slow path dominates the total. This is why the same model can produce fifty tokens per second on one machine and two on another with a nominally similar GPU.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      heading: 'The number that decides your experience',
      body: 'At 4-bit quantisation, budget roughly 0.6GB per billion parameters for weights, then add headroom for KV cache — which grows with context length and can rival the weights at long context. Whether that total clears your VRAM is the single most important fact about your setup.',
    },
    {
      type: 'prose',
      heading: 'Why generational gains feel hollow',
      body: [
        'A new card with more bandwidth genuinely produces more tokens per second on models that already fit. That is a real improvement and it is measurable. It is also, for many people, the wrong improvement — because what stops them is not that a 14B model runs at fifty rather than sixty tokens per second, but that a 70B model does not run at all.',
        'When capacity holds flat across generations, the set of things you can do stays the same while the speed at which you do them improves. For gaming that is exactly the right trade. For local inference it is a sidestep dressed as a step forward.',
      ],
    },
    {
      type: 'prose',
      heading: 'The context multiplier nobody budgets for',
      body: [
        'Model size is the number people plan around, and KV cache is the one that catches them out. Cache grows with context length and model size, and at long context it can approach the footprint of the weights themselves.',
        'This produces a distinctive failure: a model that loads cleanly and works for short prompts, then runs out of memory partway through a long document. The setup was never wrong at load time — it just had no room for the work you actually wanted to do.',
      ],
    },
    {
      type: 'list',
      heading: 'What follows from this in practice',
      style: 'unordered',
      items: [
        'Buy the cheapest card that clears your capacity requirement before comparing any throughput figures',
        'Size for your real context length, not the model weights alone',
        'Treat any tokens/sec number without quantisation and context attached as unusable for comparison',
        'Prefer two matched cards over one fast one when the models you want exceed a single card',
        'Remember that more system RAM converts a hard failure into a slow success, not a fast one',
      ],
    },
    {
      type: 'prose',
      heading: 'The one thing that would change this',
      body: [
        'The alternative that actually addresses the constraint is large unified memory — a big pool shared between CPU and GPU that holds models no discrete consumer card can. Those systems trade bandwidth for capacity, running very large models at moderate speed instead of mid-size models quickly.',
        'Whether that trade is good depends entirely on which problem you have. If you have been offloading to system RAM and getting two tokens per second, moderate speed on a model that fits is an enormous upgrade. If your models already fit on your card, it is a downgrade.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Why does VRAM matter more than GPU speed for local LLMs?',
      answer:
        'Because capacity determines whether a model runs at full speed at all. If the model fits, throughput is governed by bandwidth; if it does not, part of it is read from system RAM roughly ten times more slowly, and speed collapses regardless of the GPU.',
    },
    {
      question: 'How much VRAM do I need for a local LLM?',
      answer:
        'Roughly 0.6GB per billion parameters at 4-bit quantisation, plus headroom for KV cache. An 8B model needs about 6GB in practice, a 14B model about 12GB, and a 27B model about 20GB with a usable context window.',
    },
    {
      question: 'Does adding system RAM help local LLM performance?',
      answer:
        'It lets larger models load, but it does not make them fast. Once any layers live in system RAM, generation speed is governed by system memory bandwidth, which is an order of magnitude below GPU memory bandwidth.',
    },
    {
      question: 'Why do new GPU generations not add more VRAM?',
      answer:
        'Consumer capacity is set by market segmentation and memory cost rather than technical limits. Whatever the reason, the practical effect for local AI is that each generation improves speed within the same capacity envelope.',
    },
    {
      question: 'What is KV cache and why does it use so much memory?',
      answer:
        'It stores intermediate attention state for tokens already processed, so the model does not recompute them. It grows with context length and model size, and at long context it can approach the size of the weights themselves.',
    },
    {
      question: 'Is partial GPU offload ever worth using?',
      answer:
        'Occasionally, for batch work where you can wait. For interactive use it rarely is — the throughput penalty is severe enough that a smaller model running fully on the GPU is almost always the better experience.',
    },
    {
      question: 'Does quantisation solve the VRAM problem?',
      answer:
        'It reduces the requirement substantially, and 4-bit is the standard practical choice. Below that, output quality degrades noticeably, so quantisation buys you roughly one model size class rather than unlimited headroom.',
    },
    {
      question: 'Will unified memory replace discrete GPUs for local AI?',
      answer:
        'Not universally. Unified memory wins decisively on capacity and loses on bandwidth, so it favours running very large models at moderate speed. Discrete GPUs remain faster for models that fit in their memory.',
    },
  ],

  schema: {
    '@type': 'Article',
  },

  related: [
    '/guides/best-gpu-for-local-llm-inference-2026/',
    '/benchmarks/llama-3-3-70b/',
    '/blog/quantization-tradeoffs-explained/',
  ],
};

export default post;
