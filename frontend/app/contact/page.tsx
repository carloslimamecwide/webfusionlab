"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

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

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
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
      return "Indica um email valido.";
    }
    if (data.subject.trim().length < 3) {
      return "Indica um assunto valido.";
    }
    if (data.message.trim().length < 10) {
      return "A mensagem deve ter pelo menos 10 caracteres.";
    }
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
          message: payload?.message || "Mensagem enviada com sucesso. Vou responder em breve.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: payload?.error || "Erro ao enviar mensagem. Tenta novamente.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Erro ao enviar mensagem. Tenta novamente.",
      });
    }
  };

  return (
    <div className="relative">
      <PageHero
        eyebrow="Contacto"
        title={
          <>
            Conta-me o que precisas
            <span className="block text-[color:var(--accent)]">e eu respondo com clareza.</span>
          </>
        }
        description="Se ja souberes objetivo, prazo ou budget, inclui isso na mensagem. Se ainda estiveres a organizar ideias, tambem serve."
        meta={["Portugal", "Remote"]}
        stats={[{ label: "Resposta", value: "< 24h", note: "Dias uteis" }]}
      />

      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
            <div className="space-y-6">
              <Card>
                <h3 className="mb-4 text-lg font-semibold tracking-wide text-[color:var(--foreground)]">Informacoes</h3>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 text-sm text-[color:var(--muted)]">Localizacao</div>
                    <p className="text-[color:var(--foreground)]">Portugal</p>
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-[color:var(--muted)]">Email</div>
                    <a
                      href="mailto:contact@webfusionlab.pt"
                      className="text-[color:var(--accent)] transition-colors hover:text-[color:var(--foreground)]"
                    >
                      contact@webfusionlab.pt
                    </a>
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-[color:var(--muted)]">Disponibilidade</div>
                    <p className="text-sm text-[color:var(--muted)]">
                      Segunda a Sexta: 09:00 - 18:00
                      <br />
                      Resposta em ate 24 horas
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-[color:var(--surface)]">
                <h3 className="mb-4 text-lg font-semibold tracking-wide text-[color:var(--foreground)]">O que esperar</h3>
                <ul className="space-y-3 text-sm text-[color:var(--muted)]">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                    Diagnostico rapido do teu pedido.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                    Proposta com escopo e proximos passos.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                    Execucao focada no que realmente precisas.
                  </li>
                </ul>
              </Card>
            </div>

            <div>
              <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Nome *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] transition-colors focus:border-[color:var(--accent)] focus:outline-none"
                        placeholder="O teu nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] transition-colors focus:border-[color:var(--accent)] focus:outline-none"
                        placeholder="teu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                      Assunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] transition-colors focus:border-[color:var(--accent)] focus:outline-none"
                      placeholder="Ex: novo website, app mobile, automacao"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full resize-none rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] transition-colors focus:border-[color:var(--accent)] focus:outline-none"
                      placeholder="Conta-me o contexto, objetivo e o que gostavas de melhorar."
                    />
                  </div>

                  {status.type === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-green-400/40 bg-green-500/15 p-4 text-sm text-green-200"
                    >
                      ✓ {status.message}
                    </motion.div>
                  ) : null}

                  {status.type === "error" ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-red-400/40 bg-red-500/15 p-4 text-sm text-red-200"
                    >
                      ✗ {status.message}
                    </motion.div>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={status.type === "loading"}
                    className="w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status.type === "loading" ? "A enviar..." : "Enviar mensagem"}
                  </Button>

                  <p className="text-center text-xs text-[color:var(--muted)]">
                    Respeitamos a tua privacidade. Nunca partilhamos dados com terceiros.
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
