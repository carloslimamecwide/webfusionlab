import { Router } from "express";
import { listPublicProjects } from "../controllers/publicController";

const router = Router();

/**
 * @swagger
 * /api/public/projects:
 *   get:
 *     summary: Obter todos os projetos (públicos)
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Lista completa de todos os projetos
 */
router.get("/projects", listPublicProjects);

export default router;
