"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Student, columns } from "./columns";
import { DataTable } from "./data-table";
import EditStudentDialog from "../student/edit-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddStudentDialog from "./add-dialog";

export default function StudentsPage() {
  const [data, setData] = useState<Student[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<Student | null>(null);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await api.students.getAll();
      setData(res);
    }
    load();
  }, []);

  const handleEdit = (student: Student) => {
    setSelected(student);
    setOpenEdit(true);
  };
  const handleSave = async (updated: Student) => {
    await api.students.update(updated.id, updated);

    setData((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };
  const handleDelete = async (student: Student) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${student.firstName} ${student.lastName}?`
    );
    if (!confirmDelete) return;

    await api.students.delete(student.id);

    setData((prev) => prev.filter((s) => s.id !== student.id));
  };

   const handleAddSave = async (student: Omit<Student, "id">) => {
    const newStudent = await api.students.create(student);
    setData((prev) => [...prev, newStudent]);
    
  };

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-bold mb-5">Students Management</h1>
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

      <EditStudentDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        student={selected}
        onSave={handleSave}
      />

      <AddStudentDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleAddSave}
      />
    </div>
  );
}
