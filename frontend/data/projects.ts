export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "Web" | "Mobile" | "Marketing" | "AI";
  year: string;
  stack: string[];
  image: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "portal-saude",
    title: "Portal de Saúde Digital",
    description:
      "Plataforma web para gestão de consultas, telemedicina e histórico clínico com área segura para pacientes.",
    category: "Web",
    year: "2024",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1580281657527-47f249e8f6f8?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
  {
    id: "2",
    slug: "fit-track",
    title: "App de Fitness e Nutrição",
    description:
      "Aplicação mobile com planos personalizados, monitorização de treinos e integração com dispositivos.",
    category: "Mobile",
    year: "2024",
    stack: ["React Native", "Node.js", "MongoDB", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
  {
    id: "3",
    slug: "ai-support",
    title: "Assistente de Suporte com AI",
    description:
      "Automação de resposta a clientes com NLP, encaminhamento inteligente e relatórios de qualidade.",
    category: "AI",
    year: "2023",
    stack: ["Python", "OpenAI", "React", "FastAPI"],
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
];

export const categories = ["Todos", "Web", "Mobile", "Marketing", "AI"];
