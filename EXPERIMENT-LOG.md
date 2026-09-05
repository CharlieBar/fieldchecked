# EXPERIMENT-LOG.md

One entry per change. The point of this file is that in three months you can tell
which changes moved anything and which were superstition.

**Format:** `Date | Change made | Hypothesis | Metric to watch | Result (fill in after 7–14 days)`

**Rules that keep the log worth reading:**

- One variable per entry where possible. Two changes shipped the same day to the
  same page cannot be attributed afterwards.
- Fill in `Result` even when the answer is "no detectable change" — a null result
  is the most common outcome and the easiest to quietly skip.
- Review weekly, not daily. Daily Search Console fluctuation is mostly noise.
- Log removals too. Taking FAQ schema off a page is an experiment.

---

## Baseline

| Date | Change made | Hypothesis | Metric to watch | Result |
|---|---|---|---|---|
| 2026-08-12 | Site built and deployed. 18 seed pages across 6 pillars; 6 published, 12 draft/noindex pending fact-check. | Nothing yet — this establishes the zero baseline. | GSC impressions, clicks, indexed pages, average position. Expect flat for 2–4 weeks. | **Read 2026-09-05, window 08-13 to 09-03.** 66 impressions, 0 clicks, average position 17.7, 11 pages indexed. Not flat — impressions began the day after sitemap submission and ran continuously. Zero clicks is the arithmetic of page 2, not a content signal: 66 impressions at a page-2 CTR under 1% has an expected value below one click. |

**Before the first post ships:** wire Google Search Console and analytics
(GA4 or Plausible) so the zero baseline is genuinely captured. A baseline
reconstructed after the fact is not a baseline.

---

## Open questions this site exists to answer

Each of these becomes a series of log entries rather than a single one.

1. **Does stacked schema change anything?** Every page currently carries
   Article/Review + BreadcrumbList + FAQPage, with ItemList on `/vs/` and Dataset
   on `/benchmarks/`. The planned test is to hold a matched subset at minimal
   schema and compare. Treat vendor claims about listicle citation share as a
   hypothesis to test here, not as established fact.
2. **Do quick-answer blocks get extracted?** Every page has one in the first
   screen. Watch for AI assistant citations and featured snippets on pages whose
   quick answer matches the query closely.
3. **Original data vs curated synthesis.** `/benchmarks/` is firsthand
   measurement; `/verdict/` is sourced community consensus. Both live in one GSC
   property specifically so the two content types can be compared directly.
4. **Freshness cadence.** Benchmark and comparison pages are on a 7–14 day update
   cycle. Does an update signal measurably slow ranking or citation decay, and
   over what horizon?
5. **Publishing velocity.** Fixed 2–3 posts/week for the first 4–6 weeks to get a
   clean baseline, then vary it deliberately. Do not burst-publish early —
   attribution is lost the moment 20 pages ship on one day.
6. **Which checkpoints actually catch errors?** Tracked separately in the pipeline
   ledger (`npm run pipeline:log -- --report`). This is the finding most likely to
   transfer to the production business sites.

---

## Verification queue

Ranked by the commercial intent of the target query. Work top-down; promote at
most 2–3 per week (see the release procedure in `CLAUDE.md`), each in its own
commit, each logged in the promotion table below. **Do not reorder for
convenience** — the ordering is the experiment.

Re-ranked 2026-08-12 after the hardware record was corrected and the phantom
rows retargeted. Every remaining `pending-verification` row now names a GPU in
the inventory, so every page below is verifiable with hardware on hand — which
was not true of the previous queue.

### Tier 1 — high-intent buying decisions

| # | Page | Target query | Rows to measure | Hardware |
|---|---|---|---|---|
| 1 | `/guides/best-gpu-for-local-llm-inference-2026/` | best gpu for local llm inference 2026 | none of its own; cites the pages below | — |
| 2 | `/vs/rtx-4070-ti-super-vs-rtx-4060/` | rtx 4070 ti super vs rtx 4060 | 3 | 4070 Ti Super + 4060 |
| 3 | `/vs/rtx-4080-super-vs-rtx-4070-ti-super/` | rtx 4080 super vs 4070 ti super | 4 | 4080 Super + 4070 Ti Super |
| 4 | `/reviews/rtx-4060-local-llm/` | rtx 4060 local llm | 3 | 4060 |
| 5 | `/reviews/rtx-4070-ti-super-local-ai/` | rtx 4070 ti super local llm | 3 | 4070 Ti Super |
| 6 | `/reviews/rtx-4080-super-local-llm/` | rtx 4080 super local llm | 3 | 4080 Super |

