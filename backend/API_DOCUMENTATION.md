# Backend API - WebFusionLab

## 📚 Documentação Interativa

Quando o backend está rodando em desenvolvimento, acessa a documentação Swagger em:

```
http://localhost:3001/api-docs
```

Podes testar todas as rotas diretamente no Swagger!

---

## 🚀 Endpoints da API

### 📧 Contacto

#### `POST /api/contact/send`

Envia uma mensagem de contacto. Automaticamente:

- Envia email de confirmação para o utilizador
- Envia email de notificação para o admin
- Aplica rate limiting (máx 5 emails por 15 min)

**Request:**

```bash
curl -X POST http://localhost:3001/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "subject": "Solicitar informações",
    "message": "Gostaria de saber mais sobre seus serviços e como podemos trabalhar juntos.",
    "phone": "+351 912 345 678"
  }'
```

**Body (JSON):**

```json
{
  "name": "string (obrigatório, mín 2 caracteres)",
  "email": "string (obrigatório, email válido)",
  "subject": "string (obrigatório, mín 3 caracteres)",
  "message": "string (obrigatório, mín 10 caracteres)",
  "phone": "string (opcional)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Contacto recebido com sucesso. Receberá uma confirmação no seu email."
}
```

**Errors:**

| Status | Erro                       | Causa                                     |
| ------ | -------------------------- | ----------------------------------------- |
| 400    | Campo obrigatório faltando | Nome, email, subject ou message vazio     |
| 400    | Email inválido             | Formato de email incorreto                |
| 400    | Campo muito curto          | Nome < 2 chars, subject < 3, message < 10 |
| 429    | Too Many Requests          | Excedeu 5 emails em 15 minutos            |
| 500    | Erro interno               | Problema no servidor SMTP ou DB           |

---

### 🏥 Health Check

#### `GET /`

Verifica o status da API.

**Request:**

```bash
curl http://localhost:3001/
```

**Response (200):**

```json
{
  "message": "WebFusionLab API",
  "version": "1.0.0",
  "docs": "http://localhost:3001/api-docs"
}
```

---

## 📊 Fluxo de Emails

### Email 1: Confirmação ao Utilizador

**Quando:** Logo após receber o contacto
**De:** noreply@webfusionlab.pt (WebFusionLab)
**Para:** email do utilizador
**Assunto:** Obrigado pelo seu contacto - {nome}

**Conteúdo:**

```
Olá {nome},

Recebemos a tua mensagem com sucesso!

Assunto: {assunto}

Vamos responder em breve.

Obrigado por contactares a WebFusionLab.

Cumprimentos,
WebFusionLab
```

### Email 2: Notificação ao Admin

**Quando:** Logo após receber o contacto
**De:** noreply@webfusionlab.pt (WebFusionLab)
**Para:** admin@webfusionlab.pt (conforme .env)
**Assunto:** Novo contacto: {assunto}

**Conteúdo:**

```
🔔 NOVO CONTACTO RECEBIDO

Detalhes do Contacto:
- Nome: {nome}
- Email: {email}
- Telefone: {phone ou "Não fornecido"}
- Assunto: {assunto}
- Data/Hora: {data_hora}

Mensagem:
{message}

---
Responda diretamente para: {email}
```

---

## ⚙️ Variáveis de Ambiente Necessárias

### SMTP (Email)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_senha_app
```

### Email

```env
SENDER_EMAIL=noreply@webfusionlab.pt
SENDER_NAME=WebFusionLab
CONTACT_ADMIN_EMAIL=admin@webfusionlab.pt
```

### Database

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=webfusionlab
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

### Servidor

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=seu_secret_jwt
```

---

## 🔒 Rate Limiting

O endpoint de contacto tem rate limiting aplicado:

- **Limite:** 5 requisições
- **Janela:** 15 minutos
- **Por:** IP do cliente

Se exceder o limite:

```json
{
  "error": "Too many requests, please try again later"
}
```

---

## 📝 Estrutura de Dados

### ContactRequest (Request Body)

```typescript
interface ContactRequest {
  name: string; // Nome do contactante (2+ caracteres)
  email: string; // Email válido
  subject: string; // Assunto (3+ caracteres)
  message: string; // Mensagem (10+ caracteres)
  phone?: string; // Telefone (opcional)
}
```

