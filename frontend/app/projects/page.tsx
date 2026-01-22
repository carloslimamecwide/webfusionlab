"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/sections/AnimatedSection";
import ProjectCard from "@/components/sections/ProjectCard";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { projects, categories } from "@/data/projects";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects =
    activeCategory === "Todos" ? projects : projects.filter((project) => project.category === activeCategory);

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
            Projetos
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight leading-[1] text-balance uppercase">
            Trabalho real, resultados claros.
          </h1>
          <p className="text-base md:text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
            Seleciona uma categoria e vê como resolvemos desafios em web, mobile, marketing e AI.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
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
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-white/60">Nenhum projeto encontrado nesta categoria.</p>
          </motion.div>
        )}
      </section>

      <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="max-w-4xl mx-auto bg-white/[0.03] text-center">
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
      </AnimatedSection>
    </div>
  );
}