### Tier 2 — mid-intent research

The brief's tier 2 was "mid-intent guides", but the only draft guide is a buying
guide, which belongs in tier 1. The mid-intent band is occupied by the
`/verdict/` pages instead — "is X worth it" and "[product] reddit" are research
queries that precede a purchase. **Flagged as an interpretation, not a silent
reorder** — confirmed as correct in handoff #2 and retained.

These need no rig time at all. They are blocked on replacing landing-page
sources with deep links to specific threads, which is reading work.

| # | Page | Target query | Blocked on |
|---|---|---|---|
| 7 | `/verdict/is-the-rtx-3090-still-worth-it/` | is rtx 3090 still worth it reddit | 4 real thread links |
| 8 | `/verdict/rtx-5080-local-ai-reddit/` | rtx 5080 local ai reddit | 4 real thread links |
| 9 | `/verdict/strix-halo-128gb-local-llm/` | strix halo local llm | 4 real thread links |

These three cover hardware we do not own, which is legitimate: a `/verdict/`
page is explicitly community synthesis, not our measurement. That separation is
why they survived the retargeting unchanged.

### Tier 3 — long-tail model-specific benchmarks

| # | Page | Target query | Rows to measure | Hardware |
|---|---|---|---|---|
| 10 | `/benchmarks/qwen3-14b/` | qwen3 14b tokens per second | 5 | all three |
| 11 | `/benchmarks/gemma-3-27b/` | gemma 3 27b benchmark | 3 | all three |
| 12 | `/benchmarks/llama-3-3-70b/` | llama 3.3 70b tokens per second | 3 | all three |

### Vertical B — not in the queue above

`/builds/`, `/studio/` and `/experiments/` are gated on artifacts rather than
rig time, so they do not compete for the same resource and are sequenced
separately:

- `/builds/wordpress-mcp-server-claude-code/` — needs the repo published and the
  edit transcript captured.
- `/studio/comfyui-infographic-pipeline/` — needs at least one real sample asset
  committed under `/public`. The validator blocks publication until the file
  exists.
- `/experiments/faq-schema-ai-citations/` — a structural placeholder. Cannot be
  published until this site has Search Console data, which requires the Vertical A
  pages to be indexed first. It is deliberately last.

### Vertical B content queue

Added 2026-08-29. Sequenced separately from the verification queue above because
these are gated on artifacts and elapsed time rather than rig time, so they do
not compete for the same resource.

**Ready to publish — firsthand, already happened, no further input needed:**

| # | Page | Target query | Gated on |
|---|---|---|---|
| B1 | `/blog/github-actions-no-checks-on-bot-pull-requests/` | github actions not running on pull request | nothing — publishable at Checkpoint 3 |
| B2 | `/blog/analytics-that-was-never-running/` | analytics not tracking / env var missing at build | nothing — publishable at Checkpoint 3 |

Both document failures that occurred in this repository, with commits and
before/after served HTML as evidence. B1 is the strongest search target in the
set: a real, recurring problem whose existing answers are scattered across
GitHub issues.

**Pre-registered — method fixed, no data yet:**

| # | Page | Gated on |
|---|---|---|
| B3 | `/experiments/ai-coding-agents-same-task/` | running the identical task through each agent |
| B4 | `/experiments/which-ai-subscription-earns-its-keep/` | a 30-day contemporaneous usage log |

B3 and B4 are deliberately empty of findings. Both were written method-first so
the analysis cannot be shaped around the outcome, and both carry the same
`dataPoints: []` block the validator refuses to publish. **Neither may be filled
in from recollection** — that is the specific failure each method exists to
replace.

**Not yet drafted:**

- A piece on the provenance type system, and one on the publish-cadence guard.
  Both have their artifacts already in this repo; neither is written.

The three original Vertical B seeds and their blockers are listed in the section
immediately above; they are not repeated here.

### Deliberately not a news section

Considered and rejected 2026-08-29: a running feed of new open-source model and
tooling releases. Rejected on three grounds, recorded so the question does not
get reopened by default.

1. **It cannot be field-checked.** Reporting a release means republishing
   vendor-claimed figures, which is the exact category the provenance rules
   exist to quarantine.
2. **It is a speed race this site loses by construction.** One operator cannot
   beat established outlets to a release, and the traffic decays to nothing.
