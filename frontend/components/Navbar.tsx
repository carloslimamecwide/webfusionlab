"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Sobre" },
    { href: "/services", label: "Serviços" },
    { href: "/projects", label: "Projetos" },
  ];

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${isScrolled ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-sm uppercase tracking-[0.4em] text-white">
            Web<span className="text-[color:var(--accent)]">Fusion</span>Lab
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-medium uppercase tracking-[0.35em] transition-colors duration-200 ${
                  pathname === link.href ? "text-[color:var(--accent)]" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="secondary" className="px-5 py-2.5">
              Contactar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 text-[11px] font-medium uppercase tracking-[0.35em] transition-colors ${
                  pathname === link.href ? "text-[color:var(--accent)]" : "text-white/60 hover:text-white"
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
        )}
      </div>
    </nav>
  );
}
