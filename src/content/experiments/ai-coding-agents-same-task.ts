import type { ExperimentContent } from '@/types/content';

/**
 * STRUCTURAL PLACEHOLDER.
 *
 * The comparison has not been run. The method is fixed here first, on purpose:
 * a tool comparison written after the fact is an anecdote assembled around
 * whichever tool the author already preferred.
 *
 * `dataPoints` stays empty until every agent has been run against the task and
 * the outcomes recorded. Do not populate it from impressions, from memory, or
 * from a run where the task differed between agents.
 */
export const experiment: ExperimentContent = {
  slug: 'ai-coding-agents-same-task',
  status: 'draft',
  vertical: 'B',
  datePublished: '2026-08-29',

  seo: {
    title: 'Four AI Coding Agents, One Task, One Objective Pass Mark',
    description:
      'A pre-registered comparison of Claude Code, Codex, Gemini and Antigravity on an identical task in a repo with a CI validator as the pass or fail bar.',
    keywords: [
      'claude code vs codex',
      'ai coding agent comparison',
      'best ai coding assistant 2026',
      'codex vs claude code benchmark',
      'agentic coding tools compared',
    ],
    canonical: '/experiments/ai-coding-agents-same-task/',
  },

  hero: {
    eyebrow: 'Experiment',
    headline: 'Four Agents, One Task, One Pass Mark',
    subheadline:
      'Pre-registered and not yet run. The task, the controls and the pass criterion are fixed before any agent touches the repo.',
    lastUpdated: '2026-08-29',
  },

  hypothesis:
    'Given an identical, non-trivial task in a repository with machine-checkable invariants, agentic coding tools differ measurably in whether they reach a passing state, how many iterations it takes, and which class of invariant they break along the way.',

  quickAnswer:
    'This is a pre-registration, not a result. Most comparisons of AI coding tools report an impression after unequal use, which is unfalsifiable and usually reflects familiarity more than capability. This test fixes the conditions instead: the same task, in the same repository, with the same acceptance criterion, given to each agent in turn. The pass mark is objective because this repo carries a content validator that either goes green or does not — it checks provenance rules, a publish-cadence cap, and a strict separation between content and design that a plausible-looking change can violate without breaking the build. What gets recorded is whether each agent reached green, how many iterations it needed, how often a human had to intervene, and which class of rule it broke. No findings appear here until every run is complete.',

  method: {
    change:
      'Give each agent the same written task against a clean checkout of this repository, with identical instructions and no follow-up coaching beyond a fixed intervention protocol. Record the outcome against `npm run qa` as the pass mark.',
    startDate: 'not started',
    endDate: 'not started',
    controls: [
      'Identical task text for every agent, written before the first run and not revised between runs',
      'Clean checkout at the same commit for each attempt, so no agent inherits another agent\'s work',
      'Same acceptance criterion for all: the content validator and the typecheck pass',
      'Fixed intervention protocol — the same kind and number of nudges allowed to each, recorded when used',
      'Runs ordered and logged, so any learning effect on the operator is visible rather than hidden',
      'Task chosen to require reading existing conventions rather than writing greenfield code',
    ],
  },

  // Empty on purpose. The validator blocks publication until real runs exist,
  // which is what stops this page becoming a ranking assembled from memory.
  dataPoints: [],

  result: 'inconclusive',

  caveats: [
    'n=1 task. A single task measures fit to that task, not general capability, and task choice is the largest lever in the whole design',
    'Prompt sensitivity is severe — a differently worded task could reorder the results without any tool changing',
    'Model versions move continuously; a result is a snapshot of a specific week, not a durable ranking',
    'The operator is more fluent with some of these tools than others, which cannot be fully controlled for',
    'A repo with an unusual validator rewards agents that read configuration carefully, which may not generalise to ordinary codebases',
    'Subscription tiers and rate limits differ between products, so equal access is not equal cost',
  ],

  sections: [
    {
      type: 'callout',
      tone: 'warn',
      heading: 'This page has no results yet',
      body: 'The method is published before the runs so it cannot be adjusted afterwards to fit a tidier story. It stays draft and unindexed until dataPoints hold outcomes from completed runs.',
    },
    {
      type: 'prose',
      heading: 'Why an objective pass mark matters more than the verdict',
      body: [
        'Almost every published comparison of these tools rests on impressions formed during unequal use — more hours with one, a harder problem given to another, and a conclusion that mostly records which one the author reached for first. That is not a criticism of the authors so much as of the format, which has no mechanism for being wrong.',
        'This repository happens to supply a mechanism. It carries a validator that enforces things a plausible-looking change can quietly violate: every numeric row must declare its provenance, a page with unverified numbers cannot be marked published, throughput figures cannot appear as free text in a table, and content files may not contain markup. An agent can produce clean, well-structured, entirely reasonable code that fails all four.',
      ],
    },
    {
      type: 'prose',
      heading: 'What gets recorded',
      body: [
        'Whether the agent reached a passing state at all. How many iterations it took to get there. How many human interventions were needed, under a protocol fixed in advance so that helping one agent more than another is visible in the record rather than absorbed into the impression.',
        'Most interestingly, the class of failure. An agent that invents a benchmark figure has failed differently from one that writes correct code in the wrong architectural layer, and differently again from one that edits the validator to make its change pass. Those are three distinct behaviours and the ranking is less interesting than the taxonomy.',
      ],
    },
    {
      type: 'prose',
      heading: 'What this cannot tell you',
      body: [
        'Which tool is best. One task on one repository under one operator is a data point, not a verdict, and anyone presenting it as a verdict is overreaching. The caveats on this page are not a disclaimer; they are the boundary of the claim.',
        'What it can do is replace an unfalsifiable impression with a stated set of conditions and a recorded outcome, which is a lower bar than most of this genre currently clears.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Which AI coding agent is best?',
      answer:
        'This test does not attempt to answer that. It reports how four agents performed on one specific task under stated conditions, which is a narrower and more checkable claim than a general ranking.',
    },
    {
      question: 'How do you compare Claude Code and Codex fairly?',
      answer:
        'Give both the identical task on the identical starting commit, with the same acceptance criterion and the same allowance for intervention, and record the outcome rather than the impression.',
    },
    {
      question: 'What counts as passing in this comparison?',
      answer:
        'The repository typecheck and content validator both pass. That is a machine-checkable bar covering provenance rules, publish-cadence limits and the separation between content and design.',
    },
    {
      question: 'Why use a validator instead of judging code quality?',
      answer:
        'Because quality judgements are exactly where an unfalsifiable comparison hides. A validator either goes green or it does not, and it enforces invariants a plausible-looking change can silently break.',
    },
    {
      question: 'Is one task enough to compare coding agents?',
      answer:
        'No, and the page says so. One task measures fit to that task. It is published as a data point with its limits stated rather than as a ranking, which is the honest version of what a single run supports.',
    },
    {
      question: 'Why does the method get published before the results?',
      answer:
        'Because a method written afterwards can be shaped to fit the outcome. Fixing the task, controls and pass criterion in advance is what makes an unflattering result publishable.',
    },
    {
      question: 'Does familiarity with one tool bias the result?',
      answer:
        'Yes, and it cannot be fully controlled for. The operator is more fluent with some of these products than others, which is recorded as a caveat rather than treated as solved.',
    },
    {
      question: 'Will you rerun this as the models change?',
      answer:
        'A result is a snapshot of a specific week. Any rerun is logged as a separate dated entry rather than replacing the original, so the change over time stays visible.',
    },
    {
      question: 'What happens if the result is inconclusive?',
      answer:
        'It gets published as inconclusive. On a single task with this much prompt sensitivity that is a likely outcome, and reshaping it into a confident ranking would defeat the point of pre-registering.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [
      { name: 'Claude Code', type: 'SoftwareApplication' },
      { name: 'OpenAI Codex', type: 'SoftwareApplication' },
      { name: 'Google Gemini', type: 'SoftwareApplication' },
      { name: 'Google Antigravity', type: 'SoftwareApplication' },
    ],
    dataset: {
      measurementTechnique:
        'Identical-task trial against a fixed CI acceptance criterion, with interventions recorded under a pre-set protocol',
      variableMeasured:
        'Pass or fail against the validator, iterations to green, human interventions, and class of invariant broken',
    },
  },

  related: ['/experiments/faq-schema-ai-citations/'],
};

export default experiment;
