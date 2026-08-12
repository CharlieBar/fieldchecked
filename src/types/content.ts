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
 * How much trust a number on this site has earned.
 *
 * Nothing may be published as `measured` until it has been reproduced on the
 * rig at Checkpoint 2. Seed and model-drafted content ships as
 * `pending-verification` and renders with a visible caveat.
 */
export type DataStatus =
  | 'measured'
  | 'pending-verification'
  | 'community-reported'
  | 'vendor-claimed';

export type PublishStatus = 'draft' | 'published';

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
  status: DataStatus;
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
  /** Table rendered above the fold, per the §4 format rules. */
  comparisonTable: {
    columns: string[];
    rows: TableCell[][];
  };
  winner: { name: string; reason: string };
  /** Situational recommendations — "pick A if…, pick B if…". */
  pickIf: { contender: string; scenario: string }[];
}

export interface GuideContent extends BaseContent {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  /** Hardware/software the reader needs before starting. */
  requirements: string[];
  /** Optional above-the-fold comparison table (budget tiers, options…). */
  comparisonTable?: {
    columns: string[];
    rows: TableCell[][];
  };
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

export type AnyContent =
  | ReviewContent
  | VsContent
  | GuideContent
  | BenchmarkContent
  | VerdictContent
  | BlogContent;

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
}
