"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/sections/AnimatedSection";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.type !== "idle") {
      setStatus({ type: "idle" });
    }
  };

  const validate = (data: FormData) => {
    if (data.name.trim().length < 2) {
      return "Indica o teu nome completo.";
    }
    if (!emailRegex.test(data.email.trim())) {
      return "Indica um email válido.";
    }
    if (data.subject.trim().length < 3) {
      return "Indica um assunto válido.";
    }
    if (data.message.trim().length < 10) {
      return "A mensagem deve ter pelo menos 10 caracteres.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorMessage = validate(formData);
    if (errorMessage) {
      setStatus({ type: "error", message: errorMessage });
      return;
    }

    setStatus({ type: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: payload?.message || "Mensagem enviada com sucesso. Vamos responder em breve.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: payload?.error || "Erro ao enviar mensagem. Tenta novamente.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erro ao enviar mensagem. Tenta novamente.",
      });
    }
  };

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
            Contacto
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight leading-[1] text-balance uppercase">
            Vamos falar do teu projeto.
          </h1>
          <p className="text-base md:text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
            Diz-nos o contexto, objetivo e prazo. Respondemos com proposta e próximos passos.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <AnimatedSection className="lg:col-span-1 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">Informações</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-white/50 mb-2">Localização</div>
                  <p className="text-white">Portugal</p>
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-2">Email</div>
                  <a
                    href="mailto:contact@webfusionlab.pt"
                    className="text-[color:var(--accent)] hover:text-white transition-colors"
                  >
                    contact@webfusionlab.pt
                  </a>
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-2">Disponibilidade</div>
                  <p className="text-white/70 text-sm">
                    Segunda a Sexta: 09:00 - 18:00
                    <br />
                    Resposta em até 24 horas
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/[0.03]">
              <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">Redes sociais</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/60 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/60 flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection className="lg:col-span-2" delay={0.1}>
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/[0.02] border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--accent)] transition-colors"
                      placeholder="O teu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/[0.02] border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--accent)] transition-colors"
                      placeholder="teu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.02] border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--accent)] transition-colors"
                    placeholder="Ex: Novo website, App mobile, Consultoria"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-white/[0.02] border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--accent)] transition-colors resize-none"
                    placeholder="Conta-nos sobre o teu projeto..."
                  />
                </div>

                {status.type === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/15 border border-green-400/40 rounded-xl p-4 text-green-200 text-sm"
                  >
                    ✓ {status.message}
                  </motion.div>
                )}

                {status.type === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/15 border border-red-400/40 rounded-xl p-4 text-red-200 text-sm"
                  >
                    ✗ {status.message}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status.type === "loading" ? "A enviar..." : "Enviar Mensagem"}
                </Button>

                <p className="text-xs text-white/50 text-center">
                  Respeitamos a tua privacidade. Nunca partilhamos dados com terceiros.
                </p>
              </form>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
