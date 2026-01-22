# Guia de Teste - Formulário de Contacto

## 📧 Fluxo Completo

```
Frontend (Next.js) → Backend (Express) → Email Admin + Confirmação ao Utilizador
```

## 🏠 Rodar Localmente

### Backend

#### Passo 1: Configurar PostgreSQL

```bash
brew services start postgresql@15
createdb webfusionlab
psql webfusionlab < /Users/carloslima/Desktop/webfusinlab/backend/setup.sql
```

#### Passo 2: Configurar .env do Backend

```bash
cd /Users/carloslima/Desktop/webfusinlab/backend
cp .env.example .env
```

Editar `.env`:

```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=webfusionlab
DB_USER=seu_usuario_pg
DB_PASSWORD=sua_senha_pg
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_senha_app_gmail
SENDER_EMAIL=noreply@webfusionlab.pt
SENDER_NAME=WebFusionLab
CONTACT_ADMIN_EMAIL=seu_email@gmail.com
JWT_SECRET=seu_jwt_secret
```

**Nota sobre Gmail:**

1. Ativa 2FA no Gmail
2. Gera app password em: https://myaccount.google.com/apppasswords
3. Usa esse password em `SMTP_PASSWORD`

#### Passo 3: Rodar Backend

```bash
npm run dev
```

Deve aparecer:

```
✅ Servidor rodando na porta 3001
📚 Swagger disponível em http://localhost:3001/api-docs
```

### Frontend

#### Passo 1: Configurar .env do Frontend (local)

```bash
cd /Users/carloslima/Desktop/webfusinlab/frontend
cp .env.production .env.local
```

Editar `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Passo 2: Rodar Frontend

```bash
npm run dev
```

Acessa: http://localhost:3000

---

## 🧪 Testar o Formulário

### 1. Abrir página de contacto

```
http://localhost:3000/contact
```

### 2. Preencher o formulário:

- **Nome:** João Silva
- **Email:** seu_email@gmail.com (pra receber confirmação)
- **Assunto:** Teste do formulário
- **Mensagem:** Esta é uma mensagem de teste do formulário de contacto.

### 3. Submeter

Deve ver:
✅ "Mensagem recebida com sucesso! Receberá uma confirmação no seu email."

### 4. Verificar emails

**Email 1 - Confirmação ao utilizador:**

```
De: WebFusionLab <noreply@webfusionlab.pt>
Para: seu_email@gmail.com
Assunto: Obrigado pelo seu contacto - João Silva
```

**Email 2 - Notificação ao admin:**

```
De: WebFusionLab <noreply@webfusionlab.pt>
Para: admin@webfusionlab.pt
Assunto: Novo contacto: Teste do formulário
```

### 5. Verificar logs

**Backend:**

```
📧 Enviando email para: seu_email@gmail.com
✅ Email enviado com sucesso: <ID>
📧 Enviando email para: admin@webfusionlab.pt
✅ Email enviado com sucesso: <ID>
```

---

## 🔄 Fluxo de Dados

### Request do Frontend para Backend

```json
POST /api/contact/send

{
  "name": "João Silva",
  "email": "joao@example.com",
  "subject": "Teste",
  "message": "Mensagem de teste",
  "phone": "+351 912 345 678" // opcional
}
```

### Response do Backend

```json
{
  "success": true,
  "message": "Contacto recebido com sucesso. Receberá uma confirmação no seu email."
}
```

---

## 📋 Endpoints da API

### POST /api/contact/send

Envia um contacto e ambos os emails (confirmação + notificação).

**Body:**

```json
{
  "name": "string (obrigatório)",
  "email": "string (obrigatório, email válido)",
  "subject": "string (obrigatório, mín 3 caracteres)",
  "message": "string (obrigatório, mín 10 caracteres)",
  "phone": "string (opcional)"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Contacto recebido com sucesso. Receberá uma confirmação no seu email."
}
```

**Errors:**

- 400: Dados inválidos
- 429: Limite de requisições excedido (máx 5 por 15 min)
- 500: Erro no servidor

---

## 🧠 Fluxo Técnico Completo

```
1. Utilizador preenche formulário no frontend
   ↓
