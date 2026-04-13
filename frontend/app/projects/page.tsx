import PageHero from "@/components/sections/PageHero";
import ProjectCard from "@/components/sections/ProjectCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects as fallbackProjects } from "@/data/projects";

interface ProjectRecord {
  id: string;
  title: string;
  description: string;
  category: "Web" | "Mobile" | "Marketing" | "AI";
  year: string;
  stack: string[];
  image?: string | null;
  slug?: string;
  link?: string | null;
}

async function getProjects(): Promise<ProjectRecord[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return fallbackProjects;
  }

  try {
    const response = await fetch(`${apiUrl}/api/public/projects`, { cache: "no-store" });
    if (!response.ok) {
      return fallbackProjects;
    }

    const data = (await response.json()) as ProjectRecord[];
    return data.length > 0 ? data : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="relative">
      <PageHero
        eyebrow="Projetos"
        title={
          <>
            Projetos escolhidos
            <span className="block text-[color:var(--accent)]">para mostrar o tipo de trabalho.</span>
          </>
        }
        description="Uma selecao curta para mostrar como penso produto, execucao e clareza visual."
        meta={["Portugal", "Remote"]}
        stats={[{ label: "Projetos", value: `${projects.length}`, note: "Portfolio selecionado" }]}
        actions={
          <Button href="/contact" variant="primary">
            Falar sobre um projeto
          </Button>
        }
      />

      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SectionHeading
            align="left"
            eyebrow="Portfolio"
            title="Menos quantidade, mais contexto."
            subtitle="Em vez de dezenas de cards, a pagina mostra apenas projetos suficientes para perceber o tipo de entrega."
            className="mb-10"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} showYear stackLimit={3} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Card className="bg-[color:var(--surface)] text-center">
            <SectionHeading
              title="Queres algo semelhante?"
              subtitle="Partilha o objetivo do projeto e envio uma resposta curta com o melhor caminho."
              size="md"
              className="mb-8"
            />
            <Button href="/contact" variant="primary">
              Contactar
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
