"use client";

import AnimatedSection from "@/components/sections/AnimatedSection";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import ServiceCard from "@/components/sections/ServiceCard";
import ProcessStep from "@/components/sections/ProcessStep";
import { services } from "@/data/services";

const processSteps = [
  {
    step: "01",
    title: "Descoberta",
    description: "Entendemos objetivos, público e restrições técnicas.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Design",
    description: "Fluxos, UX e UI alinhados com conversão.",
    icon: "🎨",
  },
  {
    step: "03",
    title: "Desenvolvimento",
    description: "Implementação rápida, testes e performance.",
    icon: "⚡",
  },
  {
    step: "04",
    title: "Lançamento",
    description: "Deploy seguro, monitorização e iteração.",
    icon: "🚀",
  },
];

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "React Native",
  "Flutter",
  "AWS",
  "Docker",
  "OpenAI",
  "Stripe",
];

export default function ServicesPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Servicos"
        title={
          <>
            Equipas digitais completas,
            <span className="block text-[color:var(--accent)]">do conceito ao lancamento.</span>
          </>
        }
        description="Estrategia, design e desenvolvimento com foco em resultados mensuraveis."
        meta={["Squad modular", "Portugal", "Remote"]}
        tags={["Estrategia", "Design", "Engenharia", "Growth"]}
        stats={[
          { label: "Tempo medio", value: "6-8 semanas", note: "Roadmap validado" },
          { label: "Ritmo", value: "2 sprints/mes", note: "QA continuo" },
          { label: "SLA", value: "2h resposta", note: "Canal dedicado" },
        ]}
        right={
          <>
            <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-white/50">
                <span>Pacotes</span>
                <span className="text-[color:var(--accent)]">Live</span>
              </div>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Sprint 1</span>
                  <span className="text-white">Descoberta + UX</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Sprint 2</span>
                  <span className="text-white">UI + Prototype</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Sprints 3+</span>
                  <span className="text-white">Build + Growth</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent p-6">
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/50">Stack</div>
              <div className="mt-3 text-2xl uppercase tracking-tight text-white">Moderna, sem hype</div>
              <p className="mt-2 text-sm text-white/60">Ferramentas escolhidas pela velocidade e escala.</p>
            </div>
          </>
        }
      />

      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SectionHeading
            align="left"
            eyebrow="Servicos"
            title="Tudo o que precisas para construir, lancar e escalar."
            subtitle="Equipas flexiveis, com especialistas senior em cada etapa."
            className="mb-12"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service.id} delay={index * 0.08}>
              <ServiceCard service={service} showFeatures />
            </AnimatedSection>
          ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="relative py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SectionHeading
            align="left"
            eyebrow="Metodo"
            title="Processo claro e eficiente."
            subtitle="Quatro passos para manter qualidade e previsibilidade."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.step} delay={index * 0.1}>
                <ProcessStep {...step} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="relative py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Card className="bg-white/[0.03]">
            <SectionHeading
              align="left"
              eyebrow="Stack"
              title="Stack moderna, sem excesso"
              subtitle="Escolhemos tecnologia pelo impacto, nao pelo hype."
              size="md"
              className="mb-8"
            />
            <div className="flex flex-wrap gap-3">
              {stack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </AnimatedSection>

      <AnimatedSection className="relative py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Card className="bg-white/[0.03] text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 uppercase">Vamos falar do teu projeto?</h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Diz-nos o que precisas e respondemos com um plano simples e transparente.
            </p>
            <Button href="/contact" variant="primary">
              Contactar
            </Button>
          </Card>
        </div>
      </AnimatedSection>
    </div>
  );
}
