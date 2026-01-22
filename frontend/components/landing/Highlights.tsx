"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    title: "Atlas Commerce",
    description: "E-commerce com checkout rapido e conteudo que converte.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    tag: "E-commerce",
    metric: "+38% ticket medio",
    featured: true,
  },
  {
    title: "Lume Health",
    description: "Plataforma de saude com onboarding guiado e IA aplicada.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    tag: "Health",
    metric: "MVP 8 semanas",
  },
  {
    title: "Delta Finance",
    description: "Dashboard financeiro com dados em tempo real e alertas.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tag: "SaaS",
    metric: "+24 NPS",
  },
  {
    title: "Vento Mobility",
    description: "App + landing para lancamento de servicos urbanos.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
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
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Highlights() {
  return (
    <section className="relative pb-24 pt-16 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-12 top-20 h-32 w-32 rounded-full border border-white/10" />
        <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full border border-white/10" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--accent)]">Projetos em foco</div>
            <h2 className="text-4xl uppercase leading-tight tracking-tight sm:text-5xl">
              Marcas que pedem velocidade sem perder detalhe.
            </h2>
            <p className="text-sm text-white/60">
              Selecionamos entregas onde cada etapa aproximou produto, marca e marketing num unico movimento.
            </p>
            <div className="flex gap-6 text-xs uppercase tracking-[0.35em] text-white/50">
              <span>2023-2024</span>
              <span>Portugal + EU</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
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
            </div>
            <div className="flex items-center justify-between rounded-full border border-white/15 bg-white/[0.02] px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-white/60">
              <span>Disponivel agora</span>
              <span className="text-[color:var(--accent)]">Live</span>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {highlights.map((item, index) => (
              <motion.article
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-white/30 ${
                  item.featured ? "md:col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute left-4 top-4 z-10 flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                    <span>{`Case ${String(index + 1).padStart(2, "0")}`}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 z-10 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-white/80">
                    {item.metric}
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05] ${
                      item.featured ? "object-[30%_center]" : "object-center"
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="flex items-center justify-between px-5 pt-4 text-[10px] uppercase tracking-[0.35em] text-white/60">
                  <span>{item.tag}</span>
                  <span className={item.featured ? "text-[color:var(--accent)]" : "text-white/40"}>
                    {item.featured ? "Featured" : "Studio"}
                  </span>
                </div>
                <div className="px-5 pb-5 pt-3">
                  <h3 className="text-lg uppercase tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm text-white/65">{item.description}</p>
                </div>
              </motion.article>
            ))}
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
