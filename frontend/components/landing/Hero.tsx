"use client";

import { easeInOut, easeOut, motion } from "framer-motion";
import Button from "@/components/ui/Button";

const heroStats = [
  { label: "Tempo medio", value: "6-8 semanas", note: "Sprint de 2 semanas" },
  { label: "Projetos ativos", value: "04", note: "Squads dedicados" },
  { label: "Disponibilidade", value: "Sempre aberta", note: "Agenda flexivel" },
];

const capabilityTags = ["Web", "SaaS", "Mobile", "Brand", "Growth"];

const signalFeed = [
  { label: "Discovery sprint", detail: "Mapa + dados de mercado", time: "Semana 01" },
  { label: "Prototype", detail: "Fluxos e UI vivos", time: "Semana 02" },
  { label: "Build", detail: "Stack pronto para escala", time: "Semanas 03-06" },
];

const labSignals = [
  { label: "Ritmo", value: "2 sprints / mes" },
  { label: "Stack", value: "Next + Node" },
  { label: "SLA", value: "2h resposta" },
];

const tickerItems = ["Estrategia", "Produto", "Design", "Engenharia", "Growth", "Automacao", "IA", "Brand"];
const tickerLoop = [...tickerItems, ...tickerItems];

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
    <section className="relative min-h-screen overflow-hidden text-[color:var(--foreground)]">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(216,242,106,0.35),transparent_65%)] blur-[120px]"
          animate={{ y: [0, 16, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: easeInOut }}
        />
        <motion.div
          className="absolute right-6 top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)] blur-[120px]"
          animate={{ y: [0, -18, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: easeInOut }}
        />
        <div className="absolute left-1/2 top-28 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-28 lg:px-10 lg:pt-36">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
              <span>Lisboa / Porto / Remote</span>
              <span className="flex items-center gap-2 text-[color:var(--foreground)]">
                <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                Studio aberto
              </span>
            </div>
            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
              Produtos digitais que
              <span className="block text-[color:var(--accent)]">parecem inevitaveis.</span>
            </h1>
            <p className="max-w-2xl text-base text-[color:var(--muted)] md:text-lg">
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
            <div className="grid gap-3 text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:grid-cols-3">
              {labSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-4 py-3"
                >
                  <div className="text-[color:var(--muted)]">{signal.label}</div>
                  <div className="mt-2 text-sm font-medium tracking-tight text-[color:var(--foreground)]">
                    {signal.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
              {capabilityTags.map((tag) => (
                <span key={tag} className="rounded-full border border-[color:var(--border)] px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-strong)]">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
                <span>Studio status</span>
                <span className="text-[color:var(--accent)]">Live</span>
              </div>
              <div className="mt-6 grid gap-4">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-4 py-3"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[color:var(--muted)]">{stat.label}</span>
                      <span className="text-lg font-medium tracking-tight text-[color:var(--foreground)]">
                        {stat.value}
                      </span>
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[color:var(--muted)]">
                      {stat.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--muted)]">Signal feed</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                    Discovery, build, launch
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">Atualizamos tudo em tempo real.</p>
                </div>
                <div className="h-12 w-12 rounded-full border border-[color:var(--border)] bg-[color:var(--accent-soft)]" />
              </div>
              <div className="mt-6 space-y-4">
                {signalFeed.map((signal, index) => (
                  <div key={signal.label} className="flex gap-4">
                    <div className="mt-2 flex flex-col items-center">
                      <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                      {index !== signalFeed.length - 1 ? (
                        <span className="mt-2 h-10 w-px bg-white/15" />
                      ) : null}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--muted)]">
                        {signal.time}
                      </div>
                      <div className="mt-2 text-sm font-medium tracking-tight text-[color:var(--foreground)]">
                        {signal.label}
                      </div>
                      <div className="mt-2 text-xs text-[color:var(--muted)]">{signal.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="overflow-hidden rounded-full border border-[color:var(--border)] bg-[color:var(--surface-muted)] py-3">
          <motion.div
            className="flex w-max items-center gap-6 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {tickerLoop.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex items-center gap-3 text-[10px] uppercase tracking-[0.38em] text-[color:var(--muted)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)]"
        >
          <span>Scroll</span>
          <motion.span
            className="h-px w-12 bg-white/25"
            animate={{ scaleX: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: easeInOut }}
          />
        </motion.div>
      </div>
    </section>
  );
}
