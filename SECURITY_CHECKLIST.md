# 🔒 Security Checklist - WebFusionLab

## ✅ Arquivos Sensíveis Protegidos

### Backend

- ✅ `.env` (ignorado)
- ✅ `.env.local` (ignorado)
- ✅ `.env.production` (ignorado) **← ADICIONADO**
- ✅ `.env.*.local` (ignorado)
- ✅ `node_modules/` (ignorado)
- ✅ `dist/` (ignorado)
- ✅ Build artifacts (ignorado)

### Frontend

- ✅ `.env` (ignorado)
- ✅ `.env.local` (ignorado)
- ✅ `.env.production` (ignorado)
- ✅ `.env.*.local` (ignorado)
- ✅ `.next/` (ignorado)
- ✅ `node_modules/` (ignorado)
- ✅ `out/` (ignorado - build output)

---

## 📋 O que NÃO vai para GitHub

### Nunca Commitar ❌

```
.env.production       # Secrets de produção
.env.local            # Secrets locais
.env                  # Arquivo de env geral
node_modules/         # Dependências (instalar via npm install)
dist/                 # Build artifacts
.next/                # Next.js build
out/                  # Next.js export
build/                # Build directory
.npm/                 # NPM cache
```

### Sempre Commitar ✅

```
.gitignore            # Define o que ignorar
.env.example          # Template para devs
package.json          # Dependências lista
package-lock.json     # Lock file
Dockerfile            # Container config
docker-compose.yml    # Docker setup
tsconfig.json         # TypeScript config
src/                  # Código fonte
```

---

## 🔑 Arquivos de Exemplo (Templates)

### Backend - `.env.example`

```env
NODE_ENV=development
PORT=3001

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=webfusionlab
DB_USER=webfusionlab
DB_PASSWORD=seu_password_aqui

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_app_password

# Email Config
SENDER_EMAIL=noreply@webfusionlab.pt
SENDER_NAME=WebFusionLab
CONTACT_ADMIN_EMAIL=admin@webfusionlab.pt

# JWT
JWT_SECRET=seu_jwt_secret_aleatorio_aqui
```

**Status**: ✅ Já existe em backend/

### Frontend - `.env.example`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Status**: ✅ Criar se não existir

---

## 🛡️ Variáveis Sensíveis - Nunca Commitar

| Variável               | Backend | Frontend | Motivo             |
| ---------------------- | ------- | -------- | ------------------ |
| `DB_PASSWORD`          | ❌      | -        | Acesso a DB        |
| `SMTP_PASSWORD`        | ❌      | -        | Acesso email       |
| `JWT_SECRET`           | ❌      | -        | Token signing      |
| `CONTACT_ADMIN_EMAIL`  | ❌      | -        | Email do admin     |
| `NEXT_PUBLIC_API_URL`  | -       | ✅       | Público (URL API)  |
| `NEXT_PUBLIC_SITE_URL` | -       | ✅       | Público (URL site) |

---

## 🔍 Verificação Git

### Ver o que vai ser commitado

```bash
# Backend
cd backend
git status
git diff --cached

# Frontend
cd ../frontend
git status
git diff --cached
```

### Verificar se .env está ignorado

```bash
# Deve estar vazio ou só mostrar tracked files
git check-ignore -v .env
git check-ignore -v .env.production
```

### Limpar arquivos acidentalmente commitados

```bash
# Se .env foi commitado por engano
git rm --cached .env
git rm --cached .env.production
echo ".env.production" >> .gitignore
git add .gitignore
git commit -m "Remove .env files and update gitignore"
git push
```

---

## 🚨 O que Checkar Antes de Push

- [ ] `.env` não está em staging
- [ ] `.env.production` não está em staging
- [ ] `node_modules/` não está em staging
- [ ] `dist/` não está em staging
- [ ] `.next/` não está em staging
- [ ] Nenhum arquivo `.log` está em staging
- [ ] `.gitignore` está correto em ambos os diretórios

---

## 📝 Como Trabalhar com Secrets

### Local (Desenvolvimento)

```bash
# Criar arquivo .env.local (nunca commitado)
touch backend/.env.local
nano backend/.env.local

# Adicionar variáveis sensíveis
DB_PASSWORD=sua_senha_local
SMTP_PASSWORD=seu_app_password
JWT_SECRET=seu_secret_local
```

### VPS (Produção)

```bash
# Via SSH na VPS
ssh user@server

# Criar .env.production (nunca commitado)
nano /var/www/webfusionlab/backend/.env.production

# Adicionar variáveis reais
NODE_ENV=production
DB_PASSWORD=SENHA_FORTE_REAL
SMTP_PASSWORD=APP_PASSWORD_REAL
JWT_SECRET=JWT_SECRET_REAL
```

---

## 🔐 GitHub Secrets (CI/CD)

Se usar GitHub Actions para deployment:

**Settings → Secrets and variables → Actions**

Adicionar:

```
VPS_HOST = seu_vps_ip
VPS_USER = seu_usuario
VPS_SSH_KEY = conteúdo_private_key
DB_PASSWORD = senha_db_production
SMTP_PASSWORD = app_password_gmail
JWT_SECRET = secret_aleatorio
```

---

## ✅ Status Final

| Item                  | Verificação                       |
| --------------------- | --------------------------------- |
| Backend .gitignore    | ✅ Atualizado com .env.production |
| Frontend .gitignore   | ✅ Atualizado com .env.production |
| .env.example backend  | ✅ Existe                         |
| .env.example frontend | ✅ Precisa criar                  |
| node_modules ignorado | ✅ Sim                            |
| dist ignorado         | ✅ Sim                            |
| Secrets protegidos    | ✅ Sim                            |

---

## 🚀 Antes de Fazer Push para GitHub

```bash
# 1. Verificar status
git status

# 2. Garantir que nada sensível está sendo commitado
git diff --cached | grep -E "PASSWORD|SECRET|API_KEY"

# 3. Se tudo OK, fazer commit
git add .gitignore backend/.env.example
git commit -m "Improve security: update .gitignore for .env.production"

# 4. Push
git push origin main
```

---

**⚠️ IMPORTANTE**: Nunca commitar `.env` files com valores reais!
