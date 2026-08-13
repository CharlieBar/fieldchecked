import type { GuideContent } from '@/types/content';

export const guide: GuideContent = {
  slug: 'how-to-run-qwen3-locally',
  status: 'published',
  vertical: 'A',
  datePublished: '2026-08-05',
  difficulty: 'beginner',
  timeEstimate: '30–45 minutes',

  seo: {
    title: 'How to Run Qwen3 Locally: Pick the Right Size and Quantisation',
    description:
      'A practical setup guide for running Qwen3 on your own hardware — choosing a model size that fits your VRAM, picking a quantisation, and fixing the failures that come up first.',
    keywords: [
      'how to run qwen3 locally',
      'qwen3 local setup',
      'qwen3 14b vram',
      'qwen3 quantization guide',
      'run qwen3 ollama',
    ],
    canonical: '/guides/how-to-run-qwen3-locally/',
  },

  hero: {
    eyebrow: 'Setup guide',
    headline: 'Running Qwen3 on Your Own Hardware',
    subheadline:
      'Most of the work is choosing correctly before you download anything. The install is the easy part.',
    lastUpdated: '2026-08-05',
  },

  quickAnswer:
    'To run Qwen3 locally, pick the parameter size that fits your VRAM at 4-bit quantisation — roughly 0.6GB per billion parameters plus headroom for context — then pull it with Ollama or LM Studio and set context length explicitly rather than accepting the default. On a 16GB card the 14B model is the sweet spot, leaving room for a useful context window. On 24GB you can run larger variants or the same model with much longer context. On 8–12GB, use an 8B-class variant. The most common failure is choosing a model that loads but leaves no capacity for KV cache, which surfaces as an out-of-memory error partway through a long prompt rather than at startup.',

  requirements: [
    'A GPU with at least 8GB of VRAM — 16GB to run the 14B variant comfortably',
    'Ollama or LM Studio installed',
    'Disk space for the model, typically several gigabytes per variant',
    'A rough idea of the context length you need before you download anything',
  ],

  comparisonTable: {
    columns: ['Your VRAM', 'Recommended size', 'Quantisation', 'Realistic context'],
    rows: [
      [
        { value: '8–12 GB', numeric: true },
        { value: '8B class', delta: 'neutral' },
        { value: 'Q4_K_M', delta: 'neutral' },
        { value: '8k', numeric: true, delta: 'neutral' },
      ],
      [
        { value: '16 GB', numeric: true },
        { value: '14B', delta: 'better' },
        { value: 'Q4_K_M', delta: 'better' },
        { value: '8k–16k', numeric: true, delta: 'better' },
      ],
      [
        { value: '24 GB', numeric: true },
        { value: '14B or larger', delta: 'better' },
        { value: 'Q5_K_M or Q8_0', delta: 'better' },
        { value: '32k+', numeric: true, delta: 'better' },
      ],
    ],
  },

  sections: [
    {
      type: 'steps',
      heading: 'Setup',
      steps: [
        {
          title: 'Work out your capacity budget',
          body: 'Take your VRAM, subtract roughly 1GB for display and overhead, and treat the rest as your budget for weights plus KV cache. Plan for context to consume a meaningful share of it, not a rounding error.',
        },
        {
          title: 'Choose the parameter size',
          body: 'At 4-bit, estimate around 0.6GB per billion parameters. A 14B model needs roughly 9GB of weights, which fits a 16GB card with real room for context. Choosing a larger model that barely fits is the most common mistake here.',
        },
        {
          title: 'Choose the quantisation',
          body: 'Q4_K_M is the standard default and the best balance for constrained cards. If you have capacity to spare, Q5_K_M or Q8_0 preserve more quality at a proportional cost in memory and a modest cost in speed.',
        },
        {
          title: 'Pull the model',
          body: 'With Ollama, pull by name and quantisation tag. With LM Studio, search for the variant and check the fit indicator against your hardware before downloading.',
        },
        {
          title: 'Set context length explicitly',
          body: 'Defaults are often far below what the model supports. Raise it to the length you actually work at, and re-check VRAM usage after doing so — this is the step where a working setup turns into a failing one.',
        },
        {
          title: 'Verify full GPU offload',
          body: 'Confirm every layer is on the GPU. A partially offloaded model still produces output, but at a fraction of the speed, and it is easy to mistake that for the model simply being slow.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'The failure that catches everyone',
      body: 'A model that loads successfully is not a model that will finish a long prompt. KV cache grows as context fills, so an out-of-memory error typically arrives mid-generation on a long document rather than at load time. If that happens, reduce context length or step down a quantisation level.',
    },
    {
      type: 'prose',
      heading: 'Choosing between model sizes',
      body: [
        'The instinct is to run the largest model that fits. A better rule is to run the largest model that fits with room to spare, because the leftover capacity buys you context length, and context is often worth more than parameters for practical work.',
        'A 14B model with a 16k window will usually be more useful than a 27B model squeezed into 4k, especially for anything involving documents, codebases or long conversations. The larger model is more capable per token and gets to see much less of your problem.',
      ],
    },
    {
      type: 'prose',
      heading: 'What to check if output quality seems poor',
      body: [
        'Before concluding the model is weak, check the quantisation. Very aggressive quantisation levels degrade output noticeably, and the difference between a 4-bit and an 8-bit variant of the same model is easy to mistake for a difference between models.',
        'Then check the sampling parameters. Defaults vary between tools, and a temperature or repetition setting inherited from a different model can make a capable one look erratic.',
        'Finally check that the prompt template matches what the model expects. A mismatched template produces output that is subtly wrong in a way that reads as the model being poor at instruction following.',
      ],
    },
    {
      type: 'list',
      heading: 'Quick troubleshooting',
      style: 'unordered',
      items: [
        'Very slow generation — check for partial CPU offload before anything else',
        'Out of memory mid-prompt — reduce context length or step down a quantisation level',
        'Output degrades on long conversations — you are hitting the context limit and losing earlier turns',
        'Model loads but responses are erratic — check the prompt template and sampling defaults',
        'Speed dropped after a runtime update — re-check the offload split, defaults sometimes change',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much VRAM do I need to run Qwen3 14B?',
      answer:
        'About 9GB for the weights at 4-bit quantisation, plus headroom for KV cache. A 16GB card runs it comfortably with a useful context window; 12GB is workable only at short context.',
    },
    {
      question: 'Which quantisation should I use for Qwen3?',
      answer:
        'Q4_K_M is the sensible default and the best balance on capacity-constrained cards. If you have VRAM to spare, Q5_K_M or Q8_0 preserve more output quality at a proportional memory cost.',
    },
    {
      question: 'Can I run Qwen3 on 8GB of VRAM?',
      answer:
        'Yes, using an 8B-class variant at 4-bit with a modest context window. Larger variants will load only with layers offloaded to system RAM, which reduces generation to a few tokens per second.',
    },
    {
      question: 'Why is my local Qwen3 so slow?',
      answer:
        'Almost always partial CPU offload. If any layers live in system RAM, generation speed is governed by system memory bandwidth rather than the GPU. Check the offload split and reduce context or quantisation until everything fits.',
    },
    {
      question: 'Should I run a bigger model or a longer context?',
      answer:
        'Usually longer context. A mid-size model that can see your whole document tends to be more useful than a larger model restricted to a short window, particularly for code and document work.',
    },
    {
      question: 'Is Ollama or LM Studio better for running Qwen3?',
      answer:
        'LM Studio is easier while you are choosing a variant, since it shows what fits before you download. Ollama is better once you have decided and want the model available to other software through an API.',
    },
    {
      question: 'Why does my model run out of memory partway through a prompt?',
      answer:
        'KV cache grows as context fills, so memory pressure increases during generation rather than at load. The fix is a shorter context length or a smaller quantisation, not more system RAM.',
    },
    {
      question: 'Does Qwen3 need a specific prompt template?',
      answer:
        'Yes, and a mismatched template is a common cause of output that seems poor at instruction following. Most tools apply the correct one automatically when you pull the model through their registry.',
    },
    {
      question: 'How do I know if the whole model is on the GPU?',
      answer:
        'Both Ollama and LM Studio report the layer offload split when a model loads. If the number of GPU layers is lower than the model total, part of it is in system RAM and speed will be far below what the card can do.',
    },
  ],

  schema: {
    '@type': 'HowTo',
    about: [{ name: 'Qwen3', type: 'SoftwareApplication' }],
    itemList: [
      { name: 'Work out your VRAM budget' },
      { name: 'Choose parameter size and quantisation' },
      { name: 'Pull the model' },
      { name: 'Set context length explicitly' },
      { name: 'Verify full GPU offload' },
    ],
  },

  related: [
    '/benchmarks/qwen3-14b/',
    '/vs/ollama-vs-lm-studio/',
    '/blog/quantization-tradeoffs-explained/',
  ],
};

export default guide;
