export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "websites",
    title: "Websites & Landing Pages",
    description: "Sites rapidos, claros e focados em contacto, pedido de proposta ou venda.",
    icon: "01",
    features: [
      "Estrutura e copy base orientadas a conversao",
      "Design responsivo e performance",
      "SEO tecnico e integracoes essenciais",
    ],
  },
  {
    id: "web-apps",
    title: "Web Apps & SaaS",
    description: "Areas privadas, dashboards e plataformas feitas para operar melhor e crescer sem refazer tudo.",
    icon: "02",
    features: [
      "Dashboards, backoffice e portais internos",
      "Pagamentos, APIs e integracoes",
      "Arquitetura pronta para evoluir",
    ],
  },
  {
    id: "mobile-apps",
    title: "Apps Mobile",
    description: "Apps simples e uteis para iOS e Android, com UX direta e tecnologia adequada ao projeto.",
    icon: "03",
    features: [
      "UX mobile focada em uso real",
      "Integracao com backend e notificacoes",
      "Publicacao e manutencao",
    ],
  },
  {
    id: "ai-automation",
    title: "Automacao & AI",
    description: "Automacoes que retiram trabalho manual, ligam ferramentas e aceleram equipas.",
    icon: "04",
    features: [
      "Integracao entre ferramentas e APIs",
      "Fluxos automaticos e assistentes",
      "Reducao de tarefas repetitivas",
    ],
  },
];
