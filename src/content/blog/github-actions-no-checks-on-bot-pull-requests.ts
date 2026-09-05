import type { BlogContent } from '@/types/content';

export const post: BlogContent = {
  slug: 'github-actions-no-checks-on-bot-pull-requests',
  status: 'published',
  vertical: 'B',
  datePublished: '2026-09-05',
  category: 'explainer',
  readingTimeMinutes: 6,

  seo: {
    title: 'Your CI Does Not Run on Bot-Opened Pull Requests',
    description:
      'A pull request opened by a workflow using the default GITHUB_TOKEN triggers no further workflows. There is no failing check — there is no check at all. Here is the fix.',
    keywords: [
      'github actions not running on pull request',
      'github actions bot pr no checks',
      'github_token does not trigger workflow',
      'workflow not triggered by workflow',
      'github actions recursion prevention',
    ],
    canonical: '/blog/github-actions-no-checks-on-bot-pull-requests/',
  },

  hero: {
    eyebrow: 'Explainer',
    headline: 'Your CI Does Not Run on Bot-Opened Pull Requests',
    subheadline:
      'GitHub suppresses workflow runs for PRs opened with the default token. The check does not fail — it never appears.',
    lastUpdated: '2026-09-05',
  },

  quickAnswer:
    'A pull request opened by a GitHub Actions workflow using the default GITHUB_TOKEN does not trigger any further workflow runs. GitHub suppresses them deliberately, to stop a workflow that opens a PR from triggering a workflow that opens a PR. The consequence is that an `on: pull_request` validator never runs on automated PRs, and because no run is queued there is no red check to notice — the pull request simply shows nothing. This fails open, which is the dangerous direction. The fix is to add a `push` trigger scoped to all branches, so the validator runs against the commit regardless of who pushed it or whether a PR exists. Using a personal access token or a GitHub App token also restores the trigger, and keeping both is deliberate redundancy rather than duplication.',

  sections: [
    {
      type: 'prose',
      heading: 'What actually happens',
      body: [
        'GitHub will not let a workflow run trigger another workflow run when the first one authenticated with the automatically provided `GITHUB_TOKEN`. The rule exists for a good reason: without it, a workflow that opens a pull request on every push would trigger itself indefinitely, and the platform would be trivially easy to turn into a fork bomb.',
        'The rule is applied by suppressing the downstream event, not by failing it. Nothing is logged on the pull request, no run appears in the Actions tab for it, and the checks area shows an absence rather than a problem. If you are looking for a red X you will not find one, because there is nothing there to be red.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'This fails open, which is the wrong direction',
      body: 'A broken validator that errors is a nuisance. A validator that silently does not run is worse, because the pull request looks exactly like one that passed. Every automated PR merges with no verification, and the first evidence is whatever reaches production.',
    },
    {
      type: 'prose',
      heading: 'Why it bites automated pipelines hardest',
      body: [
        'The irony is precise: the pull requests most in need of an automated check are the ones that receive none. A human opening a PR gets the full validator. A generated PR — the case where nobody has read every line, and where a model may have invented a number or broken an invariant — gets nothing.',
        'On this site the validator exists specifically to catch what a rubber-stamped human review misses. Discovering that it never ran on pipeline-authored pull requests meant the one class of change it was designed for was the one class it did not cover.',
      ],
    },
    {
      type: 'steps',
      heading: 'The fix',
      steps: [
        {
          title: 'Add a push trigger scoped to every branch',
          body: 'Keep `pull_request`, and add `push: branches: [\'**\']`. The push event is not suppressed, so the workflow runs against the commit regardless of who created it or whether a pull request exists at all.',
        },
        {
          title: 'Do not add an actor filter',
          body: 'An `if: github.actor != \'github-actions[bot]\'` guard looks like tidiness and reopens the hole precisely for the actor you most need to check. Same for filtering by branch name prefix.',
        },
        {
          title: 'Set fetch-depth: 0 if anything diffs against the base',
          body: 'A shallow checkout cannot resolve a merge base. Any guard that compares against the base branch will silently skip rather than fail, which is the same failure mode one layer down.',
        },
        {
          title: 'Consider a PAT or GitHub App token for the opener',
          body: 'Either restores the normal trigger behaviour. Keep the push trigger anyway — when both fire the duplication is cheap, and it means the coverage does not depend on which token the pipeline happened to use that day.',
        },
      ],
    },
    {
      type: 'prose',
      heading: 'How to confirm it is fixed',
      body: [
        'Do not confirm it by reading the YAML. Push a commit to a branch from a workflow and look at the Actions tab for a run attributed to that commit. The absence you are testing for is invisible in configuration and obvious in the run list.',
        'The same principle applies to the guard behaviour itself: verify by injecting a violation and confirming the build goes red. A validator nobody has ever seen fail is indistinguishable from a validator that cannot fail.',
      ],
    },
    {
      type: 'prose',
      heading: 'The general shape of this bug',
      body: [
        'Platform safety rules tend to be implemented as suppression rather than error, because erroring would break the legitimate cases too. That makes them nearly invisible from inside your own configuration, which looks correct and is correct — it is simply never evaluated.',
        'The defence is to verify against observed behaviour rather than intended configuration. A green build tells you a workflow succeeded. It tells you nothing about a workflow that never started.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Why is my GitHub Actions workflow not running on a pull request?',
      answer:
        'If the pull request was opened by another workflow using the default GITHUB_TOKEN, GitHub suppresses the triggered run to prevent recursion. No run is queued, so no check appears on the pull request at all.',
    },
    {
      question: 'Does GITHUB_TOKEN trigger other workflows?',
      answer:
        'No. Events created using the automatically provided GITHUB_TOKEN do not trigger further workflow runs. This is documented, deliberate, and applies regardless of which event type the downstream workflow listens for.',
    },
    {
      question: 'How do I make CI run on a bot-opened pull request?',
      answer:
        'Add a push trigger covering all branches, so the workflow runs against the commit itself. Alternatively, open the pull request with a personal access token or a GitHub App token, which restores normal trigger behaviour.',
    },
    {
      question: 'Is it safe to use push with branches set to double asterisk?',
      answer:
        'For a validator, yes — it runs on every branch push, which is the coverage you want. The cost is extra runs on branches nobody has opened a PR for, which is usually cheaper than an unverified merge.',
    },
    {
      question: 'Why not just filter out the bot actor?',
      answer:
        'An actor filter removes coverage from exactly the pull requests that most need it. Automated changes are the ones no human has read line by line, so excluding them inverts the purpose of the check.',
    },
    {
      question: 'Why does the pull request show no failing check instead of an error?',
      answer:
        'Because the run is never created. There is nothing to report a status for, so the checks section shows an absence. This is why the problem is usually found late — it looks identical to a clean pull request.',
    },
    {
      question: 'Does this affect required status checks?',
      answer:
        'It can make them unsatisfiable rather than failing, since the required check never reports. Depending on branch protection settings that either blocks the merge confusingly or leaves the requirement unenforced.',
    },
    {
      question: 'What is fetch-depth 0 needed for?',
      answer:
        'Any check that diffs against the base branch needs the history to resolve a merge base. With a shallow clone the comparison cannot be made, and a guard written to skip rather than fail will quietly stop enforcing.',
    },
    {
      question: 'How do I verify the fix actually works?',
      answer:
        'Push from a workflow and confirm a run appears against that commit in the Actions tab, then inject a deliberate violation and confirm the build goes red. Configuration review alone cannot detect a suppressed trigger.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [{ name: 'GitHub Actions', type: 'SoftwareApplication' }],
  },

  related: ['/blog/analytics-that-was-never-running/'],
};

export default post;
