"use client";

import { easeOut, motion } from "framer-motion";

const highlights = [
  {
    title: "Atlas Commerce",
    description: "E-commerce com checkout rapido e conteudo que converte.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    tag: "E-commerce",
    metric: "+38% ticket medio",
    featured: true,
  },
  {
    title: "Lume Health",
    description: "Plataforma de saude com onboarding guiado e IA aplicada.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    tag: "Health",
    metric: "MVP 8 semanas",
  },
  {
    title: "Delta Finance",
    description: "Dashboard financeiro com dados em tempo real e alertas.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tag: "SaaS",
    metric: "+24 NPS",
  },
  {
    title: "Vento Mobility",
    description: "App + landing para lancamento de servicos urbanos.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    tag: "Mobility",
    metric: "Launch 21 dias",
  },
];

const logbook = [
  { label: "Projetos entregues", value: "38" },
  { label: "Retencao media", value: "+27%" },
  { label: "Equipas atendidas", value: "Europa + LATAM" },
];

const signalStats = [
  { label: "Projetos recentes", value: "12" },
  { label: "Especialidade", value: "SaaS + Web" },
  { label: "Disponibilidade", value: "Sempre aberta" },
];

const featuredCase = highlights.find((item) => item.featured) ?? highlights[0];
const secondaryCases = highlights.filter((item) => item.title !== featuredCase.title);

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: easeOut } },
};

export default function Highlights() {
  return (
    <section className="relative pb-24 pt-20 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-12 h-px w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute right-12 top-16 h-32 w-32 rounded-full border border-white/10" />
        <div className="absolute bottom-6 left-10 h-44 w-44 rounded-full border border-white/10" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/50">
              <span className="text-[color:var(--accent)]">Projetos em foco</span>
              <span>2023-2024</span>
              <span>Portugal + EU</span>
            </div>
            <h2 className="text-4xl uppercase leading-tight tracking-tight sm:text-5xl">
              Casos com pressao real, resultados que ficam.
            </h2>
            <p className="text-sm text-white/60">
              Selecionamos entregas onde cada etapa aproximou produto, marca e marketing num unico movimento.
            </p>

            <motion.article
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_28px_70px_rgba(0,0,0,0.4)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <div className="absolute left-5 top-5 z-10 flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                  <span>Case 01</span>
                </div>
                <div className="absolute bottom-5 right-5 z-10 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-white/80">
                  {featuredCase.metric}
                </div>
                <img
                  src={featuredCase.image}
                  alt={featuredCase.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="flex items-center justify-between px-6 pt-5 text-[10px] uppercase tracking-[0.35em] text-white/60">
                <span>{featuredCase.tag}</span>
                <span className="text-[color:var(--accent)]">Featured</span>
              </div>
              <div className="px-6 pb-6 pt-3">
                <h3 className="text-2xl uppercase tracking-tight">{featuredCase.title}</h3>
                <p className="mt-3 text-sm text-white/65">{featuredCase.description}</p>
              </div>
            </motion.article>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/50">
                <span>Logbook</span>
                <span>03</span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {logbook.map((item) => (
                  <li key={item.label} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span>{item.label}</span>
                    <span className="text-white/40">{item.value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="space-y-4">
              {secondaryCases.map((item) => (
                <motion.article
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/25"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/40">
                      <span>{item.tag}</span>
                      <span>{item.metric}</span>
                    </div>
                    <h3 className="mt-2 text-base uppercase tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between rounded-full border border-white/15 bg-white/[0.02] px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-white/60"
            >
              <span>Disponivel agora</span>
              <span className="text-[color:var(--accent)]">Live</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          {signalStats.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">{item.label}</div>
              <div className="mt-3 text-lg uppercase tracking-tight text-white">{item.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
