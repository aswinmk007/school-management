"use client"
import { ReactNode, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";


export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [currentView, setView] = useState("dashboard");
  const [isMobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar currentView={currentView} setView={setView} isMobileOpen={isMobileOpen} closeMobile={closeMobile}/>
      <main className="flex-1 overflow-y-auto bg-[#1E2939]">
        <Header/>
        {children}
        </main>
    </div>
  );
}
