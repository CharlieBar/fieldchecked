/**
 * FieldChecked content contract.
 *
 * Every content file in src/content/ conforms to one of the shapes below.
 * These types are the boundary between content and design: a visual redesign
 * may rewrite anything in src/app/ or src/components/, but must not change
 * this file or anything in src/content/. See CLAUDE.md.
 */

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export interface Seo {
  /** Page title WITHOUT the brand suffix — the layout template appends it. */
  title: string;
  /** 140–165 chars. Written to stand alone in a SERP or an AI citation. */
  description: string;
  keywords: string[];
  /** Site-root-relative path, e.g. "/reviews/rtx-4080-super-local-llm/". */
  canonical: string;
  /** Set only when this page is a deliberate variant of another URL. */
  canonicalOverride?: string;
  /** Blocks indexing — used for thin or intentionally private pages. */
  noindex?: boolean;
  ogImage?: ImageRef;
}

export interface ImageRef {
  src: string;
  /** Descriptive alt text. The QA validator rejects filenames and empties. */
  alt: string;
  width: number;
  height: number;
}

export interface Faq {
  /** Phrased as a real query someone types into Google or an assistant. */
  question: string;
  /** Self-contained answer; must make sense extracted from the page. */
  answer: string;
}

export interface Hero {
  eyebrow: string;
  headline: string;
  subheadline: string;
  /** ISO date (YYYY-MM-DD). Drives the freshness cadence in §4. */
  lastUpdated: string;
  image?: ImageRef;
}

