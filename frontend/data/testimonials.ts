export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "João Silva",
    role: "CEO",
    company: "TechStart",
    text: "A WebFusionLab transformou completamente a nossa presença digital. O website desenvolvido superou as expectativas e aumentou as conversões em 150%.",
  },
  {
    id: "2",
    name: "Maria Santos",
    role: "Diretora de Marketing",
    company: "FashionCo",
    text: "Profissionalismo e qualidade excecional. A equipa entendeu perfeitamente as nossas necessidades e entregou um e-commerce impecável.",
  },
  {
    id: "3",
    name: "Pedro Costa",
    role: "Fundador",
    company: "HealthPlus",
    text: "A implementação do chatbot AI reduziu o tempo de resposta em 70%. Solução inteligente que realmente faz diferença no nosso negócio.",
  },
];
