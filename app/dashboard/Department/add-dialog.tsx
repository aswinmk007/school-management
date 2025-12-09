"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Dept } from "./columns";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Dept, "id">) => void;
}

export default function AddDeptDialog({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<Omit<Dept, "id">>({
    name: "",
    code: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = () => {
  if (
    !form.name ||
    !form.code ||
    !form.description
  ) {
    alert("Please fill the form completely!");
    return;
  }

  onSave(form);
  setForm({
    name: "",
    code: "",
    description: ""

  });

  onClose();
};


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Department</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">

          <div className="flex gap-3">
            <div className="flex-1 ">
              <Label>First Name</Label>
              <Input name="name" value={form.name} onChange={handleChange}
              className="bg-slate-800 text-white border-slate-600"
               />
            </div>
          </div>

          <div>
            <Label>Code</Label>
            <Input name="code" value={form.code} onChange={handleChange} />
          </div>

          <div>
            <Label>Description</Label>
            <Input  name="description" value={form.description} onChange={handleChange} />
          </div>

          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-500"
          >
            Add Department
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
