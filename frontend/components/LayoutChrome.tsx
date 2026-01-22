"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LayoutChromeProps {
  children: ReactNode;
}

export default function LayoutChrome({ children }: LayoutChromeProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Navbar />
      {isHome ? children : <main className="min-h-screen pt-16">{children}</main>}
      <Footer />
    </>
  );
}
