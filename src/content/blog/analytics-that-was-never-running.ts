import type { BlogContent } from '@/types/content';

export const post: BlogContent = {
  slug: 'analytics-that-was-never-running',
  status: 'published',
  vertical: 'B',
  datePublished: '2026-09-09',
  category: 'explainer',
  readingTimeMinutes: 6,

  seo: {
    title: 'The Analytics That Was Never Running',
    description:
      'Every API call succeeded, every build went green, the site served correctly, and the tracking script was not on the page. A note on why success responses are not verification.',
    keywords: [
      'analytics not tracking netlify',
      'environment variable not available at build',
      'plausible script not loading',
      'next.js env var undefined in production',
      'verify analytics is working',
    ],
    canonical: '/blog/analytics-that-was-never-running/',
  },

  hero: {
    eyebrow: 'Explainer',
    headline: 'The Analytics That Was Never Running',
    subheadline:
      'Green builds, successful API writes, a correctly serving site, and zero events. Nothing in the chain reported a problem.',
    lastUpdated: '2026-09-09',
  },

  quickAnswer:
    'Analytics and search-console verification on this site were both gated on build-time environment variables. The variables were written through an API that returned success, the builds went green, and the site served every page correctly — but neither tag appeared in the delivered HTML, because the variables never reached the build. No layer reported an error, so the only way to find it was to read the bytes the server actually sends. The lesson generalises past this one bug: a success response confirms that a request was accepted, not that a system is doing what you believe. Verify against served output, and prefer configuration that cannot silently go missing over configuration that is invisible when it does.',

  sections: [
    {
      type: 'prose',
      heading: 'What the failure looked like from the inside',
      body: [
        'The setup was ordinary. A tracking script and a verification meta tag, both rendered only when their environment variable was present, with the variables set on the host rather than committed. That pattern is widely recommended and it reads as the tidy choice.',
        'Every signal said it worked. The API accepted each write and returned a success message. A later delete call confirmed one of the variables existed by deleting it. The deploy completed, the site served every route, and the pages looked right.',
        'The tags were not there. Not misconfigured, not malformed — absent. The build had run with the variables undefined, taken the branch that renders nothing, and produced a perfectly valid site with no analytics on it.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'The dangerous property is silence, not failure',
      body: 'A conditional that renders nothing when its input is missing cannot fail loudly, because rendering nothing is its designed behaviour. The absent case and the broken case are the same code path, and neither one raises anything.',
    },
    {
      type: 'prose',
      heading: 'Why every check passed',
      body: [
        'Each layer was answering a narrower question than it appeared to. The API confirmed that a write was accepted, not that a build would receive it. The build confirmed that compilation succeeded, not that the output contained anything in particular. The deploy confirmed that files were published, not which files.',
        'Read individually, all three were accurate. Read together, they created a confident impression about something none of them had checked. That gap is where this class of bug lives.',
      ],
    },
    {
      type: 'prose',
      heading: 'The only check that worked',
      body: [
        'Opening the served page and searching the source for the script. That is the whole diagnostic, it takes ten seconds, and it is the only step in the chain that observes the thing you actually care about rather than a proxy for it.',
        'The confirming detail was comparing asset hashes: the deployed page referenced exactly the same JavaScript and CSS bundles as a local build with no variables set. Identical hashes meant the deployed code was current and the inputs were missing — which distinguishes a stale deploy from an absent configuration, two failures that look the same from the dashboard.',
      ],
    },
    {
      type: 'steps',
      heading: 'What to change',
      steps: [
        {
          title: 'Stop treating public values as secrets',
          body: 'A tracking script ID and a site-verification token are served in the HTML of every site using them. They are public by construction. Hiding them in host configuration buys no security and adds a dependency that can vanish without a trace.',
        },
        {
          title: 'Commit the value, gate on something the platform sets itself',
          body: 'Most hosts expose a build context variable — production, preview, branch — that they populate without any dashboard configuration. Gating on that keeps previews clean while removing the thing that went missing.',
        },
        {
          title: 'Verify against served bytes, not settings screens',
          body: 'After any change to build-time configuration, fetch the page and grep for the expected output. A settings screen shows intent; the response body shows reality.',
        },
        {
          title: 'Prefer failure modes that leave evidence',
          body: 'Where a value is genuinely required, throwing at build time is better than rendering nothing. A red build is recoverable in minutes; a silent omission can run for weeks.',
        },
      ],
    },
    {
      type: 'prose',
      heading: 'The redundancy that saved the other half',
      body: [
        'Search Console verification was configured two ways on this site: the meta tag, and a static file committed to the repository. The meta tag never rendered, so verification was resting entirely on the file — which had been added only because keeping a second method is standard advice.',
        'Had the tag been the only method, verification would have failed silently too, and the first notice would have arrived weeks later as an email about lost ownership. Redundancy across mechanisms with different failure modes is worth more than redundancy within one.',
      ],
    },
    {
      type: 'prose',
      heading: 'How long it would have gone unnoticed',
      body: [
        'Indefinitely, in principle. There is no alert for an analytics platform receiving nothing, because receiving nothing is indistinguishable from having no visitors — and a new site genuinely has almost no visitors. The two explanations produce an identical dashboard.',
        'That is the part worth internalising. The failure was not just silent, it was camouflaged by the expected result. Any measurement that reads zero deserves one check that the instrument is connected before the zero is believed.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Why is my analytics script not loading in production?',
      answer:
        'A common cause is a build-time environment variable that never reached the build. If the script tag is rendered conditionally, a missing variable produces a valid page with no tag and no error anywhere in the pipeline.',
    },
    {
      question: 'How do I check whether my tracking script is actually on the page?',
      answer:
        'Fetch the deployed page and search the raw HTML for the script source. Do not rely on the host dashboard, the build log, or the analytics provider — only the served response shows what visitors receive.',
    },
    {
      question: 'Why did the build succeed if the environment variable was missing?',
      answer:
        'Because an undefined variable is a valid value. Conditional rendering treats it as the do-not-render case, which is normal behaviour rather than an error, so compilation and deployment both succeed.',
    },
    {
      question: 'Should analytics IDs be stored in environment variables?',
      answer:
        'Usually not for public values. A tracking ID is visible in the HTML of every site using it, so hiding it adds an invisible dependency without adding security. Commit it and gate rendering on the build context instead.',
    },
    {
      question: 'How do I keep analytics off preview deployments?',
      answer:
        'Gate on the build context variable most hosts set automatically, which identifies production versus preview or branch builds. It requires no configuration, so it cannot be lost the way a manually added variable can.',
    },
    {
      question: 'How can I tell a stale deploy from a missing environment variable?',
      answer:
        'Compare the asset hashes in the deployed HTML against a local build. Matching hashes mean the code is current and the inputs are missing; differing hashes mean the deploy is behind.',
    },
    {
      question: 'Why does zero traffic hide this bug so well?',
      answer:
        'Because a new site legitimately has almost no visitors, an empty dashboard is the expected result. The broken state and the healthy state look identical until the instrument itself is verified.',
    },
    {
      question: 'Is a successful API response enough to confirm a setting applied?',
      answer:
        'No. It confirms the request was accepted by that service. Whether the value reaches a later build, and whether that build uses it, are separate questions that the response cannot answer.',
    },
    {
      question: 'What is the fastest way to prevent this class of bug?',
      answer:
        'Make the required value impossible to omit — commit it, or fail the build when it is absent — and add one post-deploy check that greps the served page for the expected output.',
    },
  ],

  schema: {
    '@type': 'Article',
  },

  related: ['/blog/github-actions-no-checks-on-bot-pull-requests/'],
};

export default post;
