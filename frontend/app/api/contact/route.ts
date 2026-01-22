import { NextRequest, NextResponse } from "next/server";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Simple validation
function validateForm(data: Partial<ContactForm>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Nome deve ter pelo menos 2 caracteres");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Email inválido");
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.push("Assunto deve ter pelo menos 3 caracteres");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Mensagem deve ter pelo menos 10 caracteres");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactForm>;

    // Validate form data
    const validation = validateForm(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.errors[0] }, { status: 400 });
    }

    const { name, email, subject, message } = body as ContactForm;

    // Forward to backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    console.log(`📧 Enviando para backend: ${backendUrl}/api/contact/send`);

    const response = await fetch(`${backendUrl}/api/contact/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });

    const backendResponse = await response.json();

    if (!response.ok) {
      console.error("Backend error:", backendResponse);
      return NextResponse.json(
        { error: backendResponse.error || "Erro ao enviar mensagem" },
        { status: response.status },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Mensagem recebida com sucesso! Receberá uma confirmação no seu email.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Erro ao processar formulário. Tenta novamente mais tarde." }, { status: 500 });
  }
}
