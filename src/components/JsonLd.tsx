/**
 * Renders a JSON-LD graph. Structured data is a measured variable in this
 * experiment (§6) — do not remove it from a page template without logging
 * the change in EXPERIMENT-LOG.md.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is generated from typed objects in src/lib/schema.ts, never
      // from user input. `<` is escaped to close the script-injection path.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
