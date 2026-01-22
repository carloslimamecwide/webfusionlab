import { Router, Request, Response } from "express";
import { authMiddleware, generateToken } from "../middleware/auth";
import {
  getAdminByEmail,
  createAdmin,
  verifyPassword,
  createProject,
  getProjectsByAdminId,
  getProjectById,
  updateProject,
  deleteProject,
} from "../services/adminService";
import { ProjectInput } from "../types";

const router = Router();

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Fazer login como admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", async (req: Request, res: Response): Promise<void> => {
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
});

/**
 * @swagger
 * /api/admin/projects:
 *   get:
 *     summary: Obter todos os projetos do admin
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de projetos
 */
router.get("/projects", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await getProjectsByAdminId(req.admin!.adminId);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
});

/**
 * @swagger
 * /api/admin/projects:
 *   post:
 *     summary: Criar novo projeto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [Web, Mobile, Marketing, AI]
 *               year:
 *                 type: string
 *               stack:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       201:
 *         description: Projeto criado
 */
router.post("/projects", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
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

    const project = await createProject(req.admin!.adminId, projectData);
    if (project) {
      res.status(201).json(project);
    } else {
      res.status(500).json({ error: "Erro ao criar projeto" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
});

/**
 * @swagger
 * /api/admin/projects/{id}:
 *   get:
 *     summary: Obter projeto específico
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/projects/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await getProjectById(req.params.id, req.admin!.adminId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Projeto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projeto" });
  }
});

/**
 * @swagger
 * /api/admin/projects/{id}:
 *   put:
 *     summary: Atualizar projeto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.put("/projects/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await updateProject(req.params.id, req.admin!.adminId, req.body);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Projeto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar projeto" });
  }
});

/**
 * @swagger
 * /api/admin/projects/{id}:
 *   delete:
 *     summary: Deletar projeto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete("/projects/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await deleteProject(req.params.id, req.admin!.adminId);
    if (success) {
      res.json({ message: "Projeto deletado com sucesso" });
    } else {
      res.status(404).json({ error: "Projeto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar projeto" });
  }
});

export default router;