3. **It would contaminate the measurement.** News has different query patterns
   and decay curves from evergreen commercial-intent pages, and mixing them into
   the same properties adds a large noisy variable to every reading.

The retained version is news as an angle on firsthand testing — a release is the
hook, a measurement on owned hardware is the payload — which keeps the timeliness
without spending the brand on it.

### Practical sequencing note

Intent order says publish #1–#3 first, but #1–#3 restate measurements that live
on #4–#6. One measurement session per card produces rows for its review, both
comparisons it appears in, and all three benchmark pages — so the *measurement*
work groups by hardware while the *publication* order stays intent-ranked.

---

## Entries

<!--
Copy this row for each change:

| YYYY-MM-DD | What changed, specifically enough to reverse | What you expect and why | The single metric that would show it | _pending_ |
-->

| Date | Change made | Hypothesis | Metric to watch | Result |
|---|---|---|---|---|
| 2026-08-12 | Seed content ships with 12 of 18 pages as `status: 'draft'` (noindex, excluded from sitemap) because their figures are placeholders pending rig verification. | Publishing unverified numbers would poison the site's only real asset. Withholding them costs indexation in the short term and costs nothing later. | Indexed page count should equal published page count, not total page count. Flip pages to published as Checkpoint 2 clears them. | **CONFIRMED 2026-09-05.** Google found 10 of the draft pages and excluded every one of them under `Excluded by 'noindex' tag`. Zero drafts indexed. The structural exclusion — noindex plus sitemap omission, driven off the `status` field — is verified in production, not just in a local build. |
| 2026-08-12 | Robots is permissive to AI crawlers. | Citation by AI assistants is the thing being measured; blocking the crawlers that produce citations would remove the variable. | Referral traffic and citation appearances from assistant surfaces. | _pending_ — no assistant referrals at 2026-09-05, which is uninformative while organic clicks are zero. Not readable until the site earns page-1 positions. |
| 2026-08-12 | Canonical origin set to `https://fieldchecked.netlify.app`; brand and origin consolidated behind a single `BRAND` constant in `site.ts`, enforced by a CI guard. | A domain move later should be a one-line edit, not a grep-and-pray. | No functional metric — verified by the guard, which fails the build if either value is duplicated anywhere else. | n/a — structural |
| 2026-08-12 | Publish cadence capped at 3 pages per release, enforced in CI (`scripts/lib/release-guards.mjs`). | A 12-URL index burst would make it impossible to attribute a ranking change to any single page, destroying the first experiment cycle. Staggered release doubles as the cadence-vs-indexing-speed test. | Time from merge to first impression, per page. With staggered releases this is measurable per URL; with a burst it is not. | _pending_ |
| 2026-08-13 | Site deployed to Netlify (project `fieldchecked`) and verified in Search Console as a URL-prefix property on `https://fieldchecked.netlify.app/`. Ownership proved by HTML file (`public/google8d5146ff706a0f2a.html`), with the meta tag live as a second method. | No ranking hypothesis — this is the instrument, not an experiment. Until GSC is collecting, every later entry has no metric to read. | Impressions, clicks and indexed-page count begin accumulating from this date. The zero baseline is now genuinely captured rather than reconstructed. | Sitemap submitted and read the same day: **Success, 18 discovered** — matching the build exactly. Confirms in production that the 15 drafts are excluded structurally by `status`, not just in local builds. Day 0 for the promotion log's time-to-impression column. |
| 2026-08-13 | Plausible analytics wired site-wide as plain `<script>` tags in `<head>` — not `next/script`, which would pull its own runtime into the bundle. Measured: per-route JS unchanged at 210 B, First Load unchanged at 106 kB. **Corrected 2026-08-13** to Plausible's current issued snippet: per-site script ID in the URL rather than shared `script.js` + `data-domain`, plus the inline init that buffers events fired before the async script lands. Env var renamed `PLAUSIBLE_DOMAIN` → `PLAUSIBLE_SCRIPT_ID`, since the domain is no longer passed to the script at all. JS bundle unchanged by the correction; page HTML grew 411 B. **Second correction 2026-08-13:** live view-source showed neither the analytics script nor the GSC meta tag was rendering in production — the Netlify env vars never reached the build, and nothing errored. Both values are public by construction, so both are now committed in `layout.tsx`, with analytics gated on Netlify's own `CONTEXT === 'production'` rather than on a variable someone has to set. Search Console verification was never at risk only because the HTML-file method is committed to the repo. | GSC and Plausible answer different halves of the same question and neither substitutes for the other. GSC covers everything up to the click — impressions, queries, position — and goes silent at the moment of arrival. Plausible covers everything after it. A page can win impressions and lose readers, or the reverse, and only both instruments together distinguish those. | Sessions, entry pages, and bounce/engagement per pillar, read against GSC impressions for the same URLs. | **Confirmed working end to end 2026-08-13.** Tags verified in live view-source, then first pageview confirmed landing in Plausible (1 visitor, 2 pageviews). Analytics and Search Console are both live, so the zero baseline is captured by both instruments from this date. |

