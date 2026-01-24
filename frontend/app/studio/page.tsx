"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/sections/PageHero";
import AnimatedSection from "@/components/sections/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const SESSION_KEY = "webfusionlab:studio";

type Category = "Web" | "Mobile" | "Marketing" | "AI";

interface AdminProfile {
  id: string;
  email: string;
  name: string;
}

interface Project {
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

interface SessionData {
  token: string;
  admin: AdminProfile;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

const emptyProjectForm = {
  title: "",
  description: "",
  category: "Web" as Category,
  year: "",
  stack: "",
  image: "",
  link: "",
};

const categoryOptions: Category[] = ["Web", "Mobile", "Marketing", "AI"];

export default function StudioPage() {
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsStatus, setProjectsStatus] = useState<FormStatus>({ type: "idle" });
  const [loginStatus, setLoginStatus] = useState<FormStatus>({ type: "idle" });
  const [actionStatus, setActionStatus] = useState<FormStatus>({ type: "idle" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState(emptyProjectForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const sessionRaw = window.localStorage.getItem(SESSION_KEY);
    if (!sessionRaw) {
      return;
    }
    try {
      const session = JSON.parse(sessionRaw) as SessionData;
      setToken(session.token);
      setAdmin(session.admin);
    } catch (error) {
      window.localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    void fetchProjects(token);
  }, [token]);

  const heroStats = useMemo(() => {
    if (!token) {
      return [];
    }
    return [
      { label: "Projetos", value: `${projects.length}`, note: "Base ativa" },
      { label: "Categorias", value: `${categoryOptions.length}`, note: "Web + Mobile" },
      { label: "Sessao", value: "24h", note: admin?.name || "Admin" },
    ];
  }, [token, projects.length, admin?.name]);

  const latestUpdate = useMemo(() => {
    const candidate = projects[0]?.updated_at || projects[0]?.created_at;
    if (!candidate) {
      return "Sem dados";
    }
    return new Date(candidate).toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, [projects]);

  const saveSession = (session: SessionData) => {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setToken(session.token);
    setAdmin(session.admin);
  };

  const clearSession = () => {
    window.localStorage.removeItem(SESSION_KEY);
    setToken(null);
    setAdmin(null);
    setProjects([]);
    setEditingId(null);
    setFormData(emptyProjectForm);
  };

  const fetchProjects = async (sessionToken: string) => {
    setProjectsStatus({ type: "loading" });
    try {
      const response = await fetch(`${API_URL}/api/admin/projects`, {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar projetos.");
      }

      const data = (await response.json()) as Project[];
      setProjects(data);
      setProjectsStatus({ type: "success", message: "Projetos atualizados." });
    } catch (error) {
      setProjectsStatus({ type: "error", message: "Nao foi possivel carregar os projetos." });
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      setLoginStatus({ type: "error", message: "Email e senha sao obrigatorios." });
      return;
    }
    setLoginStatus({ type: "loading" });
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Falha no login.");
      }
      saveSession({ token: payload.token, admin: payload.admin });
      setLoginStatus({ type: "success", message: "Login efetuado." });
      setLoginData({ email: "", password: "" });
    } catch (error) {
      setLoginStatus({ type: "error", message: "Credenciais invalidas." });
    }
  };

  const handleProjectChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetProjectForm = () => {
    setEditingId(null);
    setFormData(emptyProjectForm);
  };

  const handleProjectSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      setActionStatus({ type: "error", message: "Precisas de login." });
      return;
    }

    if (!formData.title || !formData.description || !formData.year || !formData.stack) {
      setActionStatus({ type: "error", message: "Preenche titulo, descricao, ano e stack." });
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      year: formData.year,
      stack: formData.stack.split(",").map((item) => item.trim()).filter(Boolean),
      image: formData.image || null,
      link: formData.link || null,
    };

    setActionStatus({ type: "loading" });
    try {
      const url = editingId ? `${API_URL}/api/admin/projects/${editingId}` : `${API_URL}/api/admin/projects`;
      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorPayload = await response.json();
        throw new Error(errorPayload?.error || "Erro ao salvar projeto.");
      }
      setActionStatus({ type: "success", message: editingId ? "Projeto atualizado." : "Projeto criado." });
      resetProjectForm();
      await fetchProjects(token);
    } catch (error) {
      setActionStatus({ type: "error", message: "Nao foi possivel salvar o projeto." });
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      year: project.year,
      stack: project.stack.join(", "),
      image: project.image || "",
      link: project.link || "",
    });
    setActionStatus({ type: "idle" });
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!token) {
      return;
    }
    setActionStatus({ type: "loading" });
    try {
      const response = await fetch(`${API_URL}/api/admin/projects/${projectId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Erro ao apagar projeto.");
      }
      setActionStatus({ type: "success", message: "Projeto removido." });
      await fetchProjects(token);
    } catch (error) {
      setActionStatus({ type: "error", message: "Nao foi possivel apagar o projeto." });
    }
  };

  return (
    <div className="relative">
      <PageHero
        eyebrow="Acesso restrito"
        title={
          <>
            Studio console,
            <span className="block text-[color:var(--accent)]">gestao de projetos.</span>
          </>
        }
        description="Area privada para criar, atualizar e apagar projetos com base no backend."
        meta={["JWT", "API protegida", "Admin only"]}
        tags={["Create", "Update", "Delete", "Sync"]}
        stats={heroStats}
        actions={
          token ? (
            <Button variant="secondary" onClick={clearSession}>
              Terminar sessao
            </Button>
          ) : null
        }
        right={
          token ? (
            <>
              <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-white/50">
                  <span>Session</span>
                  <span className="text-[color:var(--accent)]">Live</span>
                </div>
                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Admin</span>
                    <span className="text-white">{admin?.name || "Admin"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Email</span>
                    <span className="text-white">{admin?.email || "-"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Ultima atualizacao</span>
                    <span className="text-white">{latestUpdate}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent p-6">
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/50">Estado</div>
                <div className="mt-3 text-2xl uppercase tracking-tight text-white">Sincronizado</div>
                <p className="mt-2 text-sm text-white/60">Qualquer acao atualiza a base em tempo real.</p>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-white/50">
                  <span>Seguranca</span>
                  <span className="text-[color:var(--accent)]">JWT</span>
                </div>
                <div className="mt-6 space-y-3 text-sm text-white/70">
                  <p>Usa as credenciais de admin do backend.</p>
                  <p>Login necessario para ver e editar projetos.</p>
                </div>
              </div>
              <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent p-6">
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/50">Acesso</div>
                <div className="mt-3 text-2xl uppercase tracking-tight text-white">Privado</div>
                <p className="mt-2 text-sm text-white/60">Rota fora do menu publico.</p>
              </div>
            </>
          )
        }
      />

      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          {!token ? (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start">
              <AnimatedSection>
                <Card className="bg-white/[0.03]">
                  <SectionHeading
                    align="left"
                    eyebrow="Login"
                    title="Entrar no painel."
                    subtitle="Area privada para gerir projetos."
                    size="md"
                    className="mb-8"
                  />
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={loginData.email}
                        onChange={(event) => setLoginData((prev) => ({ ...prev, email: event.target.value }))}
                        className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--accent)]"
                        placeholder="admin@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Senha
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={(event) => setLoginData((prev) => ({ ...prev, password: event.target.value }))}
                        className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--accent)]"
                        placeholder="********"
                      />
                    </div>
                    {loginStatus.type !== "idle" ? (
                      <div
                        className={`rounded-xl border px-4 py-3 text-sm ${
                          loginStatus.type === "success"
                            ? "border-green-400/40 bg-green-500/15 text-green-200"
                            : loginStatus.type === "error"
                              ? "border-red-400/40 bg-red-500/15 text-red-200"
                              : "border-white/10 bg-white/[0.02] text-white/60"
                        }`}
                      >
                        {loginStatus.message}
                      </div>
                    ) : null}
                    <Button type="submit" className="w-full" disabled={loginStatus.type === "loading"}>
                      {loginStatus.type === "loading" ? "A validar..." : "Entrar"}
                    </Button>
                  </form>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <Card>
                  <SectionHeading
                    align="left"
                    eyebrow="Checklist"
                    title="Antes de entrar"
                    subtitle="Confirma credenciais e backend ativo."
                    size="md"
                    className="mb-6"
                  />
                  <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                      Backend ativo em `NEXT_PUBLIC_API_URL`.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                      Admin criado no seed inicial.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                      Token valido por 24h.
                    </li>
                  </ul>
                </Card>
              </AnimatedSection>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
              <AnimatedSection>
                <Card className="bg-white/[0.03]">
                  <SectionHeading
                    align="left"
                    eyebrow={editingId ? "Editar projeto" : "Novo projeto"}
                    title={editingId ? "Atualiza detalhes do projeto." : "Adicionar projeto."}
                    subtitle="Campos obrigatorios: titulo, descricao, ano, stack."
                    size="md"
                    className="mb-6"
                  />
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Titulo *
                      </label>
                      <input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleProjectChange}
                        className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--accent)]"
                        placeholder="Nome do projeto"
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-2">
                        Descricao *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleProjectChange}
                        className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--accent)]"
                        placeholder="Resumo do projeto"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium mb-2">
                          Categoria *
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleProjectChange}
                          className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-white focus:outline-none focus:border-[color:var(--accent)]"
                        >
                          {categoryOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="year" className="block text-sm font-medium mb-2">
                          Ano *
                        </label>
                        <input
                          id="year"
                          name="year"
                          value={formData.year}
                          onChange={handleProjectChange}
                          className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--accent)]"
                          placeholder="2024"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="stack" className="block text-sm font-medium mb-2">
                        Stack *
                      </label>
                      <input
                        id="stack"
                        name="stack"
                        value={formData.stack}
                        onChange={handleProjectChange}
                        className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--accent)]"
                        placeholder="Next.js, Node.js, PostgreSQL"
                      />
                    </div>
                    <div>
                      <label htmlFor="image" className="block text-sm font-medium mb-2">
                        Imagem (URL)
                      </label>
                      <input
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleProjectChange}
                        className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--accent)]"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label htmlFor="link" className="block text-sm font-medium mb-2">
                        Link (URL)
                      </label>
                      <input
                        id="link"
                        name="link"
                        value={formData.link}
                        onChange={handleProjectChange}
                        className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--accent)]"
                        placeholder="https://..."
                      />
                    </div>

                    {actionStatus.type !== "idle" ? (
                      <div
                        className={`rounded-xl border px-4 py-3 text-sm ${
                          actionStatus.type === "success"
                            ? "border-green-400/40 bg-green-500/15 text-green-200"
                            : actionStatus.type === "error"
                              ? "border-red-400/40 bg-red-500/15 text-red-200"
                              : "border-white/10 bg-white/[0.02] text-white/60"
                        }`}
                      >
                        {actionStatus.message}
                      </div>
                    ) : null}

                    <div className="flex flex-wrap items-center gap-3">
                      <Button type="submit" disabled={actionStatus.type === "loading"}>
                        {actionStatus.type === "loading"
                          ? "A guardar..."
                          : editingId
                            ? "Atualizar projeto"
                            : "Criar projeto"}
                      </Button>
                      {editingId ? (
                        <Button type="button" variant="secondary" onClick={resetProjectForm}>
                          Cancelar edicao
                        </Button>
                      ) : null}
                    </div>
                  </form>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <Card className="bg-white/[0.03]">
                  <SectionHeading
                    align="left"
                    eyebrow="Projetos"
                    title="Lista ativa."
                    subtitle="Clica para editar ou remover."
                    size="md"
                    className="mb-6"
                  />
                  {projectsStatus.type === "loading" ? (
                    <div className="text-sm text-white/60">A carregar projetos...</div>
                  ) : null}
                  <div className="space-y-4">
                    {projects.length === 0 ? (
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/60">
                        Nenhum projeto registado.
                      </div>
                    ) : null}
                    {projects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                              {project.category} • {project.year}
                            </div>
                            <div className="mt-2 text-lg uppercase tracking-tight text-white">{project.title}</div>
                            <p className="mt-2 text-sm text-white/60">{project.description}</p>
                            <div className="mt-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] text-white/45">
                              {project.stack.map((item) => (
                                <span key={`${project.id}-${item}`} className="rounded-full border border-white/10 px-3 py-1">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button variant="secondary" onClick={() => handleEditProject(project)}>
                              Editar
                            </Button>
                            <Button variant="outline" onClick={() => handleDeleteProject(project.id)}>
                              Apagar
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
