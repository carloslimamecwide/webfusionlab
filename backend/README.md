# WebFusionLab - Backend API

API Node.js com Express em TypeScript para gerenciar envio de emails.

## Requisitos

- Node.js 16+
- npm ou yarn

## Instalação

```bash
# Instalar dependências
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env`:

```env
PORT=3000
NODE_ENV=development
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_senha_app
SENDER_EMAIL=noreply@webfusionlab.com
SENDER_NAME=WebFusionLab
```

> **Nota:** Para Gmail, você precisa gerar uma senha de app em https://myaccount.google.com/apppasswords

## Executar

### Desenvolvimento (com hot reload)

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

A documentação Swagger estará em `http://localhost:3000/api-docs`

### Produção

```bash
# Compilar TypeScript
npm run build

# Executar
npm start
```

## Endpoints

### Health Check

```
GET /health
```

### Enviar Email

```
POST /api/emails/send
Content-Type: application/json

{
  "to": "usuario@example.com",
  "subject": "Bem-vindo",
  "html": "<h1>Bem-vindo!</h1>",
  "text": "Bem-vindo!" (opcional)
}
```

## Recursos

- ✅ TypeScript
- ✅ Documentação com Swagger (apenas em desenvolvimento)
- ✅ Rate Limiting
- ✅ CORS habilitado
- ✅ Serviço de Email com Nodemailer
- ✅ Validação de dados

## Rate Limiting

- **API geral:** 100 requisições por 15 minutos por IP
- **Envio de emails:** 5 requisições por hora por IP

## Estrutura do Projeto

```
backend/
├── src/
│   ├── index.ts              # Arquivo principal
│   ├── swagger.ts            # Configuração do Swagger
│   ├── middleware/
│   │   └── rateLimiter.ts   # Middleware de rate limiting
│   ├── routes/
│   │   └── email.ts         # Rotas de email
│   └── services/
│       └── emailService.ts  # Serviço de email
├── dist/                     # Compilados (gerados)
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```
