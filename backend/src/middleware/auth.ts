import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "../types";

declare global {
  namespace Express {
    interface Request {
      admin?: JwtPayload;
    }
  }
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return "";
    }
    return "dev-insecure-secret";
  }
  return secret;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Token não fornecido" });
      return;
    }

    const secret = getJwtSecret();
    if (!secret) {
      res.status(500).json({ error: "Configuração de autenticação inválida" });
      return;
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
}

export function generateToken(adminId: string, email: string): string {
  const secret = getJwtSecret();
  if (!secret) {
    throw new Error("JWT_SECRET deve estar definido em produção");
  }
  return jwt.sign({ adminId, email }, secret, { expiresIn: "24h" });
}
