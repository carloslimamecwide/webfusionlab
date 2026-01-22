export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "web-development",
    title: "Desenvolvimento Web",
    description: "Websites, dashboards e e-commerce com foco em conversão e performance.",
    icon: "🌐",
    features: [
      "Sites institucionais responsivos",
      "Dashboards e painéis administrativos",
      "Plataformas e-commerce completas",
      "Progressive Web Apps (PWA)",
      "Otimização SEO e performance",
    ],
  },
  {
    id: "mobile-apps",
    title: "Apps iOS/Android",
    description: "Apps nativas ou híbridas com UX direta e carregamento rápido.",
    icon: "📱",
    features: [
      "Apps nativas (Swift/Kotlin)",
      "Apps híbridas (React Native)",
      "Design UI/UX para mobile",
      "Integração com APIs",
      "Publicação nas stores",
    ],
  },
  {
    id: "web-apps",
    title: "Web Apps & SaaS",
    description: "Plataformas web e SaaS com arquitetura pronta para crescer.",
    icon: "💻",
    features: [
      "Sistemas de gestão customizados",
      "Portais internos para empresas",
      "Plataformas SaaS multi-tenant",
      "Integrações com sistemas legados",
      "Arquitetura cloud-native",
    ],
  },
  {
    id: "marketing-digital",
    title: "Marketing Digital",
    description: "Estratégia digital orientada a aquisição e conversão.",
    icon: "📊",
    features: [
      "SEO técnico e de conteúdo",
      "Gestão de campanhas Google Ads",
      "Marketing de conteúdo",
      "Email marketing automatizado",
      "Analytics e otimização",
    ],
  },
  {
    id: "ai-automation",
    title: "Automação & AI",
    description: "Automação para reduzir tempo operacional e erros.",
    icon: "🤖",
    features: [
      "Chatbots inteligentes",
      "Automação de workflows",
      "Integração de APIs e serviços",
      "Análise preditiva com ML",
      "Processamento de linguagem natural",
    ],
  },
  {
    id: "consulting",
    title: "Consultoria Tech",
    description: "Apoio técnico para decisões de produto e arquitetura.",
    icon: "💡",
    features: [
      "Auditoria técnica de sistemas",
      "Arquitetura de software",
      "Estratégia de transformação digital",
      "Code review e otimização",
      "Formação de equipas técnicas",
    ],
  },
];
