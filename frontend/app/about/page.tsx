"use client";

import { easeOut, motion } from "framer-motion";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const people = [
  {
    name: "Carlos Lima",
    role: "Desenvolvedor",
    bio: "Engenharia de produto com foco em performance, arquitetura e experiencias digitais que escalam.",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mariana Alves",
    role: "Marketing & Growth",
    bio: "Estrategia, narrativa e execucao para posicionar marcas e acelerar aquisicao com clareza.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  },
];

const heroStats = [
  { label: "Fundado", value: "2019", note: "Lisboa + Porto" },
  { label: "Projetos", value: "38", note: "Web, SaaS, Mobile" },
  { label: "Regioes", value: "EU + LATAM", note: "Remote first" },
];

const studioSignals = [
  { label: "Foco", value: "Produto + Growth" },
  { label: "Ritmo", value: "Sprints quinzenais" },
  { label: "Entrega", value: "QA + Launch" },
];

const principles = [
  {
    title: "Clareza radical",
    description: "Backlog curto, prioridades fechadas e comunicacao direta.",
  },
  {
    title: "Velocidade com cuidado",
    description: "Teste, revisao e entrega sem atalhos.",
  },
  {
    title: "Impacto mensuravel",
    description: "Cada sprint precisa de um resultado verificavel.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Sobre"
        title={
          <>
            Uma equipa pequena,
            <span className="block text-[color:var(--accent)]">com foco absoluto em impacto.</span>
          </>
        }
        description="Desenvolvimento e marketing trabalham juntos desde o primeiro dia para criar experiencias consistentes, rapidas e orientadas ao negocio."
        meta={["Studio boutique", "Portugal", "Remote"]}
        tags={["Produto", "Growth", "Design", "Engenharia"]}
        stats={heroStats}
        right={
          <>
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-strong)]">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
                <span>Studio DNA</span>
                <span className="text-[color:var(--accent)]">Live</span>
              </div>
              <div className="mt-5 space-y-4">
                {studioSignals.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-[color:var(--muted)]">{item.label}</span>
                    <span className="text-lg font-medium tracking-tight text-[color:var(--foreground)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--muted)]">Metodo</div>
              <div className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                Diagnostico + entrega
              </div>
              <p className="mt-3 text-sm text-[color:var(--muted)]">Roadmap claro e execucao rapida em squads.</p>
            </div>
          </>
        }
      />

      <section className="relative py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-10 h-28 w-28 rounded-full border border-white/10" />
          <div className="absolute right-12 bottom-10 h-36 w-36 rounded-full border border-white/10" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start">
            <SectionHeading
              align="left"
              eyebrow="Manifesto"
              title="Princípios que guiam cada sprint."
              subtitle="Trabalhamos com foco, transparência e entregas que realmente mudam o negocio."
            />
            <div className="space-y-4">
              {principles.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)]">Principio</div>
                  <div className="mt-3 text-lg font-semibold tracking-tight text-[color:var(--foreground)]">{item.title}</div>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <SectionHeading
            align="left"
            eyebrow="Equipa"
            title="Gente senior, alinhada e direta."
            subtitle="Poucas pessoas, muitas entregas. Trabalhamos lado a lado com o teu time."
            className="mb-10"
          />
          <div className="grid gap-8 md:grid-cols-2">
          {people.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: easeOut, delay: index * 0.08 }}
            >
              <Card className="h-full">
                <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10">
                  <img src={person.image} alt={person.name} className="h-72 w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--accent)]">{person.role}</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">{person.name}</h2>
                <p className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">{person.bio}</p>
              </Card>
            </motion.div>
          ))}
          </div>
        </div>
      </section>
    </div>
  );
}
