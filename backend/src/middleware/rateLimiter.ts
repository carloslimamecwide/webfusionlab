import rateLimit from "express-rate-limit";

/**
 * Rate limiter para API geral
 * Máximo de 100 requisições por 15 minutos por IP
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: "Muitas requisições deste IP, tente novamente mais tarde.",
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter para autenticação
 * Máximo de 10 tentativas por 15 minutos por IP
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,
  message: "Muitas tentativas de autenticação, tente novamente mais tarde.",
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter mais restritivo para envio de emails
 * Máximo de 5 requisições por hora por IP
 */
export const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 25,
  message: "Limite de envio de emails excedido. Tente novamente em uma hora.",
  standardHeaders: true,
  legacyHeaders: false,
});
