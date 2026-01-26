"use client";

import { motion, easeOut } from "framer-motion";
import { ReactNode } from "react";

export interface PageHeroStat {
  label: string;
  value: string;
  note?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  meta?: string[];
  tags?: string[];
  stats?: PageHeroStat[];
  actions?: ReactNode;
  right?: ReactNode;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export default function PageHero({
  eyebrow,
  title,
  description,
  meta = [],
  tags = [],
  stats = [],
  actions,
  right,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-24 text-[color:var(--foreground)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(216,242,106,0.28),transparent_65%)] blur-[120px]" />
        <div className="absolute right-6 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)] blur-[120px]" />
        <div className="absolute left-1/2 top-24 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-end"
        >
          <motion.div variants={itemVariants} className="space-y-7">
            <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
              <span className="text-[color:var(--accent)]">{eyebrow}</span>
              {meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <h1 className="text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base text-[color:var(--muted)] md:text-lg">{description}</p>
            {actions ? <div className="flex flex-wrap items-center gap-4">{actions}</div> : null}

            {stats.length > 0 ? (
              <div className="grid gap-3 text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3"
                  >
                    <div className="text-[color:var(--muted)]">{stat.label}</div>
                    <div className="mt-2 text-sm font-medium tracking-tight text-[color:var(--foreground)]">
                      {stat.value}
                    </div>
                    {stat.note ? <div className="mt-2 text-[10px] text-[color:var(--muted)]">{stat.note}</div> : null}
                  </div>
                ))}
              </div>
            ) : null}

            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[color:var(--border)] px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </motion.div>

          {right ? (
            <motion.div variants={itemVariants} className="space-y-6">
              {right}
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
