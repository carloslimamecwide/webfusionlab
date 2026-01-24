import { Request, Response } from "express";
import { getAllProjects } from "../services/adminService";

export async function listPublicProjects(req: Request, res: Response): Promise<void> {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
}
