import { Request, Response } from "express";
import {
  getAdminByEmail,
  createAdmin,
  verifyPassword,
  getAdminById,
  updateAdminCredentials,
  createProject,
  getProjectsByAdminId,
  getProjectById,
  updateProject,
  deleteProject,
} from "../services/adminService";
import { generateToken } from "../middleware/auth";
import { ProjectInput } from "../types";

export async function loginAdmin(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email e senha são obrigatórios" });
      return;
    }

    const admin = await getAdminByEmail(email);
    if (!admin) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return;
    }

    const validPassword = await verifyPassword(password, admin.password);
    if (!validPassword) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return;
    }

    const token = generateToken(admin.id, admin.email);
    res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
}

export async function registerAdmin(req: Request, res: Response): Promise<void> {
  try {
    const isProd = process.env.NODE_ENV === "production";
    if (isProd) {
      const setupToken = process.env.ADMIN_REGISTRATION_TOKEN;
      if (!setupToken) {
        res.status(403).json({ error: "Registro de admin desabilitado" });
        return;
      }

      const requestToken = req.header("x-admin-setup-token");
      if (requestToken !== setupToken) {
        res.status(403).json({ error: "Token de registro inválido" });
        return;
      }
    }

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ error: "Email, senha e nome são obrigatórios" });
      return;
    }

    const existingAdmin = await getAdminByEmail(email);
    if (existingAdmin) {
      res.status(400).json({ error: "Este email já está registrado" });
      return;
    }

    const newAdmin = await createAdmin(email, password, name);
    if (newAdmin) {
      res.status(201).json({
        message: "Admin criado com sucesso",
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
          name: newAdmin.name,
        },
      });
    } else {
      res.status(500).json({ error: "Erro ao criar admin" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar admin" });
  }
}

export async function updateAdminProfile(req: Request, res: Response): Promise<void> {
  try {
    const adminId = req.admin?.adminId;
    if (!adminId) {
      res.status(401).json({ error: "Token não fornecido" });
      return;
    }

    const { currentPassword, newEmail, newPassword } = req.body;

    if (!currentPassword) {
      res.status(400).json({ error: "Senha atual é obrigatória para validação" });
      return;
    }

    if (!newEmail && !newPassword) {
      res.status(400).json({ error: "Forneça pelo menos um novo email ou nova senha" });
      return;
    }

    const admin = await getAdminById(adminId);
    if (!admin) {
      res.status(404).json({ error: "Admin não encontrado" });
      return;
    }

    const validPassword = await verifyPassword(currentPassword, admin.password);
    if (!validPassword) {
      res.status(401).json({ error: "Senha atual incorreta" });
      return;
    }

    if (newEmail && newEmail !== admin.email) {
      const existingAdmin = await getAdminByEmail(newEmail);
      if (existingAdmin) {
        res.status(400).json({ error: "Este email já está em uso" });
        return;
      }
    }

    const updated = await updateAdminCredentials(adminId, newEmail || undefined, newPassword || undefined);

    if (updated) {
      res.json({
        message: "Credenciais atualizadas com sucesso",
        admin: {
          id: updated.id,
          email: updated.email,
          name: updated.name,
        },
      });
    } else {
      res.status(500).json({ error: "Erro ao atualizar credenciais" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar perfil" });
  }
}

export async function listAdminProjects(req: Request, res: Response): Promise<void> {
  try {
    const adminId = req.admin?.adminId;
    if (!adminId) {
      res.status(401).json({ error: "Token não fornecido" });
      return;
    }
    const projects = await getProjectsByAdminId(adminId);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
}

export async function createAdminProject(req: Request, res: Response): Promise<void> {
  try {
    const adminId = req.admin?.adminId;
    if (!adminId) {
      res.status(401).json({ error: "Token não fornecido" });
      return;
    }

    const { title, description, category, year, stack, image, link } = req.body;

    if (!title || !description || !category || !year || !stack) {
      res.status(400).json({ error: "Campos obrigatórios: title, description, category, year, stack" });
      return;
    }

    const projectData: ProjectInput = {
      title,
      description,
      category,
      year,
      stack,
      image,
      link,
    };

    const project = await createProject(adminId, projectData);
    if (project) {
      res.status(201).json(project);
    } else {
      res.status(500).json({ error: "Erro ao criar projeto" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
}

export async function getAdminProject(req: Request, res: Response): Promise<void> {
  try {
    const adminId = req.admin?.adminId;
    if (!adminId) {
      res.status(401).json({ error: "Token não fornecido" });
      return;
    }

    const project = await getProjectById(req.params.id, adminId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Projeto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projeto" });
  }
}

export async function updateAdminProject(req: Request, res: Response): Promise<void> {
  try {
    const adminId = req.admin?.adminId;
    if (!adminId) {
      res.status(401).json({ error: "Token não fornecido" });
      return;
    }

    const project = await updateProject(req.params.id, adminId, req.body);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Projeto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar projeto" });
  }
}

export async function deleteAdminProject(req: Request, res: Response): Promise<void> {
  try {
    const adminId = req.admin?.adminId;
    if (!adminId) {
      res.status(401).json({ error: "Token não fornecido" });
      return;
    }

    const success = await deleteProject(req.params.id, adminId);
    if (success) {
      res.json({ message: "Projeto deletado com sucesso" });
    } else {
      res.status(404).json({ error: "Projeto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar projeto" });
  }
}
