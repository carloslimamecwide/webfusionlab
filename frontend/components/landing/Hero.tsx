"use client";

import { easeInOut, easeOut, motion } from "framer-motion";
import Button from "@/components/ui/Button";

const heroStats = [
  { label: "Tempo medio", value: "6-8 semanas" },
  { label: "Projetos ativos", value: "04" },
  { label: "Disponibilidade", value: "Sempre aberta" },
];

const capabilityTags = ["Web", "SaaS", "Mobile", "Brand", "Growth"];

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

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-28 right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,255,63,0.35),transparent_65%)] blur-3xl"
          animate={{ y: [0, 18, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: easeInOut }}
        />
        <motion.div
          className="absolute left-0 top-32 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_65%)] blur-3xl"
          animate={{ y: [0, -20, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: easeInOut }}
        />
        <div className="absolute left-0 top-32 h-px w-[70%] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute -bottom-16 right-16 h-64 w-64 rounded-full border border-white/10" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-28 lg:px-10 lg:pt-36">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-end"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/60">Lisboa / Porto / Remote</p>
            <h1 className="text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Produtos digitais que parecem inevitaveis.
            </h1>
            <p className="max-w-xl text-base text-white/65 md:text-lg">
              Estrategia, design e engenharia numa unica equipa pronta para lancar rapido e escalar sem refazer tudo.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary">
                Comecar projeto
              </Button>
              <Button href="/projects" variant="outline">
                Ver projetos
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.35em] text-white/40">
              {capabilityTags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-white/50">
                <span>Studio status</span>
                <span className="text-[color:var(--accent)]">Live</span>
              </div>
              <div className="mt-6 grid gap-4">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{stat.label}</span>
                    <span className="text-lg uppercase tracking-tight text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white/60">
                <span className="text-white/80">Status atual:</span> Discover, Build, Launch.
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">Disponibilidade</p>
                  <p className="mt-2 text-2xl uppercase tracking-tight text-white">Sempre aberta</p>
                  <p className="mt-2 text-sm text-white/60">Agenda flexivel para novos projetos.</p>
                </div>
                <div className="h-12 w-12 rounded-full border border-white/20 bg-[color:var(--accent-soft)]" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/40"
        >
          <span>Scroll</span>
          <motion.span
            className="h-px w-12 bg-white/30"
            animate={{ scaleX: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: easeInOut }}
          />
        </motion.div>
      </div>
    </section>
  );
}
