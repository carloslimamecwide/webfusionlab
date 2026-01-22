"use client";

import { easeOut, motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

const people = [
  {
    name: "Carlos Lima",
    role: "Desenvolvedor",
    bio: "Engenharia de produto com foco em performance, arquitetura e experiências digitais que escalam.",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mariana Alves",
    role: "Marketing & Growth",
    bio: "Estratégia, narrativa e execução para posicionar marcas e acelerar aquisição com clareza.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  },
];

export default function AboutPage() {
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
            Sobre
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight leading-[1] text-balance uppercase">
            Uma equipa pequena, com foco absoluto em impacto.
          </h1>
          <p className="text-base md:text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
            Desenvolvimento e marketing trabalham juntos desde o primeiro dia para criar experiências consistentes,
            rápidas e orientadas ao negócio.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {people.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: easeOut, delay: index * 0.08 }}
            >
              <Card className="h-full">
                <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10">
                  <img src={person.image} alt={person.name} className="h-72 w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--accent)]">{person.role}</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight uppercase">{person.name}</h2>
                <p className="mt-4 text-sm text-white/60 leading-relaxed">{person.bio}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
