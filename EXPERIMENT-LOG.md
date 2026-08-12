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

The 12 draft pages, ranked by the commercial intent of their target query. Work
the queue top-down: high-intent pages generate Search Console signal fastest, so
they should be the first content indexed. **Do not reorder this list for
convenience** — the ordering is the experiment. Promote at most 2–3 per week (see
the release procedure in `CLAUDE.md`), each in its own commit, each logged below.

### Tier 1 — high-intent buying decisions

| # | Page | Target query | What unblocks it | Hardware needed |
|---|---|---|---|---|
| 1 | `/guides/best-gpu-for-local-llm-inference-2026/` | best gpu for local llm inference 2026 | Verify the tier table's price and capacity claims; the throughput figures it cites live on the pages below | none (cites others) |
| 2 | `/vs/rtx-4080-super-vs-rtx-3090/` | rtx 4080 super vs rtx 3090 | Depends on #4 and #5 measurements | 4080 Super + 3090 |
| 3 | `/vs/rtx-5070-ti-vs-rtx-3090/` | rtx 5070 ti vs rtx 3090 | Depends on #5 and #6 measurements | 5070 Ti + 3090 |
| 4 | `/reviews/rtx-4080-super-local-llm/` | rtx 4080 super local llm | 3 rows on the rig | **owned — verifiable today** |
| 5 | `/reviews/rtx-3090-used-local-llm/` | used rtx 3090 local llm | 3 rows | 3090 (not owned) |
| 6 | `/reviews/rtx-5070-ti-local-ai/` | rtx 5070 ti local ai | 3 rows | 5070 Ti (not owned) |

### Tier 2 — mid-intent research

The brief's tier 2 was "mid-intent guides", but the only draft guide is a
buying guide, which belongs in tier 1. The mid-intent band is occupied by the
`/verdict/` pages instead — "is X worth it" and "[product] reddit" are research
queries that precede a purchase. **Flagging this as an interpretation**, not a
silent reorder.

| # | Page | Target query | What unblocks it | Hardware needed |
|---|---|---|---|---|
| 7 | `/verdict/is-the-rtx-3090-still-worth-it/` | is rtx 3090 still worth it reddit | Replace 4 landing-page sources with deep links to specific threads | **none — no rig time** |
| 8 | `/verdict/rtx-5080-local-ai-reddit/` | rtx 5080 local ai reddit | Same: 4 real thread links | **none — no rig time** |
| 9 | `/verdict/strix-halo-128gb-local-llm/` | strix halo local llm | Same: 4 real thread links | **none — no rig time** |

### Tier 3 — long-tail model-specific benchmarks

| # | Page | Target query | What unblocks it | Hardware needed |
|---|---|---|---|---|
| 10 | `/benchmarks/qwen3-14b/` | qwen3 14b tokens per second | 5 rows; 2 are 4080 Super | partial — 2/5 owned |
| 11 | `/benchmarks/gemma-3-27b/` | gemma 3 27b benchmark | 4 rows; 1 is 4080 Super | partial — 1/4 owned |
| 12 | `/benchmarks/llama-3-3-70b/` | llama 3.3 70b tokens per second | 4 rows; 2 need a dual-3090 rig | partial — 1/4 owned |

### Blockers found while building this queue

**The seed content assumes a hardware fleet we do not have.** Pending rows claim
measurements on four configurations — RTX 4080 Super 16GB, RTX 3090 24GB,
RTX 3090 24GB ×2, and RTX 5070 Ti 16GB — while the rig documented on `/about/`
is a single RTX 4080 Super with multi-GPU expansion in progress. Only the
4080 Super rows can ever be marked `measured` as things stand. For the rest the
options are: buy or borrow the hardware, re-tag the rows `community-reported`
with a linked source, or delete them. **Do not leave them pending indefinitely** —
a permanently-draft page is a page that never enters the experiment.

**Consequence for ordering:** the fastest page to fully verify is #4 (owned
hardware) and the three cheapest are #7–#9 (no rig time at all, just source
collection). Intent ordering says publish #1–#3 first, but #1–#3 depend on
measurements from #4–#6. The queue above is left in intent order as instructed;
the practical first move is #4, which unblocks #2 and contributes to #1.

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

### Promotion log

One row per page moved from `draft` to `published`. The dates are data — this
table is the publish-cadence-vs-indexing-speed experiment.

| Date | URL | Rows moved to `measured` | Days to first GSC impression |
|---|---|---|---|
| _(none yet — the 6 pages live at launch were never drafts)_ | | | |
