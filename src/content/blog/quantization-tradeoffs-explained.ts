import type { BlogContent } from '@/types/content';

export const post: BlogContent = {
  slug: 'quantization-tradeoffs-explained',
  status: 'published',
  vertical: 'A',
  datePublished: '2026-08-06',
  category: 'explainer',
  readingTimeMinutes: 8,

  seo: {
    title: 'Quantisation Trade-offs: Which Level to Actually Use',
    description:
      'What quantisation costs you in quality, what it buys in memory and speed, and why Q4_K_M ended up as the default answer for most local setups.',
    keywords: [
      'llm quantization explained',
      'q4_k_m vs q8_0',
      'best quantization for local llm',
      'gguf quantization levels',
      'does quantization reduce quality',
    ],
    canonical: '/blog/quantization-tradeoffs-explained/',
  },

  hero: {
    eyebrow: 'Explainer',
    headline: 'Quantisation Trade-offs, Without the Hand-waving',
    subheadline:
      'Smaller weights, faster generation, worse output. The question is only ever how much worse, and whether you can tell.',
    lastUpdated: '2026-08-06',
  },

  quickAnswer:
    'Quantisation stores model weights at reduced precision, which shrinks the memory footprint and speeds up generation because there is less data to read per token. Q4_K_M is the default recommendation for most local setups: it roughly halves the footprint compared to 8-bit with quality loss that is difficult to notice on everyday tasks. Below 4-bit, degradation becomes visible — models get vaguer, follow instructions less reliably, and make more arithmetic and code errors. Above 4-bit, you pay a proportional memory cost that usually comes out of your context window, which is often a worse trade than the precision is worth. Match the level to your capacity: use the highest precision that still leaves room for the context you actually need.',

  sections: [
    {
      type: 'prose',
      heading: 'What quantisation actually does',
      body: [
        'A model\'s weights are numbers, and those numbers are stored at some precision. Quantisation stores them at lower precision — fewer bits each — so the whole model occupies less memory.',
        'The speed gain follows directly from that. Generating a token requires reading through the weights, and generation is bandwidth-bound, so halving the bytes read per token roughly halves the time spent reading them. Quantisation makes models smaller and faster for the same reason.',
        'The cost is accumulated rounding. Each weight is stored approximately, and across billions of weights those approximations produce output that drifts from what the full-precision model would have produced. Modern schemes limit this well at 4 bits and poorly below.',
      ],
    },
    {
      type: 'table',
      heading: 'The practical levels',
      caption:
        'Footprint figures are approximate and vary by model architecture. Speed is relative to 8-bit on the same hardware.',
      columns: ['Level', 'Relative size', 'Relative speed', 'Quality', 'Use when'],
      rows: [
        [
          { value: 'Q8_0' },
          { value: '~100%', numeric: true, delta: 'worse' },
          { value: 'Baseline', delta: 'worse' },
          { value: 'Effectively lossless', delta: 'better' },
          { value: 'Capacity to spare after context' },
        ],
        [
          { value: 'Q5_K_M' },
          { value: '~65%', numeric: true, delta: 'neutral' },
          { value: 'Faster', delta: 'neutral' },
          { value: 'Very close to Q8', delta: 'better' },
          { value: 'A middle option when Q4 feels tight on quality' },
        ],
        [
          { value: 'Q4_K_M' },
          { value: '~53%', numeric: true, delta: 'better' },
          { value: 'Much faster', delta: 'better' },
          { value: 'Hard to distinguish day to day', delta: 'better' },
          { value: 'The default for most setups' },
        ],
        [
          { value: 'Q3 and below' },
          { value: '~40% or less', numeric: true, delta: 'better' },
          { value: 'Fastest', delta: 'better' },
          { value: 'Noticeably degraded', delta: 'worse' },
          { value: 'Only to fit a model that otherwise will not' },
        ],
      ],
    },
    {
      type: 'prose',
      heading: 'Why Q4_K_M became the default',
      body: [
        'It sits at the point where the curve bends. Going from 8-bit to 4-bit roughly halves memory and substantially increases speed for a quality cost most people cannot identify blind on ordinary tasks. Going from 4-bit to 3-bit saves much less and costs much more.',
        'That asymmetry is why the recommendation is so consistent. It is not that 4-bit is magic — it is that the trade stops being favourable shortly below it.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      heading: 'The trade you are usually making',
      body: 'On a capacity-constrained card, higher precision comes out of your context window rather than out of nothing. A model at Q8 with a 4k window is often less useful than the same model at Q4_K_M with 16k — the more precise model simply sees less of your problem.',
    },
    {
      type: 'prose',
      heading: 'Bigger model or higher precision?',
      body: [
        'Given fixed capacity, you can run a larger model at lower precision or a smaller one at higher precision. The general finding is that the larger model at 4-bit usually wins over the smaller one at 8-bit, because parameter count contributes more capability than the last bits of precision do.',
        'That guidance weakens at the extremes. A very large model at 2-bit is often worse than a mid-size model at 4-bit, because degradation below 3-bit is severe enough to undo the advantage of size.',
      ],
    },
    {
      type: 'list',
      heading: 'Where degradation shows up first',
      style: 'unordered',
      items: [
        'Arithmetic and precise numerical reasoning, which fail earlier than prose quality does',
        'Long-chain instruction following, where the model drifts from earlier constraints',
        'Code generation, particularly around exact syntax and API names',
        'Rare-language and specialised-domain output, which degrades before general English does',
        'Consistency across a long conversation, where the model contradicts itself more often',
      ],
    },
    {
      type: 'prose',
      heading: 'How to decide for your own setup',
      body: [
        'Start with the context length you need, since that is the requirement people most often discover too late. Subtract that from your capacity, and take the highest precision that fits what remains.',
        'Then check the result on your own work rather than on benchmarks. Quantisation effects are task-dependent, and the tasks where you would notice degradation are specific to what you do. If your work is code and arithmetic, test with code and arithmetic.',
      ],
    },
  ],

  faqs: [
    {
      question: 'What is the best quantisation level for local LLMs?',
      answer:
        'Q4_K_M for most setups. It roughly halves the memory footprint compared to 8-bit and increases speed substantially, with quality loss that is difficult to detect on everyday tasks.',
    },
    {
      question: 'Does quantisation reduce the quality of a model?',
      answer:
        'Yes, but the amount depends heavily on the level. At 4-bit the degradation is subtle and task-dependent. Below 3-bit it becomes obvious, showing up first in arithmetic, code and long instruction chains.',
    },
    {
      question: 'What is the difference between Q4_K_M and Q8_0?',
      answer:
        'Q8_0 stores weights at 8-bit precision and is effectively lossless; Q4_K_M uses roughly half the memory and generates considerably faster with a small quality cost. On constrained cards the memory saving usually matters more.',
    },
    {
      question: 'Is a bigger model at low precision better than a smaller one at high precision?',
      answer:
        'Usually yes, down to about 4-bit — parameter count contributes more capability than the final bits of precision. Below 3-bit the relationship reverses, because degradation outweighs the size advantage.',
    },
    {
      question: 'Does quantisation make inference faster?',
      answer:
        'Yes. Generation is memory-bandwidth-bound, so reading fewer bytes per token directly reduces the time each token takes. Roughly halving the footprint gives a substantial throughput gain on the same hardware.',
    },
    {
      question: 'Why does higher precision cost me context length?',
      answer:
        'Because weights and KV cache share the same VRAM. Larger weights leave less room for cache, so on a capacity-constrained card precision is bought directly out of your usable context window.',
    },
    {
      question: 'Which tasks are most affected by aggressive quantisation?',
      answer:
        'Arithmetic and numerical reasoning fail first, followed by code generation and long instruction chains. General prose quality holds up longest, which is why casual testing can miss real degradation.',
    },
    {
      question: 'Should I use Q5_K_M instead of Q4_K_M?',
      answer:
        'If you have capacity left after accounting for your context length, it is a reasonable middle ground. If taking it would force a shorter context window, Q4_K_M with the longer window is usually more useful.',
    },
    {
      question: 'How do I know if quantisation is hurting my results?',
      answer:
        'Test the same prompts at two levels on your own actual work. Effects are task-dependent, so a general benchmark will not tell you whether the degradation matters for what you do.',
    },
  ],

  schema: {
    '@type': 'Article',
  },

  related: [
    '/guides/how-to-run-qwen3-locally/',
    '/benchmarks/qwen3-14b/',
    '/blog/vram-is-still-the-bottleneck/',
  ],
};

export default post;
