import { query } from "./database";
import * as fs from "fs";
import * as path from "path";

export async function initializeDatabase(): Promise<void> {
  try {
    console.log("🔄 Inicializando banco de dados...");

    // Ler e executar migrations
    const migrationPath =
      process.env.NODE_ENV === "production"
        ? path.resolve(process.cwd(), "migrations/001_init.sql")
        : path.join(__dirname, "../migrations/001_init.sql");
    const migrationSQL = fs.readFileSync(migrationPath, "utf8");

    // Executar todo o SQL de uma vez (pois contém funções e triggers)
    await query(migrationSQL);

    console.log("✅ Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inicializar banco de dados:", error);
    throw error;
  }
}

export async function seedInitialAdmin(): Promise<void> {
  try {
    const bcrypt = require("bcryptjs");
    const isProd = process.env.NODE_ENV === "production";

    if (isProd && process.env.SEED_ADMIN !== "true") {
      console.log("ℹ️  Seed de admin desativado em produção");
      return;
    }

    const seedEmail = process.env.SEED_ADMIN_EMAIL || "admin@webfusionlab.pt";
    const seedPassword = process.env.SEED_ADMIN_PASSWORD || "admin123";

    if (isProd && (!process.env.SEED_ADMIN_EMAIL || !process.env.SEED_ADMIN_PASSWORD)) {
      console.error("❌ SEED_ADMIN_EMAIL e SEED_ADMIN_PASSWORD são obrigatórios para seed em produção");
      return;
    }

    // Verificar se já existe admin
    const result = await query("SELECT COUNT(*) FROM admins");
    if (parseInt(result.rows[0].count) > 0) {
      console.log("ℹ️  Admin já existe");
      return;
    }

    // Criar admin padrão
    const password = await bcrypt.hash(seedPassword, 10);

    await query(
      `INSERT INTO admins (email, password, name) 
       VALUES ($1, $2, $3)`,
      [seedEmail, password, "Admin"],
    );

    console.log("✅ Admin padrão criado!");
    console.log(`📧 Email: ${seedEmail}`);
    if (!isProd) {
      console.log(`🔑 Senha: ${seedPassword}`);
      console.log("⚠️  ALTERE A SENHA IMEDIATAMENTE!");
    }
  } catch (error) {
    console.error("❌ Erro ao criar admin padrão:", error);
  }
}
