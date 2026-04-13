import ProjectCard from "@/components/sections/ProjectCard";
import ServiceCard from "@/components/sections/ServiceCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

const quickFacts = [
  { label: "foco teste", value: "Clareza e conversao" },
  { label: "Formato", value: "Portugal / Remote" },
  { label: "Entrega", value: "Proposta simples" },
];

const workflow = [
  "Dizes o objetivo e o contexto do projeto.",
  "Recebes uma proposta curta com prioridades.",
  "Executamos com foco no essencial.",
];

export default function Home() {
  return (
    <div className="relative text-[color:var(--foreground)]">
      <section className="relative overflow-hidden pb-20 pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(216,242,106,0.24),transparent_65%)] blur-[120px]" />
          <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] blur-[120px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-10">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
              <span className="text-[color:var(--accent)]">WebFusionLab</span>
              <span>Portugal</span>
              <span>Remote</span>
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl">
              Websites, apps e automacao feitos para vender melhor.
            </h1>
            <p className="max-w-2xl text-base text-[color:var(--muted)] md:text-lg">
              Presenca digital clara, rapida e sem ruido. Trabalho com negocios que precisam de lancar, melhorar ou
              simplificar o que ja existe.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary">
                Pedir proposta
              </Button>
              <Button href="/services" variant="outline">
                Ver servicos
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {quickFacts.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4"
                >
                  <div className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)]">{item.label}</div>
                  <div className="mt-2 text-sm font-medium tracking-tight text-[color:var(--foreground)]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Card className="rounded-3xl p-6">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent)]">O que faco</div>
              <ul className="mt-5 space-y-3 text-sm text-[color:var(--muted)]">
                <li className="border-b border-white/10 pb-3">Websites e landing pages orientadas a conversao.</li>
                <li className="border-b border-white/10 pb-3">Web apps e areas privadas para operar melhor.</li>
                <li>Automacoes para retirar trabalho manual da equipa.</li>
              </ul>
            </Card>

            <Card className="rounded-3xl p-6">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--muted)]">Processo</div>
              <ol className="mt-5 space-y-4">
                {workflow.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="text-sm font-semibold text-[color:var(--accent)]">{`0${index + 1}`}</span>
                    <span className="text-sm text-[color:var(--muted)]">{step}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SectionHeading
            align="left"
            eyebrow="Servicos"
            title="O essencial para criar ou melhorar a tua presenca digital."
            subtitle="Sem pacotes confusos. So servicos que ajudam a vender, operar e crescer online."
            className="mb-10"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SectionHeading
            align="left"
            eyebrow="Projetos"
            title="Alguns tipos de projeto que desenvolvo."
            subtitle="Exemplos simples para perceber o tipo de trabalho, sem encher a pagina com promessas vagas."
            className="mb-10"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} showYear stackLimit={3} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-10">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Card className="rounded-3xl p-8 text-center shadow-[var(--shadow-strong)]">
            <div className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent)]">Contacto</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--foreground)] md:text-4xl">
              Se fizer sentido, marcamos uma conversa curta.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)] md:text-base">
              Explicas o objetivo, eu devolvo uma proposta direta com escopo, prioridade e proximos passos.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact">Falar comigo</Button>
              <Button href="/projects" variant="outline">
                Ver projetos
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
