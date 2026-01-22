# WebFusionLab Backend - Admin & Projetos

Sistema de backend para WebFusionLab com autenticação de admin e gestão de projetos usando PostgreSQL.

## 🚀 Setup Inicial

### Pré-requisitos

- Node.js 16+
- PostgreSQL 12+
- npm ou yarn

### 1. Instalar PostgreSQL

#### macOS (com Homebrew)

```bash
brew install postgresql
brew services start postgresql
```

#### Ubuntu/Debian

```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Windows

Descarregar em https://www.postgresql.org/download/windows/

### 2. Criar Database

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Dentro do psql, criar database
CREATE DATABASE webfusionlab;
```

### 3. Configurar Variáveis de Ambiente

Editar `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=webfusionlab
JWT_SECRET=seu_secret_super_seguro_aqui
```

### 4. Instalar Dependências

```bash
cd backend
npm install
```

### 5. Iniciar Servidor

```bash
npm run dev
```

O servidor vai:

1. ✅ Inicializar as tabelas (migrations)
2. ✅ Criar admin padrão com:

   - Email: `admin@webfusionlab.pt`
   - Senha: `admin123`
   - ⚠️ **ALTERE IMEDIATAMENTE EM PRODUÇÃO**

3. 🚀 Rodar em `http://localhost:3000`

## 📚 API Endpoints

### Autenticação

#### Login

```bash
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@webfusionlab.pt",
  "password": "admin123"
}

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "uuid",
    "email": "admin@webfusionlab.pt",
    "name": "Admin"
  }
}
```

### Projetos - Autenticado

**Header obrigatório em todos os requests:**

```
Authorization: Bearer <token>
```

#### Listar Projetos

```bash
GET /api/admin/projects

# Response
[
  {
    "id": "uuid",
    "title": "Portal de Saúde",
    "description": "...",
    "category": "Web",
    "year": "2024",
    "stack": ["Next.js", "TypeScript"],
    "image": "url",
    "link": "url",
    "admin_id": "uuid",
    "created_at": "2024-01-13T...",
    "updated_at": "2024-01-13T..."
  }
]
```

#### Criar Projeto

```bash
POST /api/admin/projects
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Nova App",
  "description": "Descrição do projeto",
  "category": "Mobile",
  "year": "2024",
  "stack": ["React Native", "Firebase"],
  "image": "https://example.com/image.jpg",
  "link": "https://example.com"
}

# Response - 201 Created
{
  "id": "uuid",
  "title": "Nova App",
  "description": "Descrição do projeto",
  ...
}
```

#### Obter Projeto Específico

```bash
GET /api/admin/projects/:id
Authorization: Bearer <token>

# Response - 200 OK
{
  "id": "uuid",
  "title": "...",
  ...
}
```

#### Atualizar Projeto

```bash
PUT /api/admin/projects/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Nome Atualizado",
  "description": "Nova descrição"
  // Apenas os campos que quer atualizar
}

# Response - 200 OK
{
  "id": "uuid",
  "title": "Nome Atualizado",
  ...
}
```

#### Deletar Projeto

```bash
DELETE /api/admin/projects/:id
Authorization: Bearer <token>

# Response - 200 OK
{
  "message": "Projeto deletado com sucesso"
}
```

### Projetos - Público

#### Listar Todos os Projetos (sem autenticação)

```bash
GET /api/public/projects

# Response - 200 OK
[
  {
    "id": "uuid",
    "title": "...",
    ...
  }
]
```

## 🗄️ Schema da Database

### Tabela: admins

```sql
id            UUID PRIMARY KEY
email         VARCHAR(255) UNIQUE NOT NULL
password      VARCHAR(255) NOT NULL (hashed)
name          VARCHAR(255) NOT NULL
is_active     BOOLEAN DEFAULT true
created_at    TIMESTAMP DEFAULT now()
updated_at    TIMESTAMP DEFAULT now()
```

### Tabela: projects

```sql
id            UUID PRIMARY KEY
admin_id      UUID FOREIGN KEY (admins.id)
title         VARCHAR(255) NOT NULL
description   TEXT NOT NULL
category      VARCHAR(50) NOT NULL (Web|Mobile|Marketing|AI)
year          VARCHAR(4) NOT NULL
stack         TEXT[] (array)
image         VARCHAR(255)
link          VARCHAR(255)
created_at    TIMESTAMP DEFAULT now()
updated_at    TIMESTAMP DEFAULT now()
```

## 🔐 Segurança

- ✅ Senhas com hash bcrypt (10 rounds)
- ✅ JWT para autenticação stateless
- ✅ Tokens com expiração 24h
- ✅ Validação de input no servidor
- ✅ CORS configurado
- ✅ Rate limiting

## 🧪 Testar com Curl

### 1. Login

```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@webfusionlab.pt",
    "password": "admin123"
  }'
```

### 2. Salvar Token

```bash
export TOKEN="<token_recebido>"
```

### 3. Criar Projeto

```bash
curl -X POST http://localhost:3000/api/admin/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Meu Projeto",
    "description": "Descrição",
    "category": "Web",
    "year": "2024",
    "stack": ["Next.js", "TypeScript"],
    "image": "https://...",
    "link": "https://..."
  }'
```

### 4. Listar Projetos

```bash
curl http://localhost:3000/api/admin/projects \
  -H "Authorization: Bearer $TOKEN"
```

## 📝 Documentação Swagger

Disponível em: `http://localhost:3000/api-docs` (modo desenvolvimento)

## 🐛 Troubleshooting

### Erro: "connect ECONNREFUSED"

- PostgreSQL não está rodando
- Verificar: `brew services list` (macOS) ou `systemctl status postgresql` (Linux)

### Erro: "database webfusionlab does not exist"

- Criar database: `createdb webfusionlab -U postgres`

### Erro: "password authentication failed"

- Verificar credenciais no `.env`
- Reset password PostgreSQL se necessário

### Erro: "Port 3000 already in use"

```bash
npm run dev -- --port 3001
```

## 📦 Scripts

```bash
# Desenvolvimento
npm run dev           # Inicia com nodemon

# Build
npm run build         # Compila TypeScript

# Produção
npm start             # Inicia servidor compilado
```

## 🚀 Deploy

### Heroku

```bash
heroku create webfusionlab-api
heroku config:set DB_HOST=seu_host_postgresql
heroku config:set DB_PASSWORD=sua_password
git push heroku main
```

### Railway / Render

- Conectar repositório
- Configurar variáveis de ambiente
- Deploy automático

## 📞 Suporte

Para dúvidas, contactar: contact@webfusionlab.pt
