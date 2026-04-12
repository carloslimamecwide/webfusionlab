import PageHero from "@/components/sections/PageHero";
import ServiceCard from "@/components/sections/ServiceCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

const processSteps = [
  {
    step: "01",
    title: "Diagnostico",
    description: "Alinhamos objetivo, publico e o que faz realmente falta.",
  },
  {
    step: "02",
    title: "Proposta",
    description: "Recebes uma solucao curta, com prioridades e escopo claro.",
  },
  {
    step: "03",
    title: "Execucao",
    description: "Desenho, desenvolvimento e entrega sem excesso de camadas.",
  },
];

export default function ServicesPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Servicos"
        title={
          <>
            Servicos digitais
            <span className="block text-[color:var(--accent)]">diretos ao ponto.</span>
          </>
        }
        description="Websites, apps e automacao para negocios que precisam de algo funcional, rapido e facil de manter."
        meta={["Portugal", "Remote"]}
        tags={["Websites", "Apps", "Web Apps", "Automacao"]}
        actions={
          <Button href="/contact" variant="primary">
            Pedir proposta
          </Button>
        }
      />

      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SectionHeading
            align="left"
            eyebrow="Servicos"
            title="Escolhe apenas o que faz sentido para o teu projeto."
            subtitle="Cada servico existe para resolver um problema concreto, sem encher o processo com extras."
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} showFeatures />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SectionHeading
            align="left"
            eyebrow="Processo"
            title="Uma forma simples de trabalhar."
            subtitle="O objetivo e reduzir duvidas, encurtar decisoes e chegar mais depressa ao que interessa."
            className="mb-10"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {processSteps.map((step) => (
              <Card key={step.step}>
                <div className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)]">{step.step}</div>
                <div className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">
                  {step.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Card className="bg-[color:var(--surface)] text-center">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Vamos ver o que faz sentido para o teu caso?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-[color:var(--muted)]">
              Partilha o contexto do projeto e respondo com um plano simples, sem proposta inflacionada.
            </p>
            <Button href="/contact" variant="primary">
              Contactar
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