### Hardware record correction — 2026-08-12

`/about/` documented a single RTX 4080 Super. The real inventory is three cards:
**RTX 4080 Super 16GB, RTX 4070 Ti Super 16GB, RTX 4060 8GB**. That list now
lives in `site.hardwareInventory` in `site.ts`, is rendered on `/about/` from
that same array, and is enforced: a `pending-verification` row naming a GPU
outside it fails the build.

Twenty-two pending rows claimed measurements on hardware that was never going to
exist. Disposition of every one:

| Was | Rows | Action | Now |
|---|---|---|---|
| RTX 5070 Ti 16GB | 4 | **Retargeted** | RTX 4070 Ti Super 16GB |
| RTX 3090 24GB | 4 | **Retargeted** | RTX 4080 Super / 4070 Ti Super / 4060 |
| RTX 3090 24GB ×2 | 4 | **Deleted** | — no multi-GPU rig exists |
| RTX 4080 Super 16GB | 10 | Kept | unchanged |

Two review pages and two comparison pages were about cards we do not own, so
retargeting rows alone would have left the surrounding copy incoherent. They
were rewritten onto owned hardware and their URLs changed:

| Old URL | New URL |
|---|---|
| `/reviews/rtx-3090-used-local-llm/` | `/reviews/rtx-4060-local-llm/` |
| `/reviews/rtx-5070-ti-local-ai/` | `/reviews/rtx-4070-ti-super-local-ai/` |
| `/vs/rtx-4080-super-vs-rtx-3090/` | `/vs/rtx-4080-super-vs-rtx-4070-ti-super/` |
| `/vs/rtx-5070-ti-vs-rtx-3090/` | `/vs/rtx-4070-ti-super-vs-rtx-4060/` |

No redirects are needed: all four were `draft`/noindex and never indexed.

**Why the multi-GPU rows were deleted rather than retagged.** The alternative
was `community-reported` with a deep-link source. Producing a real deep link
requires reading real threads, and inventing one to satisfy the rule would be
precisely the failure the rule exists to prevent. Deleting is the honest option;
the rows can return as `community-reported` when someone has actually sourced
them.

The three cards form a ladder — 8GB, then two 16GB cards at different bandwidth —
which maps onto the highest-intent query in the queue. That is a better spine for
the content than the original scattered lineup, and it is fully verifiable.

### No-intervention window — 2026-08-13 to 2026-09-03

**No SEO interventions of any kind before 2026-09-03.** No title rewrites, no
schema changes, no internal-linking edits, no "quick fixes" to pages that look
underperforming. Content may be *verified and promoted* on the normal cadence —
that is the planned variable — but nothing already published gets changed.

**A flat line during this window is the expected and correct reading, not a
fault to debug.** Six indexable pages on a three-week-old origin produce almost
no data by construction. The baseline was captured cleanly on 2026-08-13; the
only way to lose it is to start changing things in week two because the graph
looks empty.

That impulse is the actual failure mode this entry exists to head off. It will
feel like diligence. It is contamination: every change made inside the window
becomes a confound that cannot be separated afterwards from the natural
indexing curve, and the first clean attribution cycle is gone. If a change feels
urgent before 2026-09-03, the process is to write it down here as a dated
proposal and ship it *after* the window, not to ship it and log it later.

The one exception is a genuine defect — a page 404ing, a canonical pointing at
the wrong origin, a validator failure reaching production. Fixing breakage is
not an intervention. Improving performance is.

### First reading — 2026-09-05

The no-intervention window closed on 09-03. This is what 23 days of a clean
baseline produced, recorded before anything was changed in response to it.

| Metric | Value |
|---|---|
| Impressions | 66 |
| Clicks | 0 |
| Average position | 17.7 |
| Indexed | 11 of 18 sitemap URLs |
| Discovered, not indexed | 7 |
| Drafts excluded by `noindex` | 10 |
| Plausible visitors (28d) | 4, all direct |