export interface LinkRef {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * A GPU we physically have. This list is the hardware record: /about/ renders
 * it, and the validator refuses to let any row claim a `pending-verification`
 * measurement on a GPU that is not in it. That makes "we planned to measure
 * something on hardware we do not own" a build failure rather than something
 * a reader has to catch.
 */
export interface HardwareUnit {
  /** Canonical name, matched against BenchmarkRow.gpu. e.g. "RTX 4060 8GB". */
  label: string;
  vramGb: number;
  /** What this card is here to represent in the ladder. */
  role: string;
}

/**
 * How much trust a number on this site has earned. One vocabulary for the
 * whole site — there is no second provenance enum anywhere.
 *
 * Nothing may be published as `measured` until it has been reproduced
 * firsthand at Checkpoint 2. Seed and model-drafted content ships as
 * `pending-verification` and renders with a visible caveat.
 *
 * These are declared as runtime arrays with the types derived from them, rather
 * than as bare type unions, so the validator and the type system read the same
 * list. A `types/` file holding a few `const`s is a small oddity; two lists that
 * can drift apart is a bigger one.
 */
export const DATA_STATUSES = [
  /** Reproduced firsthand. Only a human sets this. */
  'measured',
  /** A placeholder that has not been reproduced yet. Blocks publication. */
  'pending-verification',
  /** Someone else's report, with a linked source. */
  'community-reported',
  /** From a spec sheet. True by definition, not by measurement. */
  'vendor-claimed',
  /** A reasoned figure that was never measured — e.g. time saved by a tool. */
  'estimated',
] as const;

export type DataStatus = (typeof DATA_STATUSES)[number];

/**
 * Legal provenance for a throughput row. `estimated` is deliberately excluded:
 * a tokens/sec figure is either measured, someone else's, or a spec claim.
 * There is no honest way to estimate one.
 */
export const BENCHMARK_STATUSES = [
  'measured',
  'pending-verification',
  'community-reported',
  'vendor-claimed',
] as const satisfies readonly DataStatus[];

export type BenchmarkStatus = (typeof BENCHMARK_STATUSES)[number];

/**
 * Legal provenance for a build outcome. The hardware vocabulary has no meaning
 * for a tool written in-house — nobody publishes a spec sheet for your script —
 * so a result is either measured or estimated.
 */
export const BUILD_RESULT_STATUSES = [
  'measured',
  'estimated',
] as const satisfies readonly DataStatus[];

export type BuildResultStatus = (typeof BUILD_RESULT_STATUSES)[number];

export type PublishStatus = 'draft' | 'published';

/**
 * Which vertical a page belongs to.
 *
 *   A — local AI hardware:  /reviews/ /vs/ /benchmarks/ /verdict/
 *   B — AI tooling:         /builds/ /studio/ /experiments/
 *
 * Tagged on every content file so the two can be attributed separately in
 * Search Console. Running them on one domain makes ranking attribution
 * messier, so they must never be evaluated in a single aggregate number.
 * `/guides/` and `/blog/` serve both and are tagged per page.
 */
export type Vertical = 'A' | 'B';

/* ------------------------------------------------------------------ */
/* Body sections (discriminated union rendered by SectionRenderer)      */
/* ------------------------------------------------------------------ */

export interface ProseSection {
  type: 'prose';
  heading?: string;
  /** One string per paragraph. Inline markdown links are supported. */
  body: string[];
}

export interface ListSection {
  type: 'list';
  heading?: string;
  style: 'ordered' | 'unordered';
  items: string[];
}

export interface StepsSection {
  type: 'steps';
  heading?: string;
  steps: { title: string; body: string }[];
}

export interface CalloutSection {
  type: 'callout';
  tone: 'info' | 'warn' | 'win';
  heading: string;
  body: string;
}

export interface SpecsSection {
  type: 'specs';
  heading?: string;
  items: { label: string; value: string }[];
}

export interface TableSection {
  type: 'table';
  heading?: string;
  caption?: string;
  columns: string[];
  rows: TableCell[][];
}

/**
 * A table cell. `delta` colour-codes comparison tables per §5:
 * green = faster/better, amber = slower/worse.
 */
export interface TableCell {
  value: string;
  delta?: 'better' | 'worse' | 'neutral';
  /** Renders the cell in the monospace numeral treatment. */
  numeric?: boolean;
}

export interface BenchmarkSection {
  type: 'benchmark';
  heading?: string;
  note?: string;
  rows: BenchmarkRow[];
}

export interface QuoteSection {
  type: 'quote';
  /** Short attributed line only — never a long verbatim block. */
  text: string;
  attribution: string;
  url?: string;
}

export type Section =
  | ProseSection
  | ListSection
  | StepsSection
  | CalloutSection
  | SpecsSection
  | TableSection
  | BenchmarkSection
  | QuoteSection;

/* ------------------------------------------------------------------ */
/* Benchmark data                                                      */
/* ------------------------------------------------------------------ */

export interface BenchmarkRow {
  gpu: string;
  model: string;
  /** e.g. "Q4_K_M", "FP8", "GGUF Q8_0". */
  quantization: string;
  /** Prompt-processing throughput, tokens/sec. */
  promptTokensPerSec?: number;
  /** Generation throughput, tokens/sec — the headline number. */
  tokensPerSec: number;
  /** Peak VRAM in GB at the tested context length. */
  vramGb?: number;
  contextLength?: number;
  runtime: string;
  status: BenchmarkStatus;
  notes?: string;
}

/* ------------------------------------------------------------------ */
/* Curated-verdict sources                                             */
/* ------------------------------------------------------------------ */

export interface SourceRef {
  /** e.g. "r/LocalLLaMA", "Level1Techs Forum". */
  name: string;
  url: string;
  sentiment: 'positive' | 'negative' | 'mixed';
  /** Our paraphrase of the source's position. Never a verbatim quote. */
  summary: string;
  /** When the source material was published or last read. */
  accessed?: string;
}

export interface ConsensusTheme {
  theme: string;
  supportingSourceCount: number;
  detail?: string;
}

/* ------------------------------------------------------------------ */
/* Schema hints                                                        */
/* ------------------------------------------------------------------ */

/**
 * Content files declare intent; src/lib/schema.ts computes the final JSON-LD
 * graph (absolute URLs, breadcrumbs, publisher, dates). Content never
 * hand-writes a full JSON-LD blob — that guarantees the markup stays
 * consistent across every page as the site grows.
 */
export interface SchemaHint {
  '@type': 'Article' | 'Review' | 'Dataset' | 'HowTo';
  /** Adds ItemList markup, for listicles and comparison pages. */
  itemList?: { name: string; description?: string; url?: string }[];
  /** The thing under review/comparison, for entity signals. */
  about?: { name: string; type: 'Product' | 'SoftwareApplication' | 'Thing' }[];
  /** Review pages only. */
  rating?: { value: number; best: number; worst: number };
  /** Dataset pages only. */
  dataset?: { measurementTechnique: string; variableMeasured: string };
}

/* ------------------------------------------------------------------ */
/* Page shapes                                                         */
/* ------------------------------------------------------------------ */

/** Fields every content file exports, regardless of pillar. */
export interface BaseContent {
  slug: string;
  seo: Seo;
  hero: Hero;
  /**
   * ~100–150 words. Must survive being lifted out of the page verbatim and
   * still answer the query — this is the AEO/GEO extraction target.
   */
  quickAnswer: string;
  sections: Section[];
  faqs: Faq[];
  schema: SchemaHint;
  status: PublishStatus;
  vertical: Vertical;
  /** Internal links out to related content, by site-relative path. */
  related?: string[];
  author?: string;
  /** ISO date of first publication. */
  datePublished: string;
}

export interface ReviewContent extends BaseContent {
  product: string;
  verdict: string;
  rating: { value: number; best: number };
  pros: string[];
  cons: string[];
  specs: { label: string; value: string }[];
  benchmarks: BenchmarkRow[];
  priceUsd?: number;
}

export interface VsContent extends BaseContent {
  contenders: [string, string, ...string[]];
  /**
   * Table rendered above the fold, per the §4 format rules.
   *
   * Spec and price facts only. Throughput figures must NOT live here as free
   * text — a string cell carries no provenance, so an unverified number could
   * reach a published page without the validator seeing it. Put every
   * tokens/sec figure in `benchmarks` below, where it carries a status.
   * The validator enforces this.
   */
  comparisonTable: {
    columns: string[];
    rows: TableCell[][];
  };
  /**
   * Throughput backing this comparison, typed and provenance-tagged exactly
   * like a /benchmarks/ page. Rendered through the same BenchmarkTable.
   */
  benchmarks?: BenchmarkRow[];
  winner: { name: string; reason: string };
  /** Situational recommendations — "pick A if…, pick B if…". */
  pickIf: { contender: string; scenario: string }[];
}

export interface GuideContent extends BaseContent {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  /** Hardware/software the reader needs before starting. */
  requirements: string[];
  /**
   * Optional above-the-fold comparison table (budget tiers, options…).
   * Same rule as /vs/: spec and price facts only, no free-text throughput.
   */
  comparisonTable?: {
    columns: string[];
    rows: TableCell[][];
  };
  /** Provenance-tagged throughput, when a guide cites any. */
  benchmarks?: BenchmarkRow[];
}

export interface BenchmarkContent extends BaseContent {
  /** The model these numbers are for, e.g. "qwen3-14b". */
  model: string;
  modelDisplayName: string;
  /** Living dataset — how often we re-run and re-publish. */
  updateCadenceDays: number;
  methodology: string[];
  rows: BenchmarkRow[];
  testRig: { label: string; value: string }[];
}

export interface VerdictContent extends BaseContent {
  /** Always rendered prominently. Non-optional by design: a curated page
   *  must declare that it is not firsthand testing. */
  contentLabel: string;
  sources: SourceRef[];
  consensusThemes: ConsensusTheme[];
  relatedReviews: string[];
}

export interface BlogContent extends BaseContent {
  category: 'news' | 'explainer' | 'opinion';
  readingTimeMinutes: number;
}

/* ------------------------------------------------------------------ */
/* Vertical B — AI tooling for businesses                              */
/* ------------------------------------------------------------------ */

/**
 * The verification anchor for a /builds/ page. A build post without something
 * concrete behind it is a claim, and claims are what this site exists not to
 * publish. At least one is required before a build page may go published.
 */
export interface BuildArtifact {
  type: 'repo' | 'screenshot' | 'output-sample' | 'metric';
  label: string;
  url?: string;
  caption: string;
}

/**
 * Outcome of a build.
 *
 * `provenance` is a subset of the site-wide DataStatus vocabulary, not a
 * separate one — see BUILD_RESULT_STATUSES. A `measured` result must point at
 * an artifact; the validator enforces that.
 */
export interface BuildResult {
  metric: string;
  before?: string;
  after: string;
  provenance: BuildResultStatus;
  /** `label` of the BuildArtifact that evidences this, required when measured. */
  artifactLabel?: string;
}

export interface BuildContent extends BaseContent {
  /** The real business problem this solved. Not a hypothetical. */
  problem: string;
  artifacts: BuildArtifact[];
  stack: string[];
  results: BuildResult[];
  /** What it does not do. A build post with no limitations is marketing. */
  limitations: string[];
}

export interface StudioSample {
  label: string;
  /** Path under /public. The validator checks the file exists before publish. */
  imagePath: string;
  prompt?: string;
  caption: string;
}

export interface StudioContent extends BaseContent {
  /** The client or business need this pipeline served. */
  useCase: string;
  pipeline: { step: string; tool: string; notes: string }[];
  samples: StudioSample[];
  beforeAfter?: { before: string; after: string; context: string };
}

/** A measurement pulled from analytics, not from a model's imagination. */
export interface ExperimentDataPoint {
  metric: string;
  before: number;
  after: number;
  window: string;
  source: 'GSC' | 'GA4' | 'Plausible' | 'manual-observation';
}

export interface ExperimentContent extends BaseContent {
  hypothesis: string;
  method: {
    change: string;
    startDate: string;
    endDate: string;
    controls: string[];
  };
  dataPoints: ExperimentDataPoint[];
  /**
   * 'inconclusive' is a valid and expected outcome. Publishing null results is
   * the credibility mechanism for this pillar — never let the pipeline reshape
   * an inconclusive test into a confident claim.
   */
  result: 'confirmed' | 'refuted' | 'inconclusive';
  /** n=1 site, confounds, seasonality. Required; cannot be empty. */
  caveats: string[];
}

export type AnyContent =
  | ReviewContent
  | VsContent
  | GuideContent
  | BenchmarkContent
  | VerdictContent
  | BlogContent
  | BuildContent
  | StudioContent
  | ExperimentContent;

/* ------------------------------------------------------------------ */
/* Global site content                                                 */
/* ------------------------------------------------------------------ */

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  /** Appended by the metadata title template: "Page Title | FieldChecked". */
  titleTemplate: string;
  nav: LinkRef[];
  footer: {
    blurb: string;
    columns: { heading: string; links: LinkRef[] }[];
    legal: string;
  };
  socials: LinkRef[];
  author: {
    name: string;
    bio: string;
    url: string;
  };
  /** Disclosure shown on any page carrying unverified numbers. */
  dataDisclosure: string;
  contactEmail: string;
  /**
   * Every GPU available for testing. Single source of truth — /about/ renders
   * this, and `npm run qa:content` validates benchmark rows against it.
   */
  hardwareInventory: HardwareUnit[];
}
