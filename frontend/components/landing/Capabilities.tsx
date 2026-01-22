"use client";

import { easeOut, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";

const capabilities = services.slice(0, 4);
const focusAreas = ["Estrategia", "Design", "Engenharia", "Growth"];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function Capabilities() {
  return (
    <section className="relative py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute right-10 top-20 h-32 w-32 rounded-full border border-white/10" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="space-y-6"
          >
            <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--accent)]">Capacidades</div>
            <h2 className="text-4xl uppercase leading-tight tracking-tight sm:text-5xl">
              Equipa completa para ideias que precisam virar produto.
            </h2>
            <p className="text-sm text-white/60">
              Da estrategia ao lancamento, alinhamos visao, velocidade e execucao para equipas que nao podem esperar.
            </p>
            <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.35em] text-white/50">
              {focusAreas.map((area) => (
                <span key={area} className="rounded-full border border-white/15 px-3 py-1">
                  {area}
                </span>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/50">
                <span>Ritmo</span>
                <span>01</span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Kickoff em 5 dias</span>
                  <span className="text-white/40">A</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Prototipo em 2 semanas</span>
                  <span className="text-white/40">B</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Entrega com QA</span>
                  <span className="text-white/40">C</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {capabilities.map((service) => (
              <motion.article
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/30"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-70" />
                <div className="relative space-y-4">
                  <div className="text-3xl">{service.icon}</div>
                  <div>
                    <h3 className="text-lg uppercase tracking-tight text-white">{service.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{service.description}</p>
                  </div>
                  <ul className="space-y-2 text-xs text-white/55">
                    {service.features.slice(0, 2).map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
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
          className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-white/15 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
          >
            <h3 className="text-2xl uppercase tracking-tight text-white">Pronto para comecar agora?</h3>
            <p className="mt-3 text-sm text-white/60">
              Marcamos uma conversa rapida e entregamos um plano claro para as proximas 6 semanas.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="primary">
                Contactar
              </Button>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent p-6"
          >
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/50">Disponibilidade</div>
            <div className="mt-3 text-2xl uppercase tracking-tight text-white">Sempre aberta</div>
            <p className="mt-2 text-sm text-white/60">Agenda flexivel para novos projetos.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
