import type { ExperimentContent } from '@/types/content';

/**
 * STRUCTURAL PLACEHOLDER.
 *
 * The tracking window has not run. Every substantive claim about which tool
 * suits which task has been deliberately left out rather than written from
 * memory — recollection of tool use is exactly the unreliable source this
 * pillar exists to replace.
 *
 * `dataPoints` stays empty until a real usage log exists. Fill it from the log,
 * never from impressions formed while writing the page.
 */
export const experiment: ExperimentContent = {
  slug: 'which-ai-subscription-earns-its-keep',
  status: 'draft',
  vertical: 'B',
  datePublished: '2026-08-29',

  seo: {
    title: 'Five AI Subscriptions: Which Ones Earn Their Keep',
    description:
      'A 30-day log of which paid AI tool actually got reached for, per task type, instead of a recollection written after the fact. Method fixed before the window opens.',
    keywords: [
      'is claude code worth it',
      'codex vs claude code subscription',
      'ai coding subscription cost',
      'paying for multiple ai tools',
      'which ai assistant is worth paying for',
    ],
    canonical: '/experiments/which-ai-subscription-earns-its-keep/',
  },

  hero: {
    eyebrow: 'Experiment',
    headline: 'Which of Five AI Subscriptions Earn Their Keep',
    subheadline:
      'Not yet run. A month of logged usage beats a month of remembered usage, and the difference between them is the entire point.',
    lastUpdated: '2026-08-29',
  },

  hypothesis:
    'Paid AI tools held simultaneously are not interchangeable: each has a task class where it is reached for first, and at least one is retained out of habit rather than use. A contemporaneous log will disagree with recollection about which is which.',

  quickAnswer:
    'This is a pre-registration, not a result. Five paid AI subscriptions run in parallel here, and the obvious article — which one is worth the money — is normally written from memory, which is the least reliable instrument available for this question. People remember the tool they enjoy using, not the tool they reach for, and they remember dramatic successes rather than routine ones. So the method is a contemporaneous log instead: every non-trivial task recorded at the time with the tool chosen, the task class, whether it completed without switching, and whether a switch happened mid-task. After thirty days the counts answer the question directly, including the uncomfortable possibility that a subscription is being paid for and barely opened. Nothing is claimed here until that log exists.',

  method: {
    change:
      'Log every non-trivial task for 30 consecutive days at the moment of use: tool chosen, task class, whether it completed without switching tools, and whether a mid-task switch occurred and to what.',
    startDate: 'not started',
    endDate: 'not started',
    controls: [
      'Logged at the time of use, never reconstructed at the end of a day or week',
      'Task classes fixed before the window opens, so categories are not invented to fit the pattern',
      'Every tool remains subscribed and available for the whole window — no tool removed mid-test',
      'Null entries recorded: a day with no use of a tool is data, not an omission',
      'Mid-task switches recorded with the reason, since abandonment is the strongest signal available',
      'No deliberate effort to distribute work evenly — the point is to observe unforced choice',
    ],
  },

  // Empty on purpose. Filling this from recollection would reproduce exactly
  // the failure the method is designed to avoid.
  dataPoints: [],

  result: 'inconclusive',

  caveats: [
    'n=1 operator with specific habits — this measures one person\'s workflow, not the products in general',
    'Familiarity compounds: the tool used most gets easier to use, which reinforces its own lead independent of quality',
    'Task mix over 30 days is not representative of all work, and a different month would produce a different distribution',
    'Observation changes behaviour — knowing usage is logged may nudge tool choice toward variety',
    'Pricing tiers, rate limits and quotas differ, so reaching for a tool less often may reflect a cap rather than a preference',
    'Product capability moves during and after the window, so conclusions decay quickly',
  ],

  sections: [
    {
      type: 'callout',
      tone: 'warn',
      heading: 'This page has no results yet',
      body: 'The tracking window has not run. Every claim about which tool suits which task is deliberately absent rather than written from memory, and the page stays draft until the log exists.',
    },
    {
      type: 'prose',
      heading: 'Why recollection is the wrong instrument',
      body: [
        'Asked which tool they prefer, people answer accurately about their feelings and inaccurately about their behaviour. Memory over-weights the dramatic — the time something one-shotted a hard refactor — and under-weights the routine, which is where nearly all the value actually accumulates.',
        'It also cannot see abandonment. Tasks started in one tool and quietly finished in another leave no trace in recollection, yet a mid-task switch is the single most informative event available: it marks the exact point where one tool stopped being the right choice.',
      ],
    },
    {
      type: 'prose',
      heading: 'The finding the method has to allow',
      body: [
        'That one of these subscriptions is barely used and should be cancelled. Any method that cannot produce that result is not measuring anything — it is producing a justification for spending that has already happened.',
        'Logging null usage explicitly is what keeps that outcome reachable. A tool that goes unopened for three weeks generates no entries, and an absence is easy to overlook unless the absence is itself recorded.',
      ],
    },
    {
      type: 'prose',
      heading: 'What this will and will not support',
      body: [
        'It will support statements about unforced choice: which tool got reached for, for what kind of work, and where switching happened. Those are behavioural facts about one workflow, and they are checkable against the log.',
        'It will not support statements about which product is better. Capability comparison needs a controlled task with a fixed pass mark, which is a separate test with a separate method.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is Claude Code worth the subscription?',
      answer:
        'This page will answer that for one workflow, from a usage log rather than an impression. It has no answer yet because the tracking window has not run, and an answer written before the log would be recollection.',
    },
    {
      question: 'Is it worth paying for several AI tools at once?',
      answer:
        'That is the question under test. The method is designed so that the answer can legitimately be no for one or more of them, since a comparison that cannot recommend cancelling is not measuring anything.',
    },
    {
      question: 'How do you decide which AI tool to use for a task?',
      answer:
        'Most people decide by habit and then explain it afterwards. Logging the choice at the moment of use captures the habit itself rather than the explanation constructed later.',
    },
    {
      question: 'Why log usage instead of just writing what you think?',
      answer:
        'Because memory over-weights dramatic successes and cannot see abandonment. Tasks quietly finished in a different tool leave no trace in recollection but are the most informative events in the log.',
    },
    {
      question: 'What counts as a mid-task switch?',
      answer:
        'Starting a task in one tool and completing it in another. It is recorded with the reason, because it marks the precise point where the first tool stopped being the right choice.',
    },
    {
      question: 'Does this measure which AI coding tool is better?',
      answer:
        'No. It measures unforced choice in one workflow. Capability comparison requires a controlled identical task with a machine-checkable pass mark, which is a separate experiment.',
    },
    {
      question: 'Does knowing you are logging change which tool you pick?',
      answer:
        'Probably, and it is recorded as a caveat. Observation nudges behaviour toward variety, which would bias the result toward the tools that get used less naturally.',
    },
    {
      question: 'Why thirty days?',
      answer:
        'Long enough to cover a varied task mix and to let novelty wear off, short enough that product capability does not shift much within the window. It is a compromise, and it is stated as one.',
    },
    {
      question: 'Will the raw log be published?',
      answer:
        'The per-category counts land in the dataPoints on this page with their source, so the stated conclusion can be checked against the numbers behind it.',
    },
  ],

  schema: {
    '@type': 'Article',
    dataset: {
      measurementTechnique:
        'Contemporaneous 30-day usage log with fixed task classes, recording tool choice, completion and mid-task switching',
      variableMeasured: 'Unforced tool choice per task class, and mid-task switch frequency',
    },
  },

  related: ['/experiments/ai-coding-agents-same-task/'],
};

export default experiment;
