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

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Token não fornecido" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
}

export function generateToken(adminId: string, email: string): string {
  return jwt.sign({ adminId, email }, process.env.JWT_SECRET || "secret", { expiresIn: "24h" });
}
