import type { VerdictContent } from '@/types/content';

export const verdict: VerdictContent = {
  slug: 'strix-halo-128gb-local-llm',
  status: 'draft',
  datePublished: '2026-08-07',

  seo: {
    title: 'Unified-Memory Mini PCs for Local LLMs: What Owners Report',
    description:
      'A curated roundup of community reports on large unified-memory systems for local inference — where they beat discrete GPUs outright, and where owners say they disappoint.',
    keywords: [
      'strix halo local llm',
      'ryzen ai max 128gb llm',
      'unified memory local llm',
      'mini pc local ai reddit',
      'unified memory vs gpu inference',
    ],
    canonical: '/verdict/strix-halo-128gb-local-llm/',
  },

  hero: {
    eyebrow: 'Curated verdict',
    headline: 'Big Unified Memory vs Discrete GPUs: What Owners Report',
    subheadline:
      'Systems that hold enormous models at moderate speed. Synthesised from public discussion, not our own testing.',
    lastUpdated: '2026-08-07',
  },

  contentLabel:
    'Synthesised from public discussion — not our own hands-on test. Sources are listed and linked at the bottom of this page.',

  quickAnswer:
    'Owner reports on large unified-memory systems converge on a clear trade: they hold models no consumer discrete GPU can, and they run them more slowly than a discrete GPU runs models that fit. The enthusiasm is loudest from people whose alternative was a multi-card build, since a single quiet low-power box replacing two space heaters is a substantial quality-of-life change. The disappointment comes from people who expected GPU-class throughput and found that memory bandwidth, not capacity, then became the limit. A second recurring theme is software maturity: reports of runtime and driver rough edges are common, and improving over time.',

  consensusThemes: [
    {
      theme: 'Capacity is transformative; bandwidth is the new ceiling',
      supportingSourceCount: 4,
      detail:
        'Owners consistently describe being able to load very large models as the headline benefit, and generation speed on those models as the headline compromise.',
    },
    {
      theme: 'Power, noise and size are a major draw',
      supportingSourceCount: 3,
      detail:
        'Comparisons against two-card builds frequently emphasise a small, quiet, low-draw machine as worth a real throughput penalty, particularly for always-on use.',
    },
    {
      theme: 'Software support is improving but still rough',
      supportingSourceCount: 3,
      detail:
        'Reports of runtime compatibility issues and slower adoption of new features than the CUDA ecosystem are common, with a general sense that the situation has improved.',
    },
    {
      theme: 'Poor fit for image generation',
      supportingSourceCount: 2,
      detail:
        'Diffusion workloads are compute-bound and fit easily in 16GB, so owners report they gain nothing from the capacity while paying the compute penalty.',
    },
  ],

  sections: [
    {
      type: 'callout',
      tone: 'warn',
      heading: 'Seed page — sources not yet finalised',
      body: 'The source list below points at community landing pages rather than the specific threads this synthesis is drawn from. Replacing them with direct thread and video links is a Checkpoint 2 task, and this page stays `draft` and noindex until that is done. See CLAUDE.md.',
    },
    {
      type: 'prose',
      heading: 'The trade owners describe',
      body: [
        'The recurring shape of these reports is that unified memory changes which question you are answering. On a discrete GPU the question is "does it fit"; on these systems it usually does, and the question becomes "how fast is it once it fits".',
        'That is a genuinely different failure mode, and owners are split on whether it is better. A large model at moderate speed is more useful than the same model at two tokens per second on an offloaded discrete card — and less useful than a mid-size model running quickly, if a mid-size model would have done the job.',
      ],
    },
    {
      type: 'prose',
      heading: 'Who reports being happiest',
      body: [
        'The most positive accounts come from people whose alternative was a multi-card build. Replacing two high-draw cards, a large power supply and a case airflow problem with one small quiet machine is described as worth a substantial throughput penalty, particularly where the machine runs continuously.',
        'The least positive accounts come from people who came from a single fast GPU and expected the new system to be both bigger and faster. Reports from that group tend to describe the experience as capable but sluggish.',
      ],
    },
    {
      type: 'prose',
      heading: 'The software caveat',
      body: [
        'Runtime maturity outside the CUDA ecosystem comes up in most discussions. The pattern is consistent: core functionality works, newer features and optimisations arrive later, and occasional troubleshooting is part of the experience.',
        'Reports generally describe this as improving. It is nonetheless the factor most often cited by people recommending against the platform for anyone who wants their tools to simply work.',
      ],
    },
  ],

  sources: [
    {
      name: 'r/LocalLLaMA',
      url: 'https://www.reddit.com/r/LocalLLaMA/',
      sentiment: 'mixed',
      accessed: '2026-08-07',
      summary:
        'Discussion here weighs the ability to load very large models against generation speed, with owners generally satisfied when the alternative was a multi-card build and disappointed when it was a fast single GPU.',
    },
    {
      name: 'llama.cpp discussions',
      url: 'https://github.com/ggml-org/llama.cpp/discussions',
      sentiment: 'mixed',
      accessed: '2026-08-07',
      summary:
        'Threads here cover runtime support and backend maturity for non-CUDA hardware in technical detail, with a general trajectory of improving compatibility and lagging feature parity.',
    },
    {
      name: 'r/homelab',
      url: 'https://www.reddit.com/r/homelab/',
      sentiment: 'positive',
      accessed: '2026-08-07',
      summary:
        'Reception is warmer here, where continuous operation, low power draw and small physical footprint are weighted heavily against raw throughput.',
    },
    {
      name: 'Level1Techs Forum',
      url: 'https://forum.level1techs.com/',
      sentiment: 'mixed',
      accessed: '2026-08-07',
      summary:
        'Discussion focuses on memory bandwidth as the governing constraint and compares these systems against multi-GPU builds on total cost of ownership rather than throughput alone.',
    },
  ],

  faqs: [
    {
      question: 'Are unified-memory mini PCs good for running local LLMs?',
      answer:
        'Owner reports describe them as excellent at holding very large models and moderate at generating quickly. They suit people who want to run models no consumer GPU can fit, and disappoint those expecting discrete-GPU throughput.',
    },
    {
      question: 'How does unified memory compare to a discrete GPU for inference?',
      answer:
        'Capacity is far higher and bandwidth is far lower. That means large models load and run where a discrete card would have to offload, but a model that fits in GPU memory will generate faster on the GPU.',
    },
    {
      question: 'Is a unified-memory system a good replacement for a dual-GPU rig?',
      answer:
        'Owners who moved from multi-card builds are generally the most positive group, citing power draw, noise and size as worth a real throughput penalty — particularly for machines that run continuously.',
    },
    {
      question: 'What do owners say about software support on these systems?',
      answer:
        'Reports consistently describe core functionality as working and newer optimisations as arriving later than on CUDA. The situation is generally characterised as improving, but troubleshooting is part of the experience.',
    },
    {
      question: 'Are these systems good for Stable Diffusion or ComfyUI?',
      answer:
        'Reports are generally negative on this point. Diffusion workloads are compute-bound and already fit within 16GB, so the large memory pool provides no benefit while the compute penalty applies.',
    },
    {
      question: 'How fast are large models on unified-memory hardware?',
      answer:
        'Reported figures vary widely with model size, quantisation and runtime, and we have deliberately not aggregated them here — doing so would imply a precision the underlying reports do not support. Expect materially slower generation than a discrete GPU running a model that fits.',
    },
    {
      question: 'Who should not buy a unified-memory system for local AI?',
      answer:
        'Anyone whose models already fit comfortably in a discrete GPU, anyone whose main workload is image generation, and anyone who wants tooling that works without occasional troubleshooting.',
    },
    {
      question: 'Is this page based on your own testing?',
      answer:
        'No. It is a curated synthesis of public discussion, labelled as such, with every source linked. We do not currently own hardware of this type.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [{ name: 'Unified memory local inference systems', type: 'Thing' }],
  },

  relatedReviews: ['/reviews/rtx-3090-used-local-llm/'],
  related: ['/guides/multi-gpu-setup-for-local-ai/', '/blog/vram-is-still-the-bottleneck/'],
};

export default verdict;
