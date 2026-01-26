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
    <section className="relative py-24 text-[color:var(--foreground)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-12 top-10 h-20 w-20 rounded-full border border-white/10" />
        <div className="absolute bottom-6 right-10 h-24 w-24 rounded-full border border-white/10" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="max-w-2xl space-y-4"
        >
          <div className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent)]">Clientes</div>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Pessoas reais falando sobre resultados reais.
          </h2>
          <p className="text-sm text-[color:var(--muted)]">
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
              className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[var(--shadow-strong)] md:col-span-2"
            >
              <div className="absolute -right-6 -top-12 text-[120px] leading-none text-white/10">"</div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Depoimento principal
              </div>
              <p className="mt-5 text-base text-[color:var(--muted)]">"{leadTestimonial.text}"</p>
              <footer className="mt-8 space-y-1 text-xs uppercase tracking-[0.24em]">
                <div className="text-[color:var(--foreground)]">{leadTestimonial.name}</div>
                <div className="text-[color:var(--muted)]">{`${leadTestimonial.role} - ${leadTestimonial.company}`}</div>
              </footer>
            </motion.blockquote>
          ) : null}
          {supportTestimonials.map((testimonial) => (
            <motion.blockquote
              key={testimonial.id}
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-soft)]"
            >
              <div className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)]">Depoimento</div>
              <p className="mt-4 text-sm text-[color:var(--muted)]">"{testimonial.text}"</p>
              <footer className="mt-6 space-y-1 text-xs uppercase tracking-[0.24em]">
                <div className="text-[color:var(--foreground)]">{testimonial.name}</div>
                <div className="text-[color:var(--muted)]">{`${testimonial.role} - ${testimonial.company}`}</div>
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
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5"
            >
              <div className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)]">{item.label}</div>
              <div className="mt-3 text-lg font-semibold tracking-tight text-[color:var(--foreground)]">
                {item.value}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
