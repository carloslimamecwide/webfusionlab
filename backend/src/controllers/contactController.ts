import { Request, Response } from "express";
import emailService from "../services/emailService";

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export async function sendContactMessage(req: Request, res: Response): Promise<Response | void> {
  try {
    const { name, email, subject, message, phone } = req.body as ContactRequest;

    // Validações
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Os campos "name", "email", "subject" e "message" são obrigatórios',
      });
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Email inválido",
      });
    }

    // Envia email para o administrador
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; }
          .header { background-color: #2196F3; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: white; padding: 20px; border-radius: 0 0 8px 8px; }
          .details { background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #2196F3; }
          .message-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #4CAF50; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Novo Contacto Recebido</h1>
          </div>
          <div class="content">
            <h2>Detalhes do Contacto:</h2>
            <div class="details">
              <p><strong>Nome:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Telefone:</strong> ${phone || "Não fornecido"}</p>
              <p><strong>Assunto:</strong> ${subject}</p>
              <p><strong>Data/Hora:</strong> ${new Date().toLocaleString("pt-BR")}</p>
            </div>
            
            <h3>Mensagem:</h3>
            <div class="message-box">
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            
            <p><strong>Responda diretamente para:</strong> <a href="mailto:${email}">${email}</a></p>
            
            <div class="footer">
              <p>Este é um email automático gerado pelo formulário de contacto.</p>
              <p>WebFusionLab © 2026</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Envia email para o administrador
    const adminResult = await emailService.sendEmail({
      to: process.env.CONTACT_ADMIN_EMAIL || "developer.mecwide@gmail.com",
      subject: `[CONTACTO] ${subject}`,
      html: adminHtml,
    });

    if (!adminResult.success) {
      return res.status(500).json({
        success: false,
        error: "Erro ao processar o contacto",
      });
    }

    // Envia confirmação para o utilizador
    const userHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: white; padding: 20px; border-radius: 0 0 8px 8px; }
          .details { background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Contacto Recebido</h1>
          </div>
          <div class="content">
            <p>Olá ${name},</p>
            <p>Obrigado por nos contactar! Recebemos a sua mensagem com sucesso.</p>
            
            <div class="details">
              <h3>Resumo do seu contacto:</h3>
              <p><strong>Assunto:</strong> ${subject}</p>
              <p><strong>Data/Hora:</strong> ${new Date().toLocaleString("pt-BR")}</p>
            </div>
            
            <p>A nossa equipa analisará a sua mensagem e entrará em contacto em breve.</p>
            <p>Se tiver dúvidas urgentes, não hesite em contactar-nos diretamente.</p>
            
            <div class="footer">
              <p>Este é um email automático de confirmação. Não responda a este email.</p>
              <p>WebFusionLab © 2026</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Envia confirmação
    await emailService.sendEmail({
      to: email,
      subject: "Confirmação: Seu contacto foi recebido",
      html: userHtml,
    });

    res.status(200).json({
      success: true,
      message: "Contacto recebido com sucesso. Receberá uma confirmação no seu email.",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
}

export async function replyToContact(req: Request, res: Response): Promise<Response | void> {
  try {
    const { email, subject, message } = req.body;

    // Validações
    if (!email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Os campos "email", "subject" e "message" são obrigatórios',
      });
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Email inválido",
      });
    }

    // Template de resposta/feedback
    const replyHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; }
          .header { background-color: #1976D2; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: white; padding: 20px; border-radius: 0 0 8px 8px; }
          .message-box { background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #1976D2; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Resposta à sua Mensagem</h1>
          </div>
          <div class="content">
            <p>Olá,</p>
            <p>Recebemos o seu contacto e analisámos a sua solicitação.</p>
            
            <div class="message-box">
              <h3>${subject}</h3>
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            
            <p>Se tiver mais dúvidas, não hesite em contactar-nos novamente.</p>
            
            <div class="footer">
              <p>Obrigado por nos contactar!</p>
              <p>WebFusionLab © 2026</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Envia resposta/feedback
    const result = await emailService.sendEmail({
      to: email,
      subject: subject,
      html: replyHtml,
    });

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Resposta enviada com sucesso",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Erro ao enviar resposta",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
}
