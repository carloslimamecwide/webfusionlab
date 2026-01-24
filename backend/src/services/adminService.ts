import { query } from "../config/database";
import { Admin, Project, ProjectInput } from "../types";
import * as bcrypt from "bcryptjs";

export async function getAdminByEmail(email: string): Promise<Admin | null> {
  try {
    const result = await query("SELECT * FROM admins WHERE email = $1", [email]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao buscar admin:", error);
    return null;
  }
}

export async function createAdmin(email: string, password: string, name: string): Promise<Admin | null> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
      `INSERT INTO admins (email, password, name) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, name, is_active, created_at, updated_at`,
      [email, hashedPassword, name],
    );

    return result.rows[0];
  } catch (error) {
    console.error("Erro ao criar admin:", error);
    return null;
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function getAdminById(id: string): Promise<Admin | null> {
  try {
    const result = await query("SELECT * FROM admins WHERE id = $1", [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao buscar admin por ID:", error);
    return null;
  }
}

export async function updateAdminCredentials(
  adminId: string,
  email?: string,
  password?: string,
): Promise<Admin | null> {
  try {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (email) {
      updates.push(`email = $${paramCount++}`);
      values.push(email);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push(`password = $${paramCount++}`);
      values.push(hashedPassword);
    }

    if (updates.length === 0) {
      return getAdminById(adminId);
    }

    values.push(adminId);

    const queryStr = `
      UPDATE admins
      SET ${updates.join(", ")}, updated_at = NOW()
      WHERE id = $${paramCount}
      RETURNING id, email, name, is_active, created_at, updated_at
    `;

    const result = await query(queryStr, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao atualizar credenciais do admin:", error);
    return null;
  }
}

export async function createProject(adminId: string, projectData: ProjectInput): Promise<Project | null> {
  try {
    const result = await query(
      `INSERT INTO projects (admin_id, title, description, category, year, stack, image, link)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, admin_id, title, description, category, year, stack, image, link, created_at, updated_at`,
      [
        adminId,
        projectData.title,
        projectData.description,
        projectData.category,
        projectData.year,
        projectData.stack,
        projectData.image,
        projectData.link,
      ],
    );

    return result.rows[0];
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const result = await query("SELECT * FROM projects ORDER BY created_at DESC");
    return result.rows;
  } catch (error) {
    console.error("Erro ao buscar todos os projetos:", error);
    return [];
  }
}

export async function getProjectsByAdminId(adminId: string): Promise<Project[]> {
  try {
    const result = await query("SELECT * FROM projects WHERE admin_id = $1 ORDER BY created_at DESC", [adminId]);
    return result.rows;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return [];
  }
}

export async function getProjectById(id: string, adminId: string): Promise<Project | null> {
  try {
    const result = await query("SELECT * FROM projects WHERE id = $1 AND admin_id = $2", [id, adminId]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
    return null;
  }
}

export async function updateProject(
  id: string,
  adminId: string,
  projectData: Partial<ProjectInput>,
): Promise<Project | null> {
  try {
    // Construir UPDATE dinamicamente
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (projectData.title) {
      fields.push(`title = $${paramCount++}`);
      values.push(projectData.title);
    }
    if (projectData.description) {
      fields.push(`description = $${paramCount++}`);
      values.push(projectData.description);
    }
    if (projectData.category) {
      fields.push(`category = $${paramCount++}`);
      values.push(projectData.category);
    }
    if (projectData.year) {
      fields.push(`year = $${paramCount++}`);
      values.push(projectData.year);
    }
    if (projectData.stack) {
      fields.push(`stack = $${paramCount++}`);
      values.push(projectData.stack);
    }
    if (projectData.image) {
      fields.push(`image = $${paramCount++}`);
      values.push(projectData.image);
    }
    if (projectData.link) {
      fields.push(`link = $${paramCount++}`);
      values.push(projectData.link);
    }

    if (fields.length === 0) {
      return getProjectById(id, adminId);
    }

    values.push(id);
    values.push(adminId);

    const query_str = `
      UPDATE projects
      SET ${fields.join(", ")}
      WHERE id = $${paramCount++} AND admin_id = $${paramCount++}
      RETURNING id, admin_id, title, description, category, year, stack, image, link, created_at, updated_at
    `;

    const result = await query(query_str, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return null;
  }
}

export async function deleteProject(id: string, adminId: string): Promise<boolean> {
  try {
    const result = await query("DELETE FROM projects WHERE id = $1 AND admin_id = $2", [id, adminId]);
    return result.rowCount! > 0;
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    return false;
  }
}
