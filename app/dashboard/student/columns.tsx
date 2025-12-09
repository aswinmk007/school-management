"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pen, Trash2 } from "lucide-react";

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  enrollmentDate: string;
};

export const columns: ColumnDef<Student>[] = [
  { accessorKey: "firstName", header: "First Name" },
  { accessorKey: "lastName", header: "Last Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "departmentId", header: "Department" },
  { accessorKey: "enrollmentDate", header: "Enrollment Date" },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const student = row.original;
      const onEdit = table.options.meta?.onEdit;
      const onDelete = table.options.meta?.onDelete;

      return (
       <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit?.(student)}
            className="bg-slate-900 hover:bg-slate-800"
          >
            <Pen className="text-green-600"/>
          </Button>
  
          <Button
          size="sm"
          variant="secondary"
          className="bg-slate-900 hover:bg-slate-800"
          onClick={() => onDelete?.(student)}
          >
            <Trash2 className="text-red-500"/>
          </Button>
       </div>
      );
    },
  },
];
