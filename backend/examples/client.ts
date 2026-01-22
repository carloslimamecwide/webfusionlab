/**
 * Cliente exemplo para consumir a API de Admin
 * Usar em uma aplicação frontend (React, Vue, etc)
 */

const API_URL = "http://localhost:3000/api";

interface LoginResponse {
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
  };
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: "Web" | "Mobile" | "Marketing" | "AI";
  year: string;
  stack: string[];
  image?: string;
  link?: string;
  admin_id: string;
  created_at: string;
  updated_at: string;
}

class AdminClient {
  private token: string | null = null;

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login falhou");
    }

    const data = await response.json();
    this.token = data.token;
    localStorage.setItem("admin_token", data.token);
    return data;
  }

  async logout(): Promise<void> {
    this.token = null;
    localStorage.removeItem("admin_token");
  }

  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token || localStorage.getItem("admin_token")}`,
    };
  }

  // Projects
  async listProjects(): Promise<Project[]> {
    const response = await fetch(`${API_URL}/admin/projects`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Erro ao listar projetos");
    }

    return response.json();
  }

  async getProject(id: string): Promise<Project> {
    const response = await fetch(`${API_URL}/admin/projects/${id}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Projeto não encontrado");
    }

    return response.json();
  }

  async createProject(project: Omit<Project, "id" | "admin_id" | "created_at" | "updated_at">): Promise<Project> {
    const response = await fetch(`${API_URL}/admin/projects`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar projeto");
    }

    return response.json();
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const response = await fetch(`${API_URL}/admin/projects/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar projeto");
    }

    return response.json();
  }

  async deleteProject(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/admin/projects/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar projeto");
    }
  }

  // Public API
  async getPublicProjects(): Promise<Project[]> {
    const response = await fetch(`${API_URL}/public/projects`);

    if (!response.ok) {
      throw new Error("Erro ao buscar projetos públicos");
    }

    return response.json();
  }
}

// Exemplo de uso
async function exemplo() {
  const client = new AdminClient();

  try {
    // 1. Login
    console.log("📝 Fazendo login...");
    const loginResult = await client.login("admin@webfusionlab.pt", "admin123");
    console.log("✅ Login bem-sucedido!");
    console.log(loginResult);

    // 2. Listar projetos
    console.log("\n📋 Listando projetos...");
    const projects = await client.listProjects();
    console.log("Projetos:", projects);

    // 3. Criar projeto
    console.log("\n✨ Criando novo projeto...");
    const newProject = await client.createProject({
      title: "Novo Projeto",
      description: "Um projeto de exemplo",
      category: "Web",
      year: "2024",
      stack: ["Next.js", "TypeScript"],
      image: "https://...",
      link: "https://...",
    });
    console.log("Projeto criado:", newProject);

    // 4. Atualizar projeto
    console.log("\n✏️  Atualizando projeto...");
    const updated = await client.updateProject(newProject.id, {
      title: "Projeto Atualizado",
    });
    console.log("Projeto atualizado:", updated);

    // 5. Deletar projeto
    console.log("\n🗑️  Deletando projeto...");
    await client.deleteProject(newProject.id);
    console.log("Projeto deletado!");
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

// Exportar para uso em módulos
export default AdminClient;
