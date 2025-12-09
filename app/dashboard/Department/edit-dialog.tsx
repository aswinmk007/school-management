"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Dept } from "./columns";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onClose: () => void;
  dept: Dept | null;
  onSave: (updated: Dept) => void;
}

export default function EditDeptDialog({
  open,
  onClose,
  dept,
  onSave,
}: Props) {
  const [form, setForm] = useState<Dept>({
    id: "",
    name: "",
    code: "",
    description: ""
  });

  useEffect(() => {
    if (dept) setForm(dept);
  }, [dept]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
        </DialogHeader>

       <div className="flex flex-col gap-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
  <div className="grid grid-cols-2 gap-4">
    <div className="flex flex-col gap-1">
      <Label className="text-slate-300">Name</Label>
      <Input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="bg-slate-800 text-white border-slate-600"
      />
    </div>

    <div className="flex flex-col gap-1">
      <Label className="text-slate-300">Code</Label>
      <Input
        name="code"
        value={form.code}
        onChange={handleChange}
        className="bg-slate-800 text-white border-slate-600"
      />
    </div>
  </div>

  <div className="flex flex-col gap-1">
    <Label className="text-slate-300">Description</Label>
    <Input
      name="description"
      value={form.description}
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
