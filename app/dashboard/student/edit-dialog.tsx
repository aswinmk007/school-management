"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Student } from "./columns";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onClose: () => void;
  student: Student | null;
  onSave: (updated: Student) => void;
}

export default function EditStudentDialog({
  open,
  onClose,
  student,
  onSave,
}: Props) {
  const [form, setForm] = useState<Student>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    departmentId: "",
    enrollmentDate: "",
  });

  useEffect(() => {
    if (student) setForm(student);
  }, [student]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>

       <div className="flex flex-col gap-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
  <div className="grid grid-cols-2 gap-4">
    <div className="flex flex-col gap-1">
      <Label className="text-slate-300">First Name</Label>
      <Input
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        className="bg-slate-800 text-white border-slate-600"
      />
    </div>

    <div className="flex flex-col gap-1">
      <Label className="text-slate-300">Last Name</Label>
      <Input
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        className="bg-slate-800 text-white border-slate-600"
      />
    </div>
  </div>

  <div className="flex flex-col gap-1">
    <Label className="text-slate-300">Email</Label>
    <Input
      name="email"
      value={form.email}
      onChange={handleChange}
      className="bg-slate-800 text-white border-slate-600"
    />
  </div>

  <div className="flex flex-col gap-1">
    <Label className="text-slate-300">Department ID</Label>
    <Input
      name="departmentId"
      value={form.departmentId}
      onChange={handleChange}
      className="bg-slate-800 text-white border-slate-600"
    />
  </div>

  <div className="flex flex-col gap-1">
    <Label className="text-slate-300">Enrollment Date</Label>
    <Input
      name="enrollmentDate"
      value={form.enrollmentDate}
      onChange={handleChange}
      className="bg-slate-800 text-white border-slate-600"
    />
  </div>
  <Button
    onClick={() => {
      onSave(form);
      onClose();
    }}
    className="bg-blue-600 hover:bg-blue-500 text-white h-10 rounded-lg"
  >
    Update
  </Button>
</div>

      </DialogContent>
    </Dialog>
  );
}
