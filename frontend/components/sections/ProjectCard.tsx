import Card from "@/components/ui/Card";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  showYear?: boolean;
  stackLimit?: number;
  className?: string;
}

export default function ProjectCard({ project, showYear = false, stackLimit, className = "" }: ProjectCardProps) {
  const stack = stackLimit ? project.stack.slice(0, stackLimit) : project.stack;

  return (
    <Card hover className={`h-full overflow-hidden group ${className}`}>
      <div className="relative aspect-video mb-4 rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/50">
        <span>{project.category}</span>
        {showYear && <span>{project.year}</span>}
      </div>
      <h3 className="text-xl font-semibold mt-3 tracking-tight text-white">{project.title}</h3>
      <p className="text-white/60 text-sm mt-2 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2 pt-4">
        {stack.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-full border border-white/20 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/60"
          >
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
}
