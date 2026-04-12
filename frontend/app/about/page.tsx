import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";

const principles = [
  {
    title: "Clareza antes de volume",
    description: "Prefiro um site ou produto simples e util a uma solucao cheia de blocos desnecessarios.",
  },
  {
    title: "Execucao focada",
    description: "O trabalho e organizado para sair rapidamente, sem perder qualidade nem manutencao.",
  },
  {
    title: "Relacao direta",
    description: "Sem excesso de camadas. Falas com quem pensa e executa o projeto.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Sobre"
        title={
          <>
            Um estudio pequeno,
            <span className="block text-[color:var(--accent)]">com foco no que realmente ajuda.</span>
          </>
        }
        description="A WebFusionLab existe para criar websites, apps e automacoes sem excesso de ruido visual, tecnico ou comercial."
        meta={["Portugal", "Remote"]}
        tags={["Websites", "Apps", "Automacao"]}
        actions={
          <Button href="/contact" variant="primary">
            Falar comigo
          </Button>
        }
      />

      <section className="relative py-20">
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start">
            <SectionHeading
              align="left"
              eyebrow="Forma de trabalhar"
              title="Menos ruido, mais utilidade."
              subtitle="O objetivo nao e impressionar com volume. E resolver o problema certo com uma execucao limpa."
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
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Resumo"
            title="O que podes esperar quando trabalhas comigo."
            subtitle="Um processo curto, comunicacao direta e foco no que melhora o negocio."
            className="mb-8"
          />
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)]">01</div>
              <div className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">Diagnostico rapido</div>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                Entendemos primeiro o que e essencial e cortamos o resto.
              </p>
            </Card>
            <Card>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)]">02</div>
              <div className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">Escopo claro</div>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                A proposta mostra prioridades, nao uma lista interminavel de extras.
              </p>
            </Card>
            <Card>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)]">03</div>
              <div className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">Entrega limpa</div>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                O resultado final precisa de ser facil de usar, manter e continuar a evoluir.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
