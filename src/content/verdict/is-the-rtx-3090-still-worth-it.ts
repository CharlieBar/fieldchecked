import type { VerdictContent } from '@/types/content';

export const verdict: VerdictContent = {
  slug: 'is-the-rtx-3090-still-worth-it',
  status: 'draft',
  vertical: 'A',
  datePublished: '2026-08-08',

  seo: {
    title: 'Is a Used RTX 3090 Still Worth It? What Owners Report',
    description:
      'A curated roundup of what people who actually run used RTX 3090s for local AI say about reliability, power draw, thermal pads and whether they would buy again.',
    keywords: [
      'is rtx 3090 still worth it reddit',
      'used rtx 3090 reliability',
      'rtx 3090 thermal pads ai',
      'rtx 3090 local llm owners',
      'buying used 3090 2026',
    ],
    canonical: '/verdict/is-the-rtx-3090-still-worth-it/',
  },

  hero: {
    eyebrow: 'Curated verdict',
    headline: 'Is a Used RTX 3090 Still Worth It in 2026?',
    subheadline:
      'What owners report about living with a five-year-old card as an inference workhorse. Synthesised from public discussion, not our own testing.',
    lastUpdated: '2026-08-08',
  },

  contentLabel:
    'Synthesised from public discussion — not our own hands-on test. Sources are listed and linked at the bottom of this page.',

  quickAnswer:
    'Owner sentiment is strongly positive on value and consistently cautious on condition. The recurring verdict is that 24GB at used-market prices remains unmatched for local LLM work, and that most people who bought one would buy again — often a second one. The caveats are equally consistent: power draw and heat are described as real daily costs rather than spec-sheet footnotes, and thermal-pad replacement comes up often enough to be treated as expected maintenance on a hard-used card rather than a defect. Reports of outright failures are relatively uncommon in these discussions, but sellers with no return window are widely advised against.',

  consensusThemes: [
    {
      theme: '24GB at used prices is still the value benchmark',
      supportingSourceCount: 4,
      detail:
        'Across sources, this card is the default recommendation for capacity-constrained local LLM work, and newer cards are usually discussed as alternatives rather than replacements.',
    },
    {
      theme: 'Thermal pads are treated as expected maintenance',
      supportingSourceCount: 3,
      detail:
        'Memory temperatures on hard-used cards come up repeatedly, with pad replacement described as a routine task rather than evidence of a faulty card.',
    },
    {
      theme: 'Power and heat are the real daily cost',
      supportingSourceCount: 4,
      detail:
        'Sustained inference load is described as a different thermal pattern from gaming, and reports of case airflow being the actual limiting factor are common.',
    },
    {
      theme: 'Two-card builds are widely reported as worth it',
      supportingSourceCount: 3,
      detail:
        'Owners who added a second card generally describe reaching 70B-class models as the moment the setup justified itself, with power provisioning cited as the main hurdle.',
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
      heading: 'The value case, as owners describe it',
      body: [
        'The argument that recurs across sources is not that this card is fast. It is that capacity is the thing that stops people, and this is the cheapest way to buy a lot of it. Discussions repeatedly frame the choice as between a newer card that runs your current models faster and this one that runs models your current card cannot load.',
        'That framing tends to win in communities focused on local LLMs and lose in communities focused on image generation, where 16GB is ample and the older card\'s power draw is harder to justify.',
      ],
    },
    {
      type: 'prose',
      heading: 'The maintenance question',
      body: [
        'Thermal pad degradation on this generation is discussed often enough that owners generally treat replacement as a planned task rather than a fault. The specific concern raised is memory temperature under sustained load, which inference produces far more consistently than gaming does.',
        'Reports of outright card failure are notably less common in these discussions than the volume of thermal talk might suggest — the pattern is closer to "needs attention" than "unreliable".',
      ],
    },
    {
      type: 'prose',
      heading: 'What buyers are advised to check',
      body: [
        'The consistent advice across sources is to prefer sellers offering a return window, ask for sustained-load temperatures rather than idle figures, and treat cards run in open-air frames with more caution than ones from desktop builds.',
        'Power supply headroom is raised almost as often as card condition, particularly by people who intended from the outset to add a second card and discovered the requirement late.',
      ],
    },
  ],

  sources: [
    {
      name: 'r/LocalLLaMA',
      url: 'https://www.reddit.com/r/LocalLLaMA/',
      sentiment: 'positive',
      accessed: '2026-08-08',
      summary:
        'This community treats the card as the standard value recommendation for local LLM work, with capacity per dollar cited as the deciding factor and two-card builds discussed as the natural next step.',
    },
    {
      name: 'r/homelab',
      url: 'https://www.reddit.com/r/homelab/',
      sentiment: 'mixed',
      accessed: '2026-08-08',
      summary:
        'Discussion here weighs power draw and heat more heavily, with several accounts describing case airflow rather than the card itself as the practical constraint in always-on builds.',
    },
    {
      name: 'Level1Techs Forum',
      url: 'https://forum.level1techs.com/',
      sentiment: 'positive',
      accessed: '2026-08-08',
      summary:
        'Threads here cover thermal pad replacement in detail and generally characterise it as routine maintenance for a card of this age rather than a sign of a bad unit.',
    },
    {
      name: 'r/buildapc',
      url: 'https://www.reddit.com/r/buildapc/',
      sentiment: 'mixed',
      accessed: '2026-08-08',
      summary:
        'Advice here is more cautious about used purchases generally, emphasising return windows and seller history, while still acknowledging the capacity advantage for AI workloads.',
    },
  ],

  faqs: [
    {
      question: 'Do people still recommend buying a used RTX 3090 in 2026?',
      answer:
        'In local LLM communities, yes — it remains the default value recommendation because 24GB at used prices is unmatched for capacity-bound work. Image-generation communities are more likely to suggest a newer 16GB card instead.',
    },
    {
      question: 'Are used RTX 3090s reliable for continuous AI workloads?',
      answer:
        'Reports of outright failure are relatively uncommon in the discussions reviewed. The consistent caveat is thermal management: memory temperatures under sustained load are the most frequently raised concern.',
    },
    {
      question: 'Do I need to replace the thermal pads on a used RTX 3090?',
      answer:
        'Owners frequently describe it as expected maintenance on a hard-used card rather than a defect, particularly for cards that ran continuously. Cards from lightly used desktop builds are less often reported as needing it.',
    },
    {
      question: 'What do owners say about RTX 3090 power consumption?',
      answer:
        'It is described as a real daily cost rather than a footnote, especially in two-card builds. Several accounts identify case airflow rather than the power supply as the constraint that actually bit them.',
    },
    {
      question: 'Is it worth buying two used RTX 3090s?',
      answer:
        'Owners who did so generally report it as worthwhile, describing access to 70B-class models as the point where the build justified itself. Power provisioning is the most commonly cited obstacle.',
    },
    {
      question: 'What should I ask a seller when buying a used RTX 3090?',
      answer:
        'The advice that recurs is to request sustained-load memory temperatures rather than idle readings, ask whether the card ran in an open-air mining frame, and strongly prefer sellers offering a return window.',
    },
    {
      question: 'Is a used RTX 3090 better than a new mid-range card for AI?',
      answer:
        'For capacity-bound local LLM work, community consensus favours the 3090. For image generation, or where power draw and warranty matter, opinion shifts toward newer cards.',
    },
    {
      question: 'Are these findings based on your own testing?',
      answer:
        'No. This page is a curated synthesis of public discussion and is labelled as such. Our own measured figures appear on our review and benchmark pages, which are separate URLs.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [{ name: 'NVIDIA GeForce RTX 3090', type: 'Product' }],
  },

  relatedReviews: ['/reviews/rtx-4070-ti-super-local-ai/'],
  related: ['/guides/multi-gpu-setup-for-local-ai/', '/vs/rtx-4070-ti-super-vs-rtx-4060/'],
};

export default verdict;
