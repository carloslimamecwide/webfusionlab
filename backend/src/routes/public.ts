import { Router, Request, Response } from "express";
import { getAllProjects } from "../services/adminService";

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
router.get("/projects", async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
});

export default router;
