import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { authLimiter } from "../middleware/rateLimiter";
import {
  loginAdmin,
  registerAdmin,
  updateAdminProfile,
  listAdminProjects,
  createAdminProject,
  getAdminProject,
  updateAdminProject,
  deleteAdminProject,
} from "../controllers/adminController";

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
router.post("/login", authLimiter, loginAdmin);

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Registrar novo admin
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
 *               name:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - name
 *     responses:
 *       201:
 *         description: Admin criado com sucesso
 *       400:
 *         description: Email já existe ou dados inválidos
 *       500:
 *         description: Erro ao criar admin
 */
router.post("/register", authLimiter, registerAdmin);

/**
 * @swagger
 * /api/admin/profile:
 *   put:
 *     summary: Atualizar email e/ou senha do admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Senha atual (obrigatória para validação)
 *               newEmail:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Credenciais atualizadas com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Senha atual incorreta
 */
router.put("/profile", authMiddleware, updateAdminProfile);

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
router.get("/projects", authMiddleware, listAdminProjects);

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
router.post("/projects", authMiddleware, createAdminProject);

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
router.get("/projects/:id", authMiddleware, getAdminProject);

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
router.put("/projects/:id", authMiddleware, updateAdminProject);

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
router.delete("/projects/:id", authMiddleware, deleteAdminProject);

export default router;