**The mechanism works; the coverage does not yet.** Indexing reached 11 pages on
the day the sitemap was submitted, impressions started the following day, and
individual pages hold positions of 5 and 8 — so discovery, rendering, canonicals
and the sitemap are all functioning. But see the indexing breakdown below before
reading that as success: two thirds of the published articles have not been
crawled at all.

**Zero clicks is arithmetic, not a content signal.** Average position 17.7 is
page two, where click-through runs well under one percent. Sixty-six impressions
at that rate has an expected value below a single click, so zero is the ordinary
outcome rather than evidence about the writing. This is the exact number that
would have triggered a week-two rewrite if the no-intervention window had not
been in place, and the rewrite would have been made against noise.

**Indexing plateaued immediately, and the plateau is misleading.** Eleven pages
on day one, unchanged for fifteen days. The headline number flatters the site:

| | |
|---|---|
| Indexed | 11 |
| — of which hub and static pages | 9 |
| — of which actual articles | **2** |
| Published articles not indexed | **4 of 6** |

The indexed set is `/`, `/about/` and seven pillar hubs, plus two blog posts.
Every published guide, the published comparison, and one of three blog posts are
absent.

**A hypothesis recorded on 2026-09-05 was refuted the same day.** The first
reading guessed that the seven unindexed URLs were thin hub pages whose listings
are mostly drafts. The URL list says the opposite: the hubs are exactly what got
indexed, and the articles are what did not. Recorded rather than quietly
corrected, because a log that only preserves the guesses that survived is not
evidence of anything.

**The actual cause is visible in one column.** All seven show
`Last crawled = N/A`. They have never been fetched — this is not an assessment
of quality, it is a queue that has not been reached. On a three-week-old domain
with no backlinks that is ordinary crawl scheduling, and it is a different
problem from thin content with a different remedy.

**The strongest signal is where the impressions landed.** `/benchmarks/` took 18
impressions at position 11.7 while carrying no measured data at all, second only
to a published blog post. One of the three named queries was
`qwen3.8-27b dgx spark tokens per second`, at position 5 — a model-plus-hardware
throughput query, which is precisely the shape the benchmark pillar was built
for. Demand for that query class is now observed rather than assumed, and it
argues for rig time above every other kind of work.

**Search appearance is empty.** No rich results of any kind recorded. Too early
and too low-authority to read as evidence about stacked schema, but it is the
first data point in that series and it is not nothing.

### Next intervention — request indexing on the four uncrawled articles

The window closed on 09-03, so interventions are now in process rather than out
of it. This is the first one, and it is deliberately the smallest thing that
addresses the finding.

Four published articles have never been crawled:

- `/blog/quantization-tradeoffs-explained/`
- `/guides/how-to-run-qwen3-locally/`
- `/guides/multi-gpu-setup-for-local-ai/`
- `/vs/ollama-vs-lm-studio/`

**Action:** request indexing for each through URL Inspection, one at a time, and
record the date. Then record days-to-index per URL.

**Why this and not a content change.** The pages have not been assessed, so there
is nothing yet to respond to. Rewriting a page Google has never fetched is
changing a variable that has not been tested, and it would destroy the ability to
attribute whatever happens next. Fetching is the missing step; supply that first,
then read the result.

**What this measures.** Time from manual index request to indexation, on a site
whose ordinary crawl rate is currently zero for these URLs. That is a usable data
point for every future page, and it feeds the publish-cadence question directly:
if manual requests are what moves pages into the index at this authority level,
cadence is bounded by attention rather than by writing throughput.

**Also worth watching:** `/blog/` and `/vs/` hubs are themselves unindexed while
the other seven hubs are indexed. If the two unindexed hubs are the ones whose
listed articles are also unindexed, that suggests hub indexation and article
indexation are moving together rather than independently — recorded as an
observation to check next reading, not as a conclusion.

### Plausible: decision due before 2026-09-12

The trial lapses in seven days. The data now says what it is buying: **4 visitors
in 28 days, every one of them direct, and zero organic clicks to measure the
behaviour of.** Post-click analytics has nothing to observe while the click count
is zero, and Search Console reports impressions and position for free
indefinitely.

Recommendation is to **let it lapse and log the gap deliberately**, rather than
pay to record zero. The tag stays in the codebase behind its existing production
gate, so resuming is a subscription, not a code change.

