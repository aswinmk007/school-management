"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  TableMeta,
} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onEdit?: (row: TData) => void;
    onDelete?: (row: TData) => void
  }
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void
}

export function DataTable<TData>({
  columns,
  data,
  onEdit,
  onDelete
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: { onEdit, onDelete }, // No more error
  });

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full text-white">
        <thead className="bg-slate-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-3 text-left">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border hover:bg-slate-700">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
