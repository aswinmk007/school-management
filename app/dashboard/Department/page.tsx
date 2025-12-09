"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Dept, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "./data-table";
import AddDeptDialog from "./add-dialog";
import EditDeptDialog from "./edit-dialog";


export default function StudentsPage() {
  const [data, setData] = useState<Dept[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<Dept | null>(null);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await api.departments.getAll();
      setData(res);
    }
    load();
  }, []);

  const handleEdit = (tept: Dept) => {
    setSelected(tept);
    setOpenEdit(true);
  };
  const handleSave = async (updated: Dept) => {
    await api.departments.update(updated.id, updated);

    setData((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };
  const handleDelete = async (tept: Dept) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${tept.name}?`
    );
    if (!confirmDelete) return;

    await api.teachers.delete(tept.id);

    setData((prev) => prev.filter((s) => s.id !== tept.id));
  };

   const handleAddSave = async (tept: Omit<Dept, "id">) => {
    const newDept = await api.departments.create(tept);
    setData((prev) => [...prev, newDept]);
    
  };

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-bold mb-5">Department Management</h1>
        <div>
          <Button onClick={() => setOpenAdd(true)} className="bg-blue-600 hover:bg-blue-500"><Plus/>Add Department</Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditDeptDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        dept={selected}
        onSave={handleSave}
      />

      <AddDeptDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleAddSave}
      />
    </div>
  );
}
