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
| 2026-08-12 | Site built and deployed. 18 seed pages across 6 pillars; 6 published, 12 draft/noindex pending fact-check. | Nothing yet — this establishes the zero baseline. | GSC impressions, clicks, indexed pages, average position. Expect flat for 2–4 weeks. | _pending_ |

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
| 2026-08-12 | Seed content ships with 12 of 18 pages as `status: 'draft'` (noindex, excluded from sitemap) because their figures are placeholders pending rig verification. | Publishing unverified numbers would poison the site's only real asset. Withholding them costs indexation in the short term and costs nothing later. | Indexed page count should equal published page count, not total page count. Flip pages to published as Checkpoint 2 clears them. | _pending_ |
| 2026-08-12 | Robots is permissive to AI crawlers. | Citation by AI assistants is the thing being measured; blocking the crawlers that produce citations would remove the variable. | Referral traffic and citation appearances from assistant surfaces. | _pending_ |
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
| _(none yet — the 6 pages live at launch were never drafts)_ | | | |
