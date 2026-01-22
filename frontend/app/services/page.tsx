"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/sections/AnimatedSection";
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
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Badge variant="subtle" className="mb-6">
            Serviços
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight leading-[1] text-balance uppercase">
            Equipas digitais completas, do conceito ao lançamento.
          </h1>
          <p className="text-base md:text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
            Estratégia, design e desenvolvimento com foco em resultados mensuráveis.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SectionHeading
          title="Serviços"
          subtitle="Tudo o que precisas para construir, lançar e escalar produtos digitais."
          className="mb-12"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <AnimatedSection key={service.id} delay={index * 0.08}>
              <ServiceCard service={service} showFeatures />
            </AnimatedSection>
          ))}
        </div>
      </section>

      <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          title="Processo claro e eficiente"
          subtitle="Quatro passos para manter qualidade e previsibilidade."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {processSteps.map((step, index) => (
            <AnimatedSection key={step.step} delay={index * 0.1}>
              <ProcessStep {...step} />
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-white/[0.03]">
            <SectionHeading
              title="Stack moderna, sem excesso"
              subtitle="Escolhemos tecnologia pelo impacto, não pelo hype."
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

      <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="max-w-4xl mx-auto bg-white/[0.03] text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 uppercase">Vamos falar do teu projeto?</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Diz-nos o que precisas e respondemos com um plano simples e transparente.
          </p>
          <Button href="/contact" variant="primary">
            Contactar
          </Button>
        </Card>
      </AnimatedSection>
    </div>
  );
}
