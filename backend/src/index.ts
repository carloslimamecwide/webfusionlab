import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { generalLimiter } from "./middleware/rateLimiter";
import contactRoutes from "./routes/contact";
import adminRoutes from "./routes/admin";
import publicRoutes from "./routes/public";
import emailService from "./services/emailService";
import { initializeDatabase, seedInitialAdmin } from "./config/initDb";

const app: Express = express();
app.set('trust proxy', 1);
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === "development";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: isDev
      ? ["http://localhost:3000", "http://localhost:3001"]
      : ["https://webfusionlab.pt", "https://www.webfusionlab.pt", "https://api.webfusionlab.pt"],
    credentials: true,
  }),
);
app.use(generalLimiter);

// Swagger - apenas em desenvolvimento
if (isDev) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📚 Swagger disponível em http://localhost:${port}/api-docs`);
}

// Rotas
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.status(200).json({
    message: "WebFusionLab API",
    version: "1.0.0",
    docs: isDev ? "http://localhost:3000/api-docs" : "Documentação não disponível em produção",
  });
});

// Tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Rota não encontrada",
  });
});

// Inicia o servidor
app.listen(port, async () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);

  // Inicializar banco de dados
  try {
    await initializeDatabase();
    await seedInitialAdmin();
  } catch (error) {
    console.error("❌ Erro ao inicializar banco de dados:", error);
  }
  console.log(`🔧 Ambiente: ${isDev ? "DESENVOLVIMENTO" : "PRODUÇÃO"}`);

  // Verifica conexão SMTP
  const smtpConnected = await emailService.verifyConnection();
  if (!smtpConnected) {
    console.warn("⚠️  Aviso: Não foi possível verificar a conexão SMTP");
  }
});

export default app;
