/**
 * Templates de emails
 */

export const emailTemplates = {
  /**
   * Template de confirmação de envio de email
   */
  confirmationEmail: (recipientName: string, recipientEmail: string, subject: string) => ({
    subject: "Confirmação de Email Enviado",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: white; padding: 20px; border-radius: 0 0 8px 8px; }
          .success { color: #4CAF50; font-weight: bold; }
          .details { background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Email Enviado com Sucesso</h1>
          </div>
          <div class="content">
            <p>Olá,</p>
            <p>Confirmamos que seu email foi enviado com sucesso para:</p>
            <div class="details">
              <p><strong>Destinatário:</strong> ${recipientEmail}</p>
              <p><strong>Assunto:</strong> ${subject}</p>
              <p><strong>Data/Hora:</strong> ${new Date().toLocaleString("pt-BR")}</p>
            </div>
            <p class="success">Seu mensagem foi entregue com êxito!</p>
            <p>Se você não solicitou este envio, desconsidere este email.</p>
            <div class="footer">
              <p>Este é um email automático de confirmação. Não responda a este email.</p>
              <p>WebFusionLab © 2026</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Email Enviado com Sucesso
      
      Confirmamos que seu email foi enviado com sucesso.
      
      Destinatário: ${recipientEmail}
      Assunto: ${subject}
      Data/Hora: ${new Date().toLocaleString("pt-BR")}
      
      Seu mensagem foi entregue com êxito!
      
      Se você não solicitou este envio, desconsidere este email.
      
      ---
      Este é um email automático de confirmação. Não responda a este email.
      WebFusionLab © 2026
    `,
  }),
};
