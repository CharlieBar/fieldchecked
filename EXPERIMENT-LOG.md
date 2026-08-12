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

## Entries

<!--
Copy this row for each change:

| YYYY-MM-DD | What changed, specifically enough to reverse | What you expect and why | The single metric that would show it | _pending_ |
-->

| Date | Change made | Hypothesis | Metric to watch | Result |
|---|---|---|---|---|
| 2026-08-12 | Seed content ships with 12 of 18 pages as `status: 'draft'` (noindex, excluded from sitemap) because their figures are placeholders pending rig verification. | Publishing unverified numbers would poison the site's only real asset. Withholding them costs indexation in the short term and costs nothing later. | Indexed page count should equal published page count, not total page count. Flip pages to published as Checkpoint 2 clears them. | _pending_ |
| 2026-08-12 | Robots is permissive to AI crawlers. | Citation by AI assistants is the thing being measured; blocking the crawlers that produce citations would remove the variable. | Referral traffic and citation appearances from assistant surfaces. | _pending_ |
