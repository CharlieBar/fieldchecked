import type { ExperimentContent } from '@/types/content';

/**
 * STRUCTURAL PLACEHOLDER.
 *
 * This pillar publishes results from this site's own Search Console data, and
 * this site has none yet — it has not been indexed. The page exists so the
 * route, the schema and the validator rules are real and exercised; it carries
 * no findings, and it cannot be published until `dataPoints` hold measurements
 * that actually came out of GSC.
 *
 * Do not fill these numbers in from anywhere but the console.
 */
export const experiment: ExperimentContent = {
  slug: 'faq-schema-ai-citations',
  status: 'draft',
  vertical: 'B',
  datePublished: '2026-08-12',

  seo: {
    title: 'Does FAQ Schema Affect AI Citations? A 90-Day Test',
    description:
      'A pre-registered test of whether FAQPage structured data changes how often pages are cited by AI assistants, run on this site with the method fixed before any data exists.',
    keywords: [
      'faq schema ai citations',
      'does faq schema work',
      'structured data ai search',
      'geo seo experiment',
      'faqpage schema test',
    ],
    canonical: '/experiments/faq-schema-ai-citations/',
  },

  hero: {
    eyebrow: 'Experiment',
    headline: 'Does FAQ Schema Affect AI Citations?',
    subheadline:
      'Pre-registered, not yet run. The method is fixed here before any data exists, which is the only way the result means anything.',
    lastUpdated: '2026-08-12',
  },

  hypothesis:
    'Pages carrying FAQPage structured data are cited more often by AI assistants than otherwise-comparable pages without it, holding content, length and internal linking constant.',

  quickAnswer:
    'This is a pre-registration, not a result. Every content page on this site currently carries stacked FAQPage schema, and the plan is to hold a matched subset at minimal schema for 90 days and compare citation and impression behaviour between the two groups. The method, the control set and the success criterion are written down here before any data exists, specifically so the analysis cannot be reshaped after the fact to produce a tidier story. There are no findings on this page yet because the site has not been indexed and Search Console has no data for it. When the window closes, the numbers land here whatever they say — including, quite possibly, that the difference is too small to distinguish from noise on a site this size.',

  method: {
    change:
      'Hold a matched subset of pages at Article + BreadcrumbList only, while the comparison set keeps Article + BreadcrumbList + FAQPage. Content, length, internal linking and publish cadence held constant across both groups.',
    startDate: 'not started',
    endDate: 'not started',
    controls: [
      'Matched pairs chosen within the same pillar, so query intent is comparable',
      'Same publish week for both members of a pair, to control for indexing-age effects',
      'No content edits to either group during the window',
      'Both groups excluded from any other concurrent experiment',
    ],
  },

  // Empty on purpose. The validator blocks publication until this has real
  // rows, which is what stops this page becoming a confident-sounding guess.
  dataPoints: [],

  result: 'inconclusive',

  caveats: [
    'n=1 site with low authority — an effect that exists at scale may be undetectable here',
    'Citation counting is manual and sampled; there is no first-party API for assistant citations',
    'Assistant retrieval behaviour changes without notice, so the window itself is not a stable environment',
    'Matched pairs are matched by judgement, not randomised — residual confounds are likely',
    'A null result here is weak evidence of absence, not evidence of no effect',
  ],

  sections: [
    {
      type: 'callout',
      tone: 'warn',
      heading: 'This page has no results yet',
      body: 'It is a structural placeholder: the route, schema and validator rules are real and exercised, but no data exists because the site has not been indexed. It stays draft and unindexed until the dataPoints array holds figures that came out of Search Console.',
    },
    {
      type: 'prose',
      heading: 'Why pre-register the method',
      body: [
        'The failure mode for a single-site SEO experiment is not bad data collection, it is a flexible analysis. With enough metrics and enough windows, something always looks significant, and the write-up assembles itself around whatever that was.',
        'Fixing the change, the control set and the success criterion in advance removes most of that freedom. It also means an inconclusive result stays inconclusive rather than being quietly re-framed as a finding.',
      ],
    },
    {
      type: 'prose',
      heading: 'What would count as a result',
      body: [
        'A difference large enough to be visible above the week-to-week variance of a low-traffic site — which, realistically, means a large effect or none. That is a limitation worth stating up front rather than discovering at analysis time.',
        'Null results get published here with the same prominence as positive ones. That is the whole credibility mechanism for this pillar; a series of experiments that all confirmed their hypotheses would be evidence of bad method, not good SEO.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Does FAQ schema improve AI citations?',
      answer:
        'Unknown, which is why this test exists. Vendor claims circulate widely and are rarely accompanied by a method. This page will publish a measured answer for one small site, with its limitations stated.',
    },
    {
      question: 'What is FAQPage structured data?',
      answer:
        'A JSON-LD markup type that labels question-and-answer pairs on a page so search engines and assistants can identify them as discrete Q&A rather than ordinary prose.',
    },
    {
      question: 'Why has this experiment not produced results yet?',
      answer:
        'Because the site has not been indexed and Search Console has no data for it. Publishing a result before the data exists would be exactly the failure this pillar is designed to avoid.',
    },
    {
      question: 'How are AI citations measured?',
      answer:
        'By manual sampling of assistant responses to a fixed query set, since no first-party citation API exists. That method is noisy and its noisiness is recorded as a caveat rather than hidden.',
    },
    {
      question: 'Why pre-register an SEO experiment?',
      answer:
        'Because a flexible analysis will always find something. Fixing the change, controls and success criterion in advance is what makes a null result publishable rather than quietly abandoned.',
    },
    {
      question: 'Is an n=1 site enough to test this?',
      answer:
        'For a large effect, possibly. For a subtle one, no. This is stated as a caveat because a single low-authority site cannot distinguish a small effect from ordinary week-to-week variance.',
    },
    {
      question: 'What happens if the result is inconclusive?',
      answer:
        'It gets published as inconclusive. That is a valid and expected outcome, and treating it as a failure to be reworked into a confident claim would undermine every other experiment on the site.',
    },
    {
      question: 'Will you publish the raw data?',
      answer:
        'The per-window figures land in the dataPoints on this page along with their source, so the reported conclusion can be checked against the numbers it came from.',
    },
  ],

  schema: {
    '@type': 'Article',
    dataset: {
      measurementTechnique:
        'Matched-pair comparison of structured-data variants, sampled manually against a fixed query set',
      variableMeasured: 'AI assistant citation frequency and Search Console impressions',
    },
  },

  related: ['/builds/wordpress-mcp-server-claude-code/'],
};

export default experiment;
