"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/services", label: "Servicos" },
    { href: "/projects", label: "Projetos" },
    { href: "/about", label: "Sobre" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/65 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-[0.12em] text-[color:var(--foreground)]">
            Web<span className="text-[color:var(--accent)]">Fusion</span>Lab
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-[0.08em] transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[color:var(--accent)]"
                    : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="secondary" className="px-5 py-2.5">
              Contactar
            </Button>
          </div>

          <button
            className="p-2 text-[color:var(--foreground)] md:hidden"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            aria-label="Abrir menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div id="mobile-menu" className="border-t border-white/10 py-4 md:hidden">
            <div className="space-y-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-3 shadow-[var(--shadow-soft)]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-xl px-3 py-2 text-sm font-medium tracking-[0.08em] transition-colors ${
                    pathname === link.href
                      ? "text-[color:var(--accent)]"
                      : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/contact" variant="secondary" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                Contactar
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
