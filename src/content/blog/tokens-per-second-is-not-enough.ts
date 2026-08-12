import type { BlogContent } from '@/types/content';

export const post: BlogContent = {
  slug: 'tokens-per-second-is-not-enough',
  status: 'published',
  datePublished: '2026-08-09',
  category: 'opinion',
  readingTimeMinutes: 6,

  seo: {
    title: 'Tokens per Second Is a Bad Benchmark on Its Own',
    description:
      'A single throughput number hides quantisation, context length, prompt processing and whether the model even fit. Here is what a benchmark has to state to mean anything.',
    keywords: [
      'tokens per second benchmark meaning',
      'how to benchmark local llm',
      'llm benchmark methodology',
      'prompt processing vs generation speed',
      'local llm performance metrics',
    ],
    canonical: '/blog/tokens-per-second-is-not-enough/',
  },

  hero: {
    eyebrow: 'Opinion',
    headline: 'Tokens per Second Is a Bad Benchmark on Its Own',
    subheadline:
      'It is the right metric with the wrong amount of context attached — which is to say, usually none.',
    lastUpdated: '2026-08-09',
  },

  quickAnswer:
    'A tokens-per-second figure is meaningless without four accompanying facts: the quantisation, the context length, whether the model was fully resident in VRAM, and whether the number describes generation or prompt processing. The same model on the same card can differ by more than tenfold across those variables, which is why comparing bare numbers between sources produces contradictions that look like measurement error but are actually category error. A benchmark that states its conditions is a measurement; one that does not is an anecdote with a decimal point. This site publishes the conditions in the same row as the number for exactly that reason.',

  sections: [
    {
      type: 'prose',
      heading: 'Four variables that move the number more than the GPU does',
      body: [
        'Quantisation is the first. The same model at 4-bit and 8-bit differs roughly twofold in both memory footprint and throughput. Two people benchmarking "the 14B model" at different quantisations are not benchmarking the same thing.',
        'Context length is the second, and it moves the number in two ways: a longer window means more cache to read per step, and it raises peak memory in a way that can push you over the capacity threshold entirely.',
        'Residency is the third and the largest. If any layers sit in system RAM, the figure describes system memory bandwidth rather than the GPU, and can be an order of magnitude lower for reasons that have nothing to do with the card.',
        'Finally, generation and prompt processing are different measurements with different bottlenecks. Generation is bandwidth-bound; prompt processing is compute-bound and typically an order of magnitude faster. Quoting one as "the" speed obscures which one you care about.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'Why forum numbers contradict each other',
      body: 'Two people reporting wildly different figures for the same card and model are usually both right. One ran 4-bit at 4k fully resident; the other ran 8-bit at 32k with a partial offload. Without those conditions the reports cannot be reconciled, which is how the same card acquires a reputation for being both fast and slow.',
    },
    {
      type: 'prose',
      heading: 'What tokens per second still does not tell you',
      body: [
        'Even fully specified, throughput does not measure time to a useful answer. A model that emits extended reasoning before its conclusion may generate three times as many tokens to answer the same question, so identical throughput produces very different waiting.',
        'It also says nothing about quality. A heavily quantised model that generates quickly and answers poorly is worse than a slower one that gets it right, and no throughput figure will tell you which you have.',
      ],
    },
    {
      type: 'list',
      heading: 'What a benchmark row should state',
      style: 'unordered',
      items: [
        'Quantisation format, not just bit depth — variants within a bit depth differ',
        'Context length used for the measurement, and whether it was full',
        'Peak VRAM during generation, which reveals whether it actually fit',
        'Runtime and build version, since inference engines change throughput materially between releases',
        'Generation and prompt-processing figures separately',
        'Batch size, since anything above one is a different workload entirely',
      ],
    },
    {
      type: 'prose',
      heading: 'The honest version of the metric',
      body: [
        'None of this means tokens per second is the wrong thing to measure. It is the right thing — it corresponds directly to the experience of waiting for output, which is what people actually care about.',
        'The problem is publishing it stripped of the conditions that produced it. A number with its conditions attached is reproducible and comparable. The same number alone is a rumour that happens to be numeric, and it travels further than it should precisely because it looks like data.',
      ],
    },
  ],

  faqs: [
    {
      question: 'What does tokens per second actually measure?',
      answer:
        'How many tokens a model generates each second during output, usually single-stream at batch size 1. It corresponds directly to how fast text appears, which is why it is the headline metric despite its limitations.',
    },
    {
      question: 'Why do benchmark numbers for the same GPU vary so much?',
      answer:
        'Because quantisation, context length, VRAM residency and runtime version each move the figure substantially. Two reports differing by tenfold are usually both accurate measurements of different configurations.',
    },
    {
      question: 'What is the difference between prompt processing and generation speed?',
      answer:
        'Prompt processing is compute-bound and parallel, so it is typically an order of magnitude faster. Generation is memory-bandwidth-bound and sequential. They scale with different hardware characteristics and should be reported separately.',
    },
    {
      question: 'Does a higher tokens per second always mean a better setup?',
      answer:
        'No. A heavily quantised model generates faster and answers worse, and a model with a short context window may be fast while unable to see your input. Throughput is one axis of several.',
    },
    {
      question: 'How should I benchmark my own local setup?',
      answer:
        'Fix the prompt length, run each configuration three times from a cold load and take the median, and record quantisation, context length, peak VRAM and runtime version alongside the result.',
    },
    {
      question: 'Why does batch size matter in benchmarks?',
      answer:
        'Batched inference amortises weight reads across multiple sequences, so aggregate throughput rises sharply. A batched figure is not comparable to a single-stream one, and mixing them makes hardware look faster than it will feel.',
    },
    {
      question: 'Is time to first token a better metric?',
      answer:
        'It is a useful complement, since it reflects prompt-processing speed and dominates the perceived responsiveness of short interactions. Generation throughput matters more for long outputs. Neither replaces the other.',
    },
    {
      question: 'How do reasoning models affect throughput comparisons?',
      answer:
        'They generate many more tokens before reaching an answer, so time-to-answer can be several times longer at identical tokens per second. Comparing a reasoning model to a direct-answer model on throughput alone is misleading.',
    },
  ],

  schema: {
    '@type': 'Article',
  },

  related: [
    '/benchmarks/qwen3-14b/',
    '/blog/vram-is-still-the-bottleneck/',
    '/about/',
  ],
};

export default post;
