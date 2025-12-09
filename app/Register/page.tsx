"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e: any) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await api.auth.register(form.name, form.email, form.password);

      if (res) {
        alert("Registration successful!");
        router.push("/"); 
      }
    } catch (error: any) {
      alert(error.message || "Registration failed");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <Card className="w-full max-w-sm bg-slate-900 text-white">
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="flex flex-col gap-6">

            <div>
              <Label className="text-white">Full Name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="text-white"
              />
            </div>

            <div>
              <Label className="text-white">Email</Label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="text-white"
              />
            </div>

            <div>
              <Label className="text-white">Password</Label>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-sm">
          Already have an account?
          <button
            className="text-blue-400 ml-2"
            onClick={() => router.push("/")}
          >
            Login
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
