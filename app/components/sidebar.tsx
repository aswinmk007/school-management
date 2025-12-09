"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, LayoutDashboard, Settings, GraduationCap, UserRound} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Sidebar({ currentView, setView, isMobileOpen, closeMobile }: { currentView: string, setView: (v: string) => void, isMobileOpen: boolean, closeMobile: () => void }) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/Department", label: "Department Management", icon: Home },
    { href: "/dashboard/student", label: "Student Management", icon: GraduationCap },
    { href: "/dashboard/teacher", label: "Teacher Management", icon: UserRound },
  ];

  const baseClasses = "fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-900 text-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0";
	const mobileClasses = isMobileOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <aside className={`${baseClasses} ${mobileClasses} flex flex-col`}>
      <div className="p-6 text-xl font-bold font-sans">SchoolBoard</div>
      <Separator />

      <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition font-medium text-sm",
              pathname === item.href && "bg-slate-800 text-blue-500 font-medium"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <Separator />
      <div className="p-4 text-xs text-muted-foreground">© 2025 Dashboard</div>
    </aside>
  );
}
