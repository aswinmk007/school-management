"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Student } from "./columns";
 import { ToastContainer, toast } from 'react-toastify';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Student, "id">) => void;
}

export default function AddStudentDialog({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<Omit<Student, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    departmentId: "",
    enrollmentDate: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = () => {
  if (
    !form.firstName ||
    !form.lastName ||
    !form.email ||
    !form.departmentId ||
    !form.enrollmentDate
  ) {
    alert("Please fill the form completely!");
    return;
  }

  onSave(form);
  setForm({
    firstName: "",
    lastName: "",
    email: "",
    departmentId: "",
    enrollmentDate: "",
  });

  onClose();
};


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">

          <div className="flex gap-3">
            <div className="flex-1 ">
              <Label>First Name</Label>
              <Input name="firstName" value={form.firstName} onChange={handleChange}
              className="bg-slate-800 text-white border-slate-600"
               />
            </div>

            <div className="flex-1">
              <Label>Last Name</Label>
              <Input name="lastName" value={form.lastName} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label>Email</Label>
            <Input name="email" value={form.email} onChange={handleChange} />
          </div>

          <div>
            <Label>Department</Label>
            <Input name="departmentId" value={form.departmentId} onChange={handleChange} />
          </div>

          <div>
            <Label>Enrollment Date</Label>
            <Input type="date" name="enrollmentDate" value={form.enrollmentDate} onChange={handleChange} />
          </div>

          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-500"
          >
            Add Student
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
