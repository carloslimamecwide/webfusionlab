import nodemailer from "nodemailer";
import { emailTemplates } from "../templates/emailTemplates";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  senderName?: string;
  replyTo?: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  confirmationMessageId?: string;
  error?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  /**
   * Envia um email e retorna confirmação automática
   * @param options Opções do email (to, subject, html, text)
   * @returns Resposta com sucesso ou erro
   */
  async sendEmail(options: EmailOptions): Promise<EmailResponse> {
    try {
      const mailOptions = {
        from: `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ""),
      };

      console.log(`📧 Enviando email para: ${options.to}`);
      console.log(`📧 De: ${mailOptions.from}`);
      console.log(`📧 Assunto: ${options.subject}`);

      const info = await this.transporter.sendMail(mailOptions);

      console.log(`✅ Email enviado com sucesso: ${info.messageId}`);

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      console.error(`❌ Erro ao enviar email: ${errorMessage}`);

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Verifica a conexão com o servidor SMTP
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log("Conexão SMTP verificada com sucesso");
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      console.error(`Erro ao verificar conexão SMTP: ${errorMessage}`);
      return false;
    }
  }
}

export default new EmailService();
