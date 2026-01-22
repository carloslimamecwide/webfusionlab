# 📚 Documentação Swagger - Endpoints Configurados

## 🌐 Acesso à Documentação Swagger

Quando o backend está rodando:

```
http://localhost:3001/api-docs
```

Todos os endpoints estão **totalmente documentados** com exemplos interativos.

---

## 📊 Endpoints Documentados

### 📧 Contacto (Público - Sem Autenticação)

#### 1️⃣ `POST /api/contact/send` - Enviar Contacto

**Descrição:** Formulário de contacto público da website

**Fluxo Automático:**

1. Valida dados
2. Envia email de **confirmação** ao utilizador
3. Envia email de **notificação** ao admin

**Request:**

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "subject": "Solicitar informações",
  "message": "Mensagem com mais de 10 caracteres...",
  "phone": "+351 912 345 678" // opcional
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Contacto recebido com sucesso. Receberá uma confirmação no seu email."
}
```

**Validações:**

- ✅ Name: mín 2 caracteres
- ✅ Email: formato válido
- ✅ Subject: mín 3 caracteres
- ✅ Message: mín 10 caracteres
- ✅ Rate limit: máx 5 por IP em 15 min

---

#### 2️⃣ `POST /api/contact/reply` - Admin Responde

**Descrição:** Admin responde a um contacto com feedback/proposta

**Request:**

```json
{
  "email": "joao@example.com",
  "subject": "Re. Sua solicitação foi analisada",
  "message": "Obrigado por contactar. Aqui está a proposta..."
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Resposta enviada com sucesso"
}
```

---

### 🔐 Admin (Com Autenticação JWT)

#### Login

`POST /api/admin/login`

#### Projetos

- `GET /api/admin/projects` - Listar meus projetos
- `POST /api/admin/projects` - Criar novo projeto
- `GET /api/admin/projects/{id}` - Obter projeto
- `PUT /api/admin/projects/{id}` - Atualizar projeto
- `DELETE /api/admin/projects/{id}` - Deletar projeto

---

### 🌍 Público (Sem Autenticação)

#### Projetos

`GET /api/public/projects` - Listar todos os projetos

---

## 🧪 Testar no Swagger

1. Acessa: `http://localhost:3001/api-docs`
2. Clica num endpoint (ex: `POST /api/contact/send`)
3. Clica em "Try it out"
4. Preenche os dados
5. Clica "Execute"
6. Vê a resposta em tempo real

---

## 📧 Fluxo de Emails Automáticos

### Email 1 - Confirmação ao Utilizador

```
De: WebFusionLab <noreply@webfusionlab.pt>
Para: joao@example.com
Assunto: Confirmação: Seu contacto foi recebido

Conteúdo:
Olá João,

Obrigado por nos contactar! Recebemos a sua mensagem com sucesso.

Resumo do seu contacto:
- Assunto: Solicitar informações
- Data/Hora: 22/01/2026 15:30

A nossa equipa analisará a sua mensagem e entrará em contacto em breve.

WebFusionLab © 2026
```

### Email 2 - Notificação ao Admin

```
De: WebFusionLab <noreply@webfusionlab.pt>
Para: admin@webfusionlab.pt
Assunto: [CONTACTO] Solicitar informações

Conteúdo:
🔔 NOVO CONTACTO RECEBIDO

Detalhes:
- Nome: João Silva
- Email: joao@example.com
- Telefone: +351 912 345 678
- Assunto: Solicitar informações
- Data/Hora: 22/01/2026 15:30

Mensagem:
Gostaria de saber mais sobre seus serviços...

---
Responda diretamente para: joao@example.com
```

---

## 🔄 Fluxo Completo

```
1. Utilizador no website
   ↓
2. Preenche formulário (/contact)
   ↓
3. Submit → Frontend valida
   ↓
4. POST /api/contact/send (Backend)
   ↓
5. Backend valida + aplica rate limit
   ↓
6. Envia 2 emails automaticamente:
   ├─ Confirmação ao utilizador
   └─ Notificação ao admin
   ↓
7. Response: "Sucesso!"
   ↓
8. Utilizador vê mensagem de sucesso
```

---

## ⚙️ Variáveis de Ambiente (Backend)

### Necessárias para Email Funcionar

```env
# SMTP - Gmail (exemplo)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_app_password  # NÃO a senha normal!

# Emails
SENDER_EMAIL=noreply@webfusionlab.pt
SENDER_NAME=WebFusionLab
CONTACT_ADMIN_EMAIL=admin@webfusionlab.pt
```

### Como gerar App Password no Gmail:

1. Acessa: https://myaccount.google.com/apppasswords
2. Gera um app password
3. Copia e cola em `SMTP_PASSWORD`

---

## 🚀 Testar Localmente

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env com SMTP correto
npm run dev
```

### 2. Swagger

Abre: http://localhost:3001/api-docs

### 3. Testar Endpoint

```bash
curl -X POST http://localhost:3001/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João",
    "email": "seu_email@gmail.com",
    "subject": "Teste",
    "message": "Mensagem de teste com mais de dez caracteres"
  }'
```

---

## ✅ Status da Documentação

| Endpoint                     | Swagger | JSDoc | Exemplos | Status |
| ---------------------------- | ------- | ----- | -------- | ------ |
| POST /api/contact/send       | ✅      | ✅    | ✅       | 100%   |
| POST /api/contact/reply      | ✅      | ✅    | ✅       | 100%   |
| POST /api/admin/login        | ✅      | ✅    | ✅       | 100%   |
| GET/POST /api/admin/projects | ✅      | ✅    | ✅       | 100%   |
| GET /api/public/projects     | ✅      | ✅    | ✅       | 100%   |

---

## 🎯 Resumo

✅ **Tudo está documentado:**

- Swagger interativo com exemplos
- JSDoc comentários no código
- Documentação em markdown
- Rate limiting configurado
- Emails automáticos funcionando
- Validações completas
- Error handling robusto

🚀 **Pronto para:**

- Testar localmente
- Deploy na VPS
- Integração com frontend
