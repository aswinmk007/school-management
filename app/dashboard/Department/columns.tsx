"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pen, Trash2 } from "lucide-react";

export type Dept = {
  id: string;
  name: string;
  code: string;
  description: string;
};

export const columns: ColumnDef<Dept>[] = [
  { accessorKey:"id", header: "ID"},
  { accessorKey: "name", header: "Name" },
  { accessorKey: "code", header: "Code" },
  { accessorKey: "description", header: "Description" },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const dept = row.original;
      const onEdit = table.options.meta?.onEdit;
      const onDelete = table.options.meta?.onDelete;

      return (
       <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit?.(dept)}
            className="bg-slate-900 hover:bg-slate-800"
          >
            <Pen className="text-green-600"/>
          </Button>
  
          <Button
          size="sm"
          variant="secondary"
          className="bg-slate-900 hover:bg-slate-800"
          onClick={() => onDelete?.(dept)}
          >
            <Trash2 className="text-red-500"/>
          </Button>
       </div>
      );
    },
  },
];
