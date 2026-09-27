import type { TableCell } from "@/content/research";

type DataTableProps = {
  caption: string;
  columns: string[];
  rows: TableCell[][];
};

export default function DataTable({ caption, columns, rows }: DataTableProps) {
  return (
    <div className="my-2 overflow-x-auto" tabIndex={0} role="region" aria-label={caption}>
      <table className="w-full border-collapse text-left text-base tabular-nums">
        <caption className="pb-2 text-left font-sans text-sm text-muted">{caption}</caption>
        <thead>
          <tr className="border-y border-grid font-sans text-sm">
            {columns.map((c) => (
              <th key={c} scope="col" className="whitespace-nowrap py-2 pr-6 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-grid">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="whitespace-nowrap py-2 pr-6 font-normal">
                    {cell.text}
                  </th>
                ) : (
                  <td key={c} colSpan={cell.colSpan} className="whitespace-nowrap py-2 pr-6">
                    {cell.text}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
