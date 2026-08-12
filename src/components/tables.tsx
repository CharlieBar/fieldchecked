import { inline } from '@/lib/inline';
import type { BenchmarkRow, TableCell } from '@/types/content';
import { DataStatusTag } from './primitives';

const DELTA_CLASS: Record<NonNullable<TableCell['delta']>, string> = {
  better: 'text-primary',
  worse: 'text-accent',
  neutral: 'text-text/85',
};

/**
 * Comparison table: sticky header, monospace numerals, colour-coded deltas.
 * Wrapped in its own horizontal scroll container so the page body never
 * scrolls sideways on mobile.
 */
export function ComparisonTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: TableCell[][];
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="max-h-[70vh] overflow-auto rounded border border-border">
        <table className="table-sticky w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column}
                  scope="col"
                  className={`border-b border-border px-4 py-3 text-left font-display text-xs uppercase tracking-wider text-secondary ${
                    index === 0 ? 'min-w-[10rem]' : ''
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-surface/40">
                {row.map((cell, cellIndex) => {
                  const tone = cell.delta ? DELTA_CLASS[cell.delta] : 'text-text/85';
                  const Cell = cellIndex === 0 ? 'th' : 'td';
                  return (
                    <Cell
                      key={cellIndex}
                      {...(cellIndex === 0 ? { scope: 'row' as const } : {})}
                      className={`border-b border-border px-4 py-3 align-top ${
                        cellIndex === 0
                          ? 'text-left font-display font-medium text-text'
                          : `${tone} ${cell.numeric ? 'numeric' : 'font-body'}`
                      }`}
                    >
                      {inline(cell.value)}
                    </Cell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-secondary">{inline(caption)}</figcaption>
      )}
    </figure>
  );
}

/** The tokens/sec table. Every row carries its own provenance tag. */
export function BenchmarkTable({
  rows,
  showGpu = true,
  caption,
}: {
  rows: BenchmarkRow[];
  showGpu?: boolean;
  caption?: string;
}) {
  if (rows.length === 0) return null;

  return (
    <figure className="my-8">
      <div className="max-h-[70vh] overflow-auto rounded border border-border">
        <table className="table-sticky w-full min-w-[44rem] border-collapse text-sm">
          <thead>
            <tr>
              {showGpu && <Th>GPU</Th>}
              <Th>Model</Th>
              <Th>Quant</Th>
              <Th align="right">Gen tok/s</Th>
              <Th align="right">Prompt tok/s</Th>
              <Th align="right">VRAM</Th>
              <Th align="right">Ctx</Th>
              <Th>Runtime</Th>
              <Th>Provenance</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.gpu}-${row.model}-${index}`} className="odd:bg-surface/40">
                {showGpu && (
                  <th
                    scope="row"
                    className="border-b border-border px-4 py-3 text-left font-display font-medium"
                  >
                    {row.gpu}
                  </th>
                )}
                <Td>{row.model}</Td>
                <Td>{row.quantization}</Td>
                <Td align="right" strong>
                  {row.tokensPerSec.toFixed(1)}
                </Td>
                <Td align="right">{row.promptTokensPerSec?.toLocaleString() ?? '—'}</Td>
                <Td align="right">{row.vramGb ? `${row.vramGb} GB` : '—'}</Td>
                <Td align="right">{row.contextLength?.toLocaleString() ?? '—'}</Td>
                <Td>{row.runtime}</Td>
                <Td>
                  <DataStatusTag status={row.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-secondary">{inline(caption)}</figcaption>
      )}
      {rows.some((row) => row.notes) && (
        <ul className="mt-3 space-y-1.5 text-xs text-secondary">
          {rows
            .filter((row) => row.notes)
            .map((row, index) => (
              <li key={index}>
                <span className="font-display text-text/70">{row.model}:</span> {row.notes}
              </li>
            ))}
        </ul>
      )}
    </figure>
  );
}

function Th({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <th
      scope="col"
      className={`border-b border-border px-4 py-3 font-display text-xs uppercase tracking-wider text-secondary ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = 'left',
  strong = false,
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
  strong?: boolean;
}) {
  return (
    <td
      className={`numeric border-b border-border px-4 py-3 ${
        align === 'right' ? 'text-right' : 'text-left'
      } ${strong ? 'font-semibold text-primary' : 'text-text/85'}`}
    >
      {children}
    </td>
  );
}