**Trigger to resubscribe:** the first organic click, or any page with real
impressions reaching page one. Either means there is post-click behaviour worth
measuring, and at that point the gap in continuity starts costing something.

This is a decision, not a foregone conclusion — it is recorded here either way,
because discovering the account lapsed unnoticed is the outcome worth avoiding.

### Calendar risk — Plausible trial ends ~2026-09-12

The Plausible account started on 2026-08-13 as a 30-day trial, so it lapses
around **2026-09-12** — nine days *after* the no-intervention window closes,
which is precisely when the data starts being worth reading. If it lapses
unnoticed, analytics stops and the post-click half of the instrument goes dark
during the first period that has any traffic in it.

A gap here is not recoverable after the fact: unlike Search Console, which
backfills nothing but keeps collecting regardless, a lapsed Plausible account
simply stops recording. Decide on a plan before that date, or deliberately
accept the gap and log it here as a decision rather than discovering it later
as an anomaly in the numbers.

### Discovered vs. indexed — recurring tracked metric

| Date | Discovered | Indexable (in sitemap) | Indexed | Notes |
|---|---|---|---|---|
| 2026-08-13 | 18 | 6 | 0 | Baseline. Sitemap read same-day, `Success, 18 discovered`. Indexed count starts at zero by definition. |
| 2026-09-05 | 18 | 6 | **11** (of which only **2 are articles**) | 11 of 18 sitemap URLs indexed, but 9 of those 11 are hub and static pages. Only 2 of the 6 published articles are indexed. The other 7 URLs sit at `Discovered - currently not indexed` with **Last crawled = N/A** — never fetched, not assessed and rejected. Separately, 10 draft pages were found and correctly excluded by `noindex`. |

**Why this is tracked from day one:** the lag between *discovered* and *indexed*
is the cheapest early signal available and it starts producing data weeks before
any ranking does. It reports on the technical setup rather than on the content —
whether the sitemap, canonicals, schema and render path are doing their job. If
pages sit discovered-but-not-indexed for weeks, that is a crawl or quality
signal worth acting on; if they index quickly, the plumbing is sound and any
later ranking problem is a content problem.

Note the 18/6 gap is expected, not a defect: 12 of the discovered URLs are hub
and static routes. The 15 drafts are absent from both columns by design.

**Record a row on every draft promotion from here on**, alongside the promotion
log below, so time-to-index can be attributed per page.

### Search Console property structure

All eight properties are **live as of 2026-08-13**, created before any further
content shipped — so no pillar has a window of history missing from its own
property. Retroactive creation does not backfill, so this was the cheapest it
was ever going to be.

Creation was done by hand: a Search Console property requires an interactive
Google session, which nothing in this repo can do. Recorded here on the site
owner's confirmation, the same standard the data rules apply to `measured` rows —
a human states it, not a script.

| Property | Vertical | Status |
|---|---|---|
| `https://fieldchecked.netlify.app/` | root — both | **verified 2026-08-13** |
| `https://fieldchecked.netlify.app/reviews/` | A | created 2026-08-13 |
| `https://fieldchecked.netlify.app/vs/` | A | created 2026-08-13 |
| `https://fieldchecked.netlify.app/benchmarks/` | A | created 2026-08-13 |
| `https://fieldchecked.netlify.app/verdict/` | A | created 2026-08-13 |
| `https://fieldchecked.netlify.app/builds/` | B | created 2026-08-13 |
| `https://fieldchecked.netlify.app/studio/` | B | created 2026-08-13 |
| `https://fieldchecked.netlify.app/experiments/` | B | created 2026-08-13 |

This makes the never-aggregate-the-two-verticals rule **structural at the
reporting layer** rather than a filter someone has to remember to apply: reading
one number across both verticals now requires deliberately combining two
properties, instead of being the default view. `/guides/` and `/blog/` serve both
verticals and are tagged per page, so they stay in the root property and are
attributed by their `vertical` field rather than by URL.

Ownership is inherited from the verified root property, so no sub-property needs
its own verification.

### Promotion log

One row per page moved from `draft` to `published`. The dates are data — this
table is the publish-cadence-vs-indexing-speed experiment.

| Date | URL | Rows moved to `measured` | Days to first GSC impression |
|---|---|---|---|
| 2026-09-05 | `/blog/github-actions-no-checks-on-bot-pull-requests/` | n/a — explainer, carries no numeric rows | _pending_ |
| 2026-09-05 | `/blog/analytics-that-was-never-running/` | n/a — explainer, carries no numeric rows | _pending_ |
