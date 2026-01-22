"use client";

import Link from "next/link";
import { easeOut, motion } from "framer-motion";

const navLinks = [
  { href: "/services", label: "Serviços" },
  { href: "/projects", label: "Projetos" },
  { href: "/contact", label: "Contacto" },
];

export default function LandingNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="fixed left-0 right-0 top-0 z-30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-sm uppercase tracking-[0.4em] text-white">
            Web<span className="text-[color:var(--accent)]">Fusion</span>Lab
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            type="button"
            aria-label="Open menu"
            className="text-[11px] uppercase tracking-[0.4em] text-white/80 md:hidden"
          >
            Menu
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
