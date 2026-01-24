"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/sections/AnimatedSection";
import PageHero from "@/components/sections/PageHero";
import ProjectCard from "@/components/sections/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const categories = ["Todos", "Web", "Mobile", "Marketing", "AI"];

type Category = "Web" | "Mobile" | "Marketing" | "AI";

interface ProjectRecord {
  id: string;
  title: string;
  description: string;
  category: Category;
  year: string;
  stack: string[];
  image?: string | null;
  link?: string | null;
  created_at?: string;
  updated_at?: string;
}

const caseMix = [
  { label: "SaaS", value: "14" },
  { label: "E-commerce", value: "09" },
  { label: "Health", value: "06" },
  { label: "Fintech", value: "04" },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      if (!API_URL) {
        setStatus("error");
        return;
      }
      setStatus("loading");
      try {
        const response = await fetch(`${API_URL}/api/public/projects`);
        if (!response.ok) {
          throw new Error("Erro ao carregar projetos.");
        }
        const data = (await response.json()) as ProjectRecord[];
        if (!isMounted) {
          return;
        }
        setProjects(data);
        setStatus("idle");
      } catch (error) {
        if (!isMounted) {
          return;
        }
        setStatus("error");
      }
    };

    void fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Todos") {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  const heroStats = useMemo(() => {
    return [
      { label: "Projetos", value: `${projects.length}`, note: "2019-2024" },
      { label: "Categorias", value: `${categories.length - 1}`, note: "Web + Mobile" },
      { label: "Impacto", value: "+27% retencao", note: "Media clientes" },
    ];
  }, [projects.length]);

  return (
    <div className="relative">
      <PageHero
        eyebrow="Projetos"
        title={
          <>
            Trabalho real,
            <span className="block text-[color:var(--accent)]">resultados claros.</span>
          </>
        }
        description="Seleciona uma categoria e ve como resolvemos desafios em web, mobile, marketing e AI."
        meta={["Portfolio vivo", "Portugal + EU", "2019-2024"]}
        tags={["SaaS", "E-commerce", "Health", "Fintech"]}
        stats={heroStats}
        right={
          <>
            <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-white/50">
                <span>Case mix</span>
                <span className="text-[color:var(--accent)]">Live</span>
              </div>
              <div className="mt-6 space-y-3">
                {caseMix.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{item.label}</span>
                    <span className="text-lg uppercase tracking-tight text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent p-6">
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/50">Selecao</div>
              <div className="mt-3 text-2xl uppercase tracking-tight text-white">Casos com pressao real</div>
              <p className="mt-2 text-sm text-white/60">Projetos de crescimento, produto e rebrand.</p>
            </div>
          </>
        }
      />

      <section className="relative pb-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SectionHeading
            align="left"
            eyebrow="Filtro"
            title="Explora por categoria."
            subtitle="Agrupamos por tipo de produto para facilitar a leitura."
            className="mb-8"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
                aria-pressed={activeCategory === category}
                className={`
                  px-5 py-2 rounded-full text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-300 border
                  ${
                    activeCategory === category
                      ? "bg-[color:var(--accent)] text-black border-transparent"
                      : "bg-transparent text-white/60 hover:text-white border-white/20"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          {status === "loading" ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-white/60">
              A carregar projetos...
            </div>
          ) : null}
          {status === "error" ? (
            <div className="rounded-2xl border border-red-400/40 bg-red-500/15 p-6 text-sm text-red-200">
              Nao foi possivel carregar os projetos. Confirma `NEXT_PUBLIC_API_URL`.
            </div>
          ) : null}
          <motion.div layout className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProjectCard project={project} showYear />
              </motion.div>
            ))}
          </motion.div>

          {status === "idle" && filteredProjects.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-white/60">Nenhum projeto encontrado nesta categoria.</p>
            </motion.div>
          ) : null}
        </div>
      </section>

      <AnimatedSection className="relative py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Card className="bg-white/[0.03] text-center">
            <SectionHeading
              title="Queres um projeto semelhante?"
              subtitle="Partilha o teu objetivo e respondemos com uma proposta clara."
              size="md"
              className="mb-8"
            />
            <Button href="/contact" variant="primary">
              Contactar
            </Button>
          </Card>
        </div>
      </AnimatedSection>
    </div>
  );
}