### Response

```typescript
interface ContactResponse {
  success: boolean;
  message: string; // Mensagem de sucesso
  error?: string; // Mensagem de erro (se aplicável)
}
```

---

## 🧪 Exemplos de Uso

### JavaScript/Fetch

```javascript
const sendContact = async () => {
  const response = await fetch("http://localhost:3001/api/contact/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "João Silva",
      email: "joao@example.com",
      subject: "Informações sobre serviços",
      message: "Gostaria de saber mais sobre como podemos trabalhar juntos.",
    }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log("✅ Sucesso:", data.message);
  } else {
    console.error("❌ Erro:", data.error);
  }
};
```

### cURL

```bash
# Comando básico
curl -X POST http://localhost:3001/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "subject": "Teste",
    "message": "Esta é uma mensagem de teste com mais de dez caracteres"
  }'

# Com telefone
curl -X POST http://localhost:3001/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@example.com",
    "subject": "Projeto novo",
    "message": "Tenho um projeto interessante para discutir. Podes contactar-me?",
    "phone": "+351 912 345 678"
  }'
```

### Python

```python
import requests
import json

url = 'http://localhost:3001/api/contact/send'
data = {
    'name': 'João Silva',
    'email': 'joao@example.com',
    'subject': 'Informações',
    'message': 'Gostaria de saber mais sobre seus serviços.'
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print(f"✅ Sucesso: {response.json()['message']}")
else:
    print(f"❌ Erro: {response.json()['error']}")
```

---

## 🐛 Troubleshooting

### Erro: "SMTP connection failed"

**Causa:** Credenciais SMTP inválidas

**Solução:**

1. Verifica `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` em `.env`
2. Se usar Gmail:
   - Ativa 2FA: https://myaccount.google.com/security
   - Gera app password: https://myaccount.google.com/apppasswords
   - Usa o app password em `SMTP_PASSWORD`

### Erro: "Email inválido"

**Causa:** Formato de email incorreto

**Solução:** Email deve ter formato `usuario@dominio.com`

### Erro: "Too many requests"

**Causa:** Excedeu limite de taxa (5 em 15 min)

**Solução:** Aguarda 15 minutos antes de tentar novamente

### Erro: "Campo obrigatório faltando"

**Causa:** Um ou mais campos requeridos não foi preenchido

**Solução:** Verifica que todos os campos obrigatórios estão preenchidos:

- `name` (mín 2 caracteres)
- `email` (formato válido)
- `subject` (mín 3 caracteres)
- `message` (mín 10 caracteres)

### Emails não chegam

**Causa:** Problema com SMTP ou emails em spam

**Solução:**

1. Verifica pasta SPAM/Lixo no email do admin
2. Verifica logs do backend: `npm run dev`
3. Testa SMTP diretamente em http://localhost:3001/api-docs

---

## 📊 Logs

O backend registra todas as ações importantes:

```
📧 Enviando email para: admin@webfusionlab.pt
📧 De: WebFusionLab <noreply@webfusionlab.pt>
📧 Assunto: Novo contacto: Solicitar informações
✅ Email enviado com sucesso: <message-id>
```

Para ver logs em tempo real:

```bash
npm run dev
```

---

## 🚀 Deploy

### VPS com Docker

```bash
# Build
docker-compose -f docker-compose.prod.yml build

# Start
docker-compose -f docker-compose.prod.yml up -d

# Logs
docker-compose -f docker-compose.prod.yml logs -f backend
```

### Variáveis de Ambiente na VPS

Criar arquivo `.env.production`:

```env
NODE_ENV=production
PORT=3001
DB_HOST=postgres
DB_PORT=5432
DB_NAME=webfusionlab
DB_USER=webfusionlab
DB_PASSWORD=SENHA_FORTE
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_senha_app
SENDER_EMAIL=noreply@webfusionlab.pt
SENDER_NAME=WebFusionLab
CONTACT_ADMIN_EMAIL=admin@webfusionlab.pt
JWT_SECRET=JWT_SECRET_FORTE
```

---

## 📞 Support

- **Documentação Interativa:** http://localhost:3001/api-docs
- **Código Fonte:** `/src/routes/contact.ts`
- **Serviço de Email:** `/src/services/emailService.ts`
- **Templates:** `/src/templates/emailTemplates.ts`
