"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

interface HeaderProps {
  children?: React.ReactNode; // FIX for "children implicitly has any" error
}

export default function Header({ children }: HeaderProps) {
  const router = useRouter()
  return (
    <header className="w-full h-16 bg-slate-900 shadow flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left */}
      <h1 className="text-xl font-bold text-white font-sans">Dashboard</h1>

      {/* Right */}
      <div className="flex items-center gap-4">
        {children}
        <h1 className="text-white">Welcome</h1>
        <Button className="bg-red-700 hover:bg-red-600" onClick={()=> router.push('/')}>Logout</Button>
      </div>
    </header>
  );
}
