import type { VerdictContent } from '@/types/content';

export const verdict: VerdictContent = {
  slug: 'rtx-5080-local-ai-reddit',
  status: 'draft',
  datePublished: '2026-08-10',

  seo: {
    title: 'RTX 5080 for Local AI: What People Actually Report',
    description:
      'A curated roundup of community reaction to the RTX 5080 for local inference — where opinion converges, where it splits, and which complaints keep resurfacing.',
    keywords: [
      'rtx 5080 local ai reddit',
      'rtx 5080 llm worth it',
      'rtx 5080 16gb complaints',
      'is rtx 5080 good for ai',
      'rtx 5080 local inference opinions',
    ],
    canonical: '/verdict/rtx-5080-local-ai-reddit/',
  },

  hero: {
    eyebrow: 'Curated verdict',
    headline: 'What People Actually Say About the RTX 5080 for Local AI',
    subheadline:
      'A synthesis of public discussion, not our own testing. Every source is linked; every opinion is paraphrased.',
    lastUpdated: '2026-08-10',
  },

  contentLabel:
    'Synthesised from public discussion — not our own hands-on test. Sources are listed and linked at the bottom of this page.',

  quickAnswer:
    'Community sentiment toward the RTX 5080 for local AI is consistently mixed, and the split is almost always about capacity rather than performance. Nobody disputes that it is fast; the recurring complaint is that another generation shipped without more VRAM on the class of card most enthusiasts buy. The most common recommendation in these discussions is to buy used 24GB cards instead if local LLM work is the goal, with the 5080 favoured by people whose workload is image generation or who want one card that also games well. A minority position holds that capacity complaints are overstated because most people run models well under 16GB anyway.',

  consensusThemes: [
    {
      theme: 'The card is fast; the VRAM is the complaint',
      supportingSourceCount: 4,
      detail:
        'Across every source reviewed, performance is described as strong and capacity as the limiting factor. Discussion consistently frames the card as unable to run larger models rather than slow at running them.',
    },
    {
      theme: 'Used 24GB cards are the recurring counter-recommendation',
      supportingSourceCount: 4,
      detail:
        'When someone asks whether to buy this card for local LLM work, the most upvoted replies typically redirect toward used previous-generation 24GB cards on capacity-per-dollar grounds.',
    },
    {
      theme: 'Image-generation users are markedly more positive',
      supportingSourceCount: 3,
      detail:
        'Discussion in diffusion-focused communities is more favourable, on the basis that those workloads are compute-bound and fit comfortably in 16GB.',
    },
    {
      theme: 'Power and thermals draw fewer complaints than expected',
      supportingSourceCount: 2,
      detail:
        'Efficiency under sustained inference load is generally described positively, and is one of the few areas where the card is preferred over used alternatives without qualification.',
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
      heading: 'Where the discussion consistently lands',
      body: [
        'The pattern across sources is unusually stable for a hardware discussion: agreement that the card performs well, and frustration that performance was not the thing people needed improved. Capacity is what determines which models run at full speed, and another generation at the same capacity means the practical ceiling has not moved for this tier of buyer.',
        'That framing shows up repeatedly in buying threads, where a question about this card is often answered with a question about which models the buyer intends to run — and where the answer "70B" reliably redirects the conversation toward multi-card configurations.',
      ],
    },
    {
      type: 'prose',
      heading: 'Where opinion genuinely splits',
      body: [
        'The clearest divide is by workload. In communities focused on image generation, sentiment is materially more positive, because diffusion workloads are compute-bound and fit within 16GB comfortably. In LLM-focused communities the same card is discussed as a compromise.',
        'A less common but persistent minority view is that the capacity complaints are overstated: most people, in practice, run models comfortably under 16GB, and the loudest objections come from users whose requirements are unrepresentative of typical use.',
      ],
    },
    {
      type: 'prose',
      heading: 'What we have not verified',
      body: [
        'This page reports what others say, not what we measured. We have not tested this card. Where community-reported numbers appear in discussion, they vary widely with runtime, quantisation and context length, and we have deliberately not aggregated them into a single figure — doing so would imply a precision the underlying reports do not support.',
      ],
    },
  ],

  sources: [
    {
      name: 'r/LocalLLaMA',
      url: 'https://www.reddit.com/r/LocalLLaMA/',
      sentiment: 'mixed',
      accessed: '2026-08-10',
      summary:
        'Discussion in this community consistently treats the card as fast but capacity-limited, with buying threads frequently redirected toward used 24GB cards when the stated goal is running larger local models.',
    },
    {
      name: 'r/StableDiffusion',
      url: 'https://www.reddit.com/r/StableDiffusion/',
      sentiment: 'positive',
      accessed: '2026-08-10',
      summary:
        'Reception among image-generation users is notably warmer, on the reasoning that diffusion workloads are compute-bound and fit within 16GB without capacity becoming a practical constraint.',
    },
    {
      name: 'Level1Techs Forum',
      url: 'https://forum.level1techs.com/',
      sentiment: 'mixed',
      accessed: '2026-08-10',
      summary:
        'Threads here tend to weigh efficiency and build practicality more heavily than raw capacity, and are more sympathetic to the card as a single-GPU workstation choice than LLM-focused communities are.',
    },
    {
      name: 'r/buildapc',
      url: 'https://www.reddit.com/r/buildapc/',
      sentiment: 'mixed',
      accessed: '2026-08-10',
      summary:
        'Advice in this community typically separates gaming and AI use cases explicitly, recommending the card for mixed-use builds while steering dedicated inference builds toward higher-capacity alternatives.',
    },
  ],

  faqs: [
    {
      question: 'Is the RTX 5080 worth it for local AI according to users?',
      answer:
        'Community opinion is mixed and splits by workload. Image-generation users are broadly positive; local LLM users more often recommend used 24GB cards instead, on the grounds that capacity rather than speed is what limits them.',
    },
    {
      question: 'What do people on Reddit say about the RTX 5080 VRAM?',
      answer:
        'The dominant complaint across the discussions reviewed is that capacity did not increase generation-over-generation on this tier, which means the set of models that run at full speed has not grown even though the card is faster.',
    },
    {
      question: 'Do people recommend the RTX 5080 or a used 24GB card for LLMs?',
      answer:
        'In LLM-focused communities, used 24GB cards are the more common recommendation when running larger models is the goal. The 5080 is more often recommended for mixed gaming and AI use, or for image generation.',
    },
    {
      question: 'Is the RTX 5080 good for Stable Diffusion according to users?',
      answer:
        'Reception in image-generation communities is positive. The reasoning given is consistent: diffusion workloads are compute-bound rather than capacity-bound, so 16GB is sufficient and the newer architecture is felt directly.',
    },
    {
      question: 'What do users say about RTX 5080 power consumption for AI work?',
      answer:
        'Efficiency under sustained inference load is one of the few points where the card is praised without qualification, particularly in comparison with older high-capacity cards that draw considerably more.',
    },
    {
      question: 'Are the VRAM complaints about the RTX 5080 justified?',
      answer:
        'The majority view in these discussions is yes, for local LLM work specifically. A persistent minority argues the complaints are overstated because most people run models comfortably under 16GB in practice.',
    },
    {
      question: 'Can the RTX 5080 run 70B models according to community reports?',
      answer:
        'Reports consistently describe 70B-class models as requiring offload to system RAM on a single 16GB card, with the resulting speed described as technically functional but too slow for interactive use.',
    },
    {
      question: 'Is this page based on your own testing?',
      answer:
        'No. This is a curated synthesis of public discussion, labelled as such, with every source linked. Our own measured figures appear on our review and benchmark pages, which are separate URLs and clearly marked.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [{ name: 'NVIDIA GeForce RTX 5080', type: 'Product' }],
  },

  relatedReviews: ['/reviews/rtx-5070-ti-local-ai/', '/reviews/rtx-3090-used-local-llm/'],
  related: ['/vs/rtx-5070-ti-vs-rtx-3090/', '/guides/best-gpu-for-local-llm-inference-2026/'],
};

export default verdict;