2. Frontend valida dados (nome, email, assunto, mensagem)
   ↓
3. Frontend envia POST para /api/contact (Next.js API Route)
   ↓
4. Next.js API Route recebe dados e valida novamente
   ↓
5. Next.js encaminha para Backend Express (http://localhost:3001/api/contact/send)
   ↓
6. Backend valida dados e aplica rate limiting
   ↓
7. Backend envia 2 emails:
   a) Email de confirmação ao utilizador
   b) Email de notificação ao admin
   ↓
8. Backend retorna resposta com sucesso
   ↓
9. Frontend mostra mensagem de sucesso
   ↓
10. Utilizador recebe emails em seu email
```

---

## 🐛 Troubleshooting

### Erro: "Failed to connect to SMTP server"

**Solução:**

- Verifica credenciais SMTP em `.env`
- Se usar Gmail, confirma que geraste app password
- Testa conexão:
  ```bash
  curl http://localhost:3001/
  ```

### Erro: "Email não é válido"

**Solução:**

- O email deve ter formato: `usuario@dominio.com`
- Verifica se não há espaços

### Erro: "Limite de requisições excedido"

**Solução:**

- Máx 5 emails por 15 minutos por IP
- Aguarda 15 minutos ou altera IP

### Emails não chegam

**Solução:**

1. Verifica pasta SPAM/Lixo
2. Verifica logs do backend: `npm run dev`
3. Testa SMTP diretamente:
   ```bash
   cd backend
   node -e "require('nodemailer').createTransport({...}).verify()"
   ```

### Frontend não encontra Backend

**Solução:**

- Verifica `NEXT_PUBLIC_API_URL` em `.env.local`
- Certificar que backend está rodando na porta 3001
- Testar diretamente:
  ```bash
  curl http://localhost:3001/
  ```

---

## 📧 Templates de Email

Localizado em: `backend/src/templates/emailTemplates.ts`

### Email ao Utilizador (Confirmação)

```
Assunto: Obrigado pelo seu contacto - {nome}

Olá {nome},

Recebemos a tua mensagem com sucesso!

Assunto: {assunto}

Vamos responder em breve. Obrigado por contactares a WebFusionLab.

Cumprimentos,
WebFusionLab
```

### Email ao Admin (Notificação)

```
Assunto: Novo contacto: {assunto}

Novo contacto recebido:

Nome: {nome}
Email: {email}
Telefone: {phone}
Assunto: {assunto}

Mensagem:
{message}

---
Recebido em: {data e hora}
```

---

## ✅ Checklist Antes de Deployar

- [ ] Backend configurado com SMTP (Gmail ou outro)
- [ ] Frontend rodando localmente com sucesso
- [ ] Formulário envia emails corretamente
- [ ] Admin recebe notificações
- [ ] Utilizador recebe confirmações
- [ ] Rate limiting testado
- [ ] Erros tratados corretamente
- [ ] Logs são claros no backend
- [ ] Variáveis de ambiente configuradas na VPS

---

## 🚀 Deploy na VPS

### Backend

1. SSH na VPS
2. Configurar `.env.production` com SMTP
3. Rodar: `docker-compose -f docker-compose.prod.yml up -d`

### Frontend

1. SSH na VPS
2. Configurar `NEXT_PUBLIC_API_URL=https://api.webfusionlab.pt`
3. Rodar: `docker-compose up -d`

### Nginx

Ambos os subdomínios devem estar apontando:

- `webfusionlab.pt` → localhost:3000 (Frontend)
- `api.webfusionlab.pt` → localhost:3001 (Backend)

---

## 📞 Support

Para debugging detalhado:

**Backend Swagger:**

```
http://localhost:3001/api-docs
```

**Testar endpoint diretamente:**

```bash
curl -X POST http://localhost:3001/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João",
    "email": "joao@example.com",
    "subject": "Teste",
    "message": "Mensagem de teste com mais de dez caracteres"
  }'
```
