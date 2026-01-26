"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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

  const panelVariants = {
    hidden: { opacity: 0, y: -18, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 240, damping: 22 },
    },
    exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.18 } },
  } as const;

  const listVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${isScrolled || isMobileMenuOpen ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-sm font-semibold tracking-[0.12em] text-[color:var(--foreground)]">
            Web<span className="text-[color:var(--accent)]">Fusion</span>Lab
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[color:var(--foreground)] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
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
        <AnimatePresence>
          {isMobileMenuOpen ? (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/55 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                id="mobile-menu"
                className="fixed left-0 right-0 top-16 z-50 md:hidden"
                variants={panelVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <div className="mx-4 rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--background)] px-4 py-5 shadow-[var(--shadow-soft)] space-y-2">
                  <motion.div variants={listVariants} initial="hidden" animate="show">
                    {navLinks.map((link) => (
                      <motion.div key={link.href} variants={itemVariants}>
                        <Link
                          href={link.href}
                          className={`block rounded-lg px-3 py-2 text-sm font-medium tracking-[0.08em] transition-colors ${
                            pathname === link.href
                              ? "text-[color:var(--accent)]"
                              : "text-[color:var(--muted)] hover:text-[color:var(--foreground)] hover:bg-white/5"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div variants={itemVariants} className="pt-2">
                      <Button
                        href="/contact"
                        variant="secondary"
                        className="w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Contactar
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </nav>
  );
}
