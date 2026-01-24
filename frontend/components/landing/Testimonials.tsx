"use client";

import { easeOut, motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";

const leadTestimonial = testimonials[0];
const supportTestimonials = testimonials.slice(1);
const trustSignals = [
  { label: "NPS medio", value: "9.4" },
  { label: "Retencao media", value: "+27%" },
  { label: "Tempo de entrega", value: "-35%" },
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
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function Testimonials() {
  return (
    <section className="relative py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-12 top-10 h-24 w-24 rounded-full border border-white/10" />
        <div className="absolute bottom-6 right-10 h-32 w-32 rounded-full border border-white/10" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="max-w-2xl space-y-4"
        >
          <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--accent)]">Clientes</div>
          <h2 className="text-4xl uppercase leading-tight tracking-tight sm:text-5xl">
            Pessoas reais falando sobre resultados reais.
          </h2>
          <p className="text-sm text-white/60">
            Projetos com impacto mensuravel em conversao, automacao e velocidade de entrega.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {leadTestimonial ? (
            <motion.blockquote
              key={leadTestimonial.id}
              variants={itemVariants}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)] md:col-span-2"
            >
              <div className="absolute -right-6 -top-12 text-[120px] leading-none text-white/10">"</div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">Depoimento principal</div>
              <p className="mt-5 text-base text-white/70">"{leadTestimonial.text}"</p>
              <footer className="mt-8 space-y-1 text-xs uppercase tracking-[0.35em]">
                <div className="text-white">{leadTestimonial.name}</div>
                <div className="text-white/40">{`${leadTestimonial.role} - ${leadTestimonial.company}`}</div>
              </footer>
            </motion.blockquote>
          ) : null}
          {supportTestimonials.map((testimonial) => (
            <motion.blockquote
              key={testimonial.id}
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">Depoimento</div>
              <p className="mt-4 text-sm text-white/70">"{testimonial.text}"</p>
              <footer className="mt-6 space-y-1 text-xs uppercase tracking-[0.35em]">
                <div className="text-white">{testimonial.name}</div>
                <div className="text-white/40">{`${testimonial.role} - ${testimonial.company}`}</div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {trustSignals.map((item) => (
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
