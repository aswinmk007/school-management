"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Teacher, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddteacherDialog from "./add-dialog";
import EditTeacherDialog from "./edit-dialog";
import { DataTable } from "./data-table";


export default function StudentsPage() {
  const [data, setData] = useState<Teacher[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<Teacher | null>(null);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await api.teachers.getAll();
      setData(res);
    }
    load();
  }, []);

  const handleEdit = (teacher: Teacher) => {
    setSelected(teacher);
    setOpenEdit(true);
  };
  const handleSave = async (updated: Teacher) => {
    await api.teachers.update(updated.id, updated);

    setData((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };
  const handleDelete = async (student: Teacher) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${student.firstName} ${student.lastName}?`
    );
    if (!confirmDelete) return;

    await api.teachers.delete(student.id);

    setData((prev) => prev.filter((s) => s.id !== student.id));
  };

   const handleAddSave = async (student: Omit<Teacher, "id">) => {
    const newStudent = await api.teachers.create(student);
    setData((prev) => [...prev, newStudent]);
    
  };

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-bold mb-5">Teacher Management</h1>
        <div>
          <Button onClick={() => setOpenAdd(true)} className="bg-blue-600 hover:bg-blue-500"><Plus/>Add Student</Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditTeacherDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        teacher={selected}
        onSave={handleSave}
      />

      <AddteacherDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleAddSave}
      />
    </div>
  );
}
