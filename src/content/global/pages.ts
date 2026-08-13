import type { Faq, Section, Seo } from '@/types/content';

interface StaticPage {
  seo: Seo;
  heading: string;
  intro: string;
  sections: Section[];
  faqs?: Faq[];
}

export const aboutPage: StaticPage = {
  seo: {
    title: 'About FieldChecked and how we measure',
    description:
      'FieldChecked publishes local AI benchmarks from hardware we own, plus clearly-labelled roundups of community consensus. Here is the rig, the method, and the rule about which numbers get published.',
    keywords: ['fieldchecked about', 'local llm benchmark methodology', 'tokens per second testing'],
    canonical: '/about/',
  },
  heading: 'About FieldChecked',
  intro:
    'A one-rig publication about local AI hardware. Every measured number here came off a machine we own, and every number that did not is labelled as such on the page it appears.',
  sections: [
    {
      type: 'prose',
      heading: 'Why this site exists',
      body: [
        'Buying advice for local AI is unusually bad. Vendor pages quote theoretical throughput, review sites benchmark games, and forum threads mix genuine measurement with recollection. The specific number a person actually needs — how many tokens per second *this* model produces on *that* card at *this* quantisation — is usually missing.',
        'FieldChecked publishes that number, with the conditions attached. Runtime, quantisation, context length and VRAM footprint sit in the same row as the throughput figure, because a tokens/sec number without them is not a measurement, it is a rumour.',
      ],
    },
    {
      type: 'prose',
      heading: 'The hardware',
      body: [
        'Three GPUs are available for testing, and they are chosen to be a ladder rather than a collection: an 8GB card, and two 16GB cards at different memory bandwidth. That covers the decision most people are actually making — how much VRAM do I need, and does the faster card matter once capacity is settled.',
        'The list below is generated from the same record the build validator reads. If a benchmark row on this site names a GPU that is not on this list, the build fails. That is deliberate: it makes "we planned to measure something on hardware we do not have" impossible to ship rather than something you have to take on trust.',
      ],
    },
    {
      type: 'specs',
      heading: 'The rest of the rig',
      items: [
        { label: 'CPU', value: 'AMD Ryzen 9 7950X' },
        { label: 'System RAM', value: '64 GB DDR5-6000' },
        { label: 'OS', value: 'Windows 11 + WSL2 (Ubuntu 24.04)' },
        { label: 'Primary runtime', value: 'llama.cpp' },
        { label: 'Multi-GPU', value: 'Not available — no dual-card results are published' },
      ],
    },
    {
      type: 'steps',
      heading: 'How a number gets published',
      steps: [
        {
          title: 'Run it three times, keep the median',
          body: 'A single run catches thermal state, background load and cold caches. The median of three at a fixed prompt length is what gets recorded.',
        },
        {
          title: 'Record the conditions, not just the result',
          body: 'Quantisation format, context length, runtime build, driver version and peak VRAM all travel with the number. A figure without its conditions is not reproducible and is not published.',
        },
        {
          title: 'Label the provenance',
          body: 'Every row on this site carries a provenance tag: measured on our rig, community reported, vendor claimed, or pending verification. Nothing is presented as ours unless it is.',
        },
        {
          title: 'Re-run on a cadence',
          body: 'Runtimes change fast, and a six-month-old llama.cpp number can be wrong by a wide margin. Benchmark pages state their re-run cadence and carry the date they were last re-measured.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'On curated verdict pages',
      body: 'Pages under `/verdict/` synthesise public discussion from forums, subreddits and reviewer videos. They are labelled as curated on the page itself, every source is linked, and opinions are paraphrased rather than quoted at length. They are explicitly not our own hands-on testing, and are never presented as such.',
    },
    {
      type: 'prose',
      heading: 'Corrections',
      body: [
        'If a number here is wrong, it is worth more to us to know than to look right. Corrections go to the contact address and are applied to the page along with an updated date stamp.',
      ],
    },
  ],
  faqs: [
    {
      question: 'How does FieldChecked benchmark local LLMs?',
      answer:
        'Single-stream generation throughput is measured three times at a fixed prompt length and the median is recorded, along with quantisation format, context length, runtime build, driver version and peak VRAM. Prompt processing and generation are reported separately because they are governed by different bottlenecks.',
    },
    {
      question: 'Are these numbers reproducible on my machine?',
      answer:
        'Approximately, not exactly. Throughput depends on runtime build, driver version, quantisation format, context length, thermal headroom and background load. The conditions are published alongside every figure so you can match them as closely as your setup allows.',
    },
    {
      question: 'Does FieldChecked accept sponsored reviews?',
      answer:
        'No hardware on this site was supplied by a vendor. If that ever changes, the arrangement will be disclosed on the page in question before any result appears.',
    },
    {
      question: 'Why do some pages say the numbers are pending verification?',
      answer:
        'Because they have not yet been reproduced on our rig. Those pages carry a visible banner and are excluded from search indexing until the numbers are measured, so unverified figures never circulate as though they were measurements.',
    },
  ],
};

export const contactPage: StaticPage = {
  seo: {
    title: 'Contact FieldChecked',
    description:
      'Corrections, benchmark requests and questions about methodology. Tell us which model, which card and which runtime, and we will queue it.',
    keywords: ['fieldchecked contact', 'benchmark request'],
    canonical: '/contact/',
  },
  heading: 'Contact',
  intro:
    'Corrections are the most useful message you can send. Benchmark requests are the second most useful.',
  sections: [
    {
      type: 'list',
      heading: 'What to include in a benchmark request',
      style: 'unordered',
      items: [
        'The exact model and parameter count, e.g. Qwen3 14B rather than "Qwen"',
        'The quantisation you care about — Q4_K_M and Q8_0 behave very differently',
        'The GPU, including VRAM capacity',
        'The runtime you use, and its version if you know it',
        'The context length you actually work at, not the maximum the model supports',
      ],
    },
    {
      type: 'prose',
      heading: 'Corrections',
      body: [
        'If a figure here does not match what you measure, send the conditions you ran under. Discrepancies are usually quantisation format, context length or runtime version, and tracking down which one is the interesting part.',
      ],
    },
  ],
};
