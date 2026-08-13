import { HubPage, hubMetadata } from '@/components/HubPage';
import { BenchmarkTable } from '@/components/tables';
import { allBenchmarkRows } from '@/content';

export const metadata = hubMetadata('benchmarks');

/**
 * The benchmarks hub is the one hub that carries data itself: every row on
 * the site, in one sortable-by-eye table. Data pages attract links and
 * citations far more readily than opinion pages (§3), so the aggregate view
 * is the asset — the per-model pages are the detail.
 */
export default function Page() {
  const rows = allBenchmarkRows().sort((a, b) => b.tokensPerSec - a.tokensPerSec);

  return (
    <HubPage hubKey="benchmarks">
      <section aria-labelledby="all-rows" className="mt-10">
        <h2 id="all-rows" className="text-section font-bold">
          Every measurement on the site
        </h2>
        <BenchmarkTable
          rows={rows}
          caption="Sorted by generation throughput. Provenance is stated per row — figures marked *pending verification* have not yet been reproduced on our hardware."
        />
      </section>
    </HubPage>
  );
}
