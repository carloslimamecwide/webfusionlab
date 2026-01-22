import { Pool, PoolClient } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "webfusionlab",
});

pool.on("error", (err) => {
  console.error("Pool error:", err);
});

export async function query(text: string, params?: any[]): Promise<any> {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

export async function getClient(): Promise<PoolClient> {
  return pool.connect();
}

export default pool;
