import { Router } from "express";
import { emailLimiter } from "../middleware/rateLimiter";
import { sendContactMessage, replyToContact } from "../controllers/contactController";

const router = Router();

/**
 * @swagger
 * /api/contact/send:
 *   post:
 *     summary: Envia uma mensagem de contacto (Formulário de Contacto)
 *     description: |
 *       Endpoint para submeter o formulário de contacto da WebFusionLab.
 *
 *       **Fluxo Automático:**
 *       1. Valida os dados de entrada
 *       2. Envia email de CONFIRMAÇÃO ao utilizador
 *       3. Envia email de NOTIFICAÇÃO ao admin
 *
 *       **Validações:**
 *       - Nome: Mínimo 2 caracteres
 *       - Email: Deve ser um email válido
 *       - Assunto: Mínimo 3 caracteres
 *       - Mensagem: Mínimo 10 caracteres
 *       - Rate Limit: Máx 5 contactos por IP em 15 minutos
 *     tags:
 *       - Contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 description: Nome completo do contactante
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email válido para resposta
 *                 example: joao@example.com
 *               subject:
 *                 type: string
 *                 minLength: 3
 *                 description: Assunto da mensagem
 *                 example: Solicitar informações sobre serviços
 *               message:
 *                 type: string
 *                 minLength: 10
 *                 description: Conteúdo detalhado da mensagem
 *                 example: Gostaria de saber mais sobre seus serviços. Como funcionam os vossos projetos?
 *               phone:
 *                 type: string
 *                 description: Telefone do contactante (OPCIONAL)
 *                 example: +351 912 345 678
 *     responses:
 *       200:
 *         description: Contacto recebido com sucesso! 2 emails foram enviados automaticamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Contacto recebido com sucesso. Receberá uma confirmação no seu email.
 *       400:
 *         description: Dados de entrada inválidos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Email inválido
 *       429:
 *         description: Limite de requisições excedido (máximo 5 por 15 minutos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Too many requests, please try again later
 *       500:
 *         description: Erro interno do servidor ou problema com SMTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Erro ao processar o contacto
 */
router.post("/send", emailLimiter, sendContactMessage);

/**
 * @swagger
 * /api/contact/reply:
 *   post:
 *     summary: Admin responde a um contacto (Enviar Feedback/Resposta)
 *     description: |
 *       Endpoint para o admin responder a um contacto recebido.
 *
 *       Envia um email de RESPOSTA/FEEDBACK ao utilizador que fez o contacto.
 *
 *       **Usar quando:**
 *       - Análise da solicitação foi concluída
 *       - Precisa enviar proposta ou informações
 *       - Quer dar feedback ao utilizador
 *     tags:
 *       - Contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do utilizador que está a receber a resposta
 *                 example: joao@example.com
 *               subject:
 *                 type: string
 *                 description: Assunto da resposta (ex. Re. Sua solicitação foi analisada)
 *                 example: Re. Sua solicitação foi analisada - Proposta anexada
 *               message:
 *                 type: string
 *                 description: Conteúdo detalhado da resposta
 *                 example: |
 *                   Obrigado por contactar a WebFusionLab!
 *
 *                   Analisámos a sua solicitação e ficámos interessados no seu projeto.
 *
 *                   Aqui está a informação que solicitou:
 *                   - Orçamento: X€
 *                   - Prazo: X semanas
 *                   - Metodologia: Agile
 *
 *                   Vamos agendar uma call para discutir os detalhes...
 *     responses:
 *       200:
 *         description: Resposta enviada com sucesso ao utilizador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Resposta enviada com sucesso
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Email inválido
 *       429:
 *         description: Limite de requisições excedido
 *       500:
 *         description: Erro ao enviar resposta (problema com SMTP)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Erro ao enviar resposta
 */
router.post("/reply", emailLimiter, replyToContact);

export default router;
