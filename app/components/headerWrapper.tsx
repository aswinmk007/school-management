"use client";
import { usePathname } from "next/navigation";
import Header from "./header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Hide header on base URL "/"
  if (pathname === "/") return null;

  return <Header />;
}
