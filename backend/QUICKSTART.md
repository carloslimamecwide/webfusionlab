# ✅ WebFusionLab - Sistema de Admin Completo

## 📋 O que foi criado

### Backend (Node.js + TypeScript + PostgreSQL)

#### ✅ Autenticação & Login

- Sistema JWT com expiração 24h
- Hashing seguro de senhas (bcryptjs)
- Middleware de autenticação
- Admin padrão pré-criado

#### ✅ Banco de Dados PostgreSQL

- Tabela de admins com segurança
- Tabela de projetos com relacionamento
- Triggers automáticos para timestamps
- Índices para performance

#### ✅ API REST Completa

**Endpoints de Autenticação:**

- `POST /api/admin/login` - Login com email/senha
- Retorna JWT token válido por 24h

**Endpoints de Projetos (Autenticado):**

- `GET /api/admin/projects` - Listar todos os projetos do admin
- `POST /api/admin/projects` - Criar novo projeto
- `GET /api/admin/projects/:id` - Obter projeto específico
- `PUT /api/admin/projects/:id` - Atualizar projeto
- `DELETE /api/admin/projects/:id` - Deletar projeto

**Endpoints Públicos:**

- `GET /api/public/projects` - Listar projetos públicos (sem autenticação)

## 🚀 Como Usar

### 1. Setup do Banco de Dados

```bash
# Instalar PostgreSQL (se não tiver)
brew install postgresql          # macOS
sudo apt-get install postgresql  # Ubuntu

# Iniciar PostgreSQL
brew services start postgresql   # macOS
sudo systemctl start postgresql  # Ubuntu

# Criar database
psql -U postgres
CREATE DATABASE webfusionlab;
\q
```

### 2. Configurar Backend

```bash
cd backend

# Editar .env com suas credenciais
vi .env

# Instalar dependências
npm install

# Iniciar (vai criar tabelas automaticamente)
npm run dev
```

### 3. Admin Padrão

- Email: `admin@webfusionlab.pt`
- Senha: `admin123`
- ⚠️ **Altere imediatamente em produção!**

## 📚 Exemplos de Uso

### Login

```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@webfusionlab.pt",
    "password": "admin123"
  }'

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "uuid",
    "email": "admin@webfusionlab.pt",
    "name": "Admin"
  }
}
```

### Criar Projeto

```bash
TOKEN="<token_obtido_no_login>"

curl -X POST http://localhost:3000/api/admin/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Portal de Saúde",
    "description": "Plataforma web para gestão de consultas",
    "category": "Web",
    "year": "2024",
    "stack": ["Next.js", "TypeScript", "PostgreSQL"],
    "image": "https://...",
    "link": "https://..."
  }'
```

### Listar Projetos

```bash
curl http://localhost:3000/api/admin/projects \
  -H "Authorization: Bearer $TOKEN"
```

### Atualizar Projeto

```bash
curl -X PUT http://localhost:3000/api/admin/projects/:id \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Novo Título",
    "description": "Nova descrição"
  }'
```

### Deletar Projeto

```bash
curl -X DELETE http://localhost:3000/api/admin/projects/:id \
  -H "Authorization: Bearer $TOKEN"
```

## 🗂️ Estrutura de Ficheiros

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts          # Configuração PostgreSQL
│   │   └── initDb.ts            # Inicialização e seed do BD
│   ├── middleware/
│   │   └── auth.ts              # JWT middleware
│   ├── services/
│   │   └── adminService.ts      # Lógica de negócio
│   ├── routes/
│   │   ├── admin.ts             # Rotas de admin
│   │   └── public.ts            # Rotas públicas
│   ├── types/
│   │   └── index.ts             # Tipos TypeScript
│   ├── migrations/
│   │   └── 001_init.sql         # Schema do BD
│   └── index.ts                 # Servidor principal
├── examples/
│   └── client.ts                # Cliente exemplo
├── ADMIN_SETUP.md               # Documentação detalhada
├── setup-db.sh                  # Script de setup
└── .env                         # Variáveis de ambiente
```

## 🔐 Segurança

✅ **Implementado:**

- Hashing bcryptjs (10 rounds)
- JWT com expiração
- Validação de inputs
- Rate limiting
- CORS configurado
- TypeScript strict mode

## 📊 Categorias de Projetos

- `Web` - Websites, dashboards, plataformas web
- `Mobile` - Apps iOS/Android
- `Marketing` - Campanhas digitais, SEO
- `AI` - Soluções com inteligência artificial

## 🧪 Testar na Prática

### Com insomnia/Postman

1. Importar requests de `/examples`
2. Fazer login
3. Guardar token
4. Testar CRUD de projetos

### Com Node.js/TypeScript

```bash
# Usar arquivo examples/client.ts
# Adaptar e rodar para testar API
```

## 📖 Documentação

- **API Swagger**: `http://localhost:3000/api-docs`
- **Setup Guide**: `ADMIN_SETUP.md`
- **Tipos TypeScript**: `src/types/index.ts`
- **Schema BD**: `src/migrations/001_init.sql`

## ⚡ Próximos Passos (Opcional)

1. **Frontend Admin Dashboard** - Criar painel em React/Next
2. **Upload de Imagens** - Integrar AWS S3 ou Cloudinary
3. **Webhooks** - Notificações em tempo real
4. **Cache Redis** - Otimizar performance
5. **Testes Unitários** - Jest/Vitest

## 🚀 Deploy em Produção

### Heroku / Railway

```bash
git push origin main
# Platform detecta e faz deploy automático
```

### Variáveis de Ambiente Essenciais

```
NODE_ENV=production
DB_HOST=seu_host
DB_PASSWORD=seu_password_seguro
JWT_SECRET=seu_secret_super_seguro
```

## ❓ Dúvidas Comuns

**P: Posso mudar a senha do admin?**
R: Sim! Faça login e depois implemente um endpoint PUT /api/admin/change-password

**P: Como adicionar mais admins?**
R: Criar endpoint POST /api/admin/users (apenas admin principal)

**P: Os projetos estão visíveis ao público?**
R: Sim, via `/api/public/projects` (sem autenticação)

**P: Posso ter múltiplos admins?**
R: Sim! Apenas implemente o endpoint de criar admin

## 📞 Suporte

Documentação completa em: `ADMIN_SETUP.md`
Email: contact@webfusionlab.pt

---

✅ **Tudo pronto para usar!**
