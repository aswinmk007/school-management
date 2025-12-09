"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await api.auth.login(email, password);
      if(user){
        setTimeout(() => {
          alert("Login Success")
          router.push('/dashboard')
        }, 2000);
      }else{
        alert("Invalid Email and Password")
      }

    } catch (err: any) {
      alert(err.message || "Invalid credentials");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <Card className="w-full max-w-sm bg-slate-900">
        <CardHeader>
          <CardTitle className="text-center text-white">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@school.edu"
                  required
                  className="text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
         <CardFooter className="text-sm text-white">
          Don't have an account? 
          <button
            className="text-blue-400 ml-2"
            onClick={() => router.push("/Register")}
          >
            Register
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
