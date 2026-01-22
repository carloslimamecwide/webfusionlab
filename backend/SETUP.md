# WebFusionLab Backend - Guia de Setup

## 📋 Índice

- [Rodar Localmente](#-rodar-localmente)
- [Deploy na VPS](#-deploy-na-vps)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Comandos Úteis](#-comandos-úteis)

---

## 🏠 Rodar Localmente

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- PostgreSQL instalado (ou Docker)

### Passo 1: Instalar dependências

```bash
npm install
```

### Passo 2: Configurar banco de dados

Se usar PostgreSQL localmente:

```bash
# Criar banco de dados
psql -U postgres -c "CREATE DATABASE webfusionlab;"
psql -U postgres -d webfusionlab -f setup.sql
```

### Passo 3: Criar arquivo .env

```bash
cp .env.example .env
```

Editar `.env` com suas configurações:

```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=webfusionlab
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_senha_app
SENDER_EMAIL=noreply@webfusionlab.pt
CONTACT_ADMIN_EMAIL=admin@webfusionlab.pt
JWT_SECRET=seu_secret_jwt
```

### Passo 4: Rodar em desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3001

### Passo 5: Build para produção

```bash
npm run build
npm start
```

---

## 🐳 Rodar com Docker Localmente

### Passo 1: Criar arquivo .env

```bash
cp .env.example .env
```

### Passo 2: Build e start com Docker Compose

```bash
docker-compose up -d --build
```

O PostgreSQL vai iniciar e o backend vai conectar automaticamente.

### Passo 3: Verificar logs

```bash
docker-compose logs -f backend
```

### Passo 4: Acessar a API

```bash
curl http://localhost:3001
```

### Parar containers

```bash
docker-compose down
```

---

## 🚀 Deploy na VPS

### Pré-requisitos na VPS

- Docker e Docker Compose instalados
- Nginx instalado
- Certificado SSL (Let's Encrypt)
- Subdomínio api.webfusionlab.pt apontado para a VPS

### Opção 1: Deploy Manual (passo a passo)

#### Passo 1: Conectar à VPS

```bash
ssh usuario@seu-servidor
```

#### Passo 2: Criar diretório do projeto

```bash
sudo mkdir -p /var/www/webfusionlab/backend
sudo chown $USER:$USER /var/www/webfusionlab/backend
cd /var/www/webfusionlab/backend
```

#### Passo 3: Clonar o repositório

```bash
git clone <seu-repo> .
cd backend
```

#### Passo 4: Criar arquivo .env.production

```bash
nano .env.production
```

Cole o conteúdo (atualize com seus valores):

```env
NODE_ENV=production
PORT=3001
DB_HOST=postgres
DB_PORT=5432
DB_NAME=webfusionlab
DB_USER=webfusionlab
DB_PASSWORD=SENHA_FORTE_AQUI
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_senha_app
SENDER_EMAIL=noreply@webfusionlab.pt
SENDER_NAME=WebFusionLab
CONTACT_ADMIN_EMAIL=admin@webfusionlab.pt
JWT_SECRET=JWT_SECRET_FORTE_AQUI
```

#### Passo 5: Build e start

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

#### Passo 6: Verificar logs

```bash
docker-compose -f docker-compose.prod.yml logs -f backend
```

#### Passo 7: Verificar saúde da API

```bash
curl http://localhost:3001
```

---

### Opção 2: Deploy Automatizado (do seu Mac)

#### Passo 1: Estar no diretório do backend

```bash
cd /Users/carloslima/Desktop/webfusinlab/backend
```

#### Passo 2: Configurar .env.production na VPS (primeira vez)

Via SSH:

```bash
ssh usuario@seu-servidor
cd /var/www/webfusionlab/backend
nano .env.production
# Cole as variáveis de ambiente
```

#### Passo 3: Executar script de deploy

```bash
./deploy.sh usuario@seu-servidor
```

Exemplo:

```bash
./deploy.sh root@192.168.1.100
```

---

## 🔐 Configurar Nginx para a API

### Passo 1: Criar arquivo de configuração

```bash
sudo nano /etc/nginx/sites-available/api.webfusionlab
```

### Passo 2: Colar a configuração

```nginx
server {
    listen 80;
    server_name api.webfusionlab.pt;

    location / {
        return 301 https://$server_name$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name api.webfusionlab.pt;

    ssl_certificate /etc/letsencrypt/live/webfusionlab.pt/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/webfusionlab.pt/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

### Passo 3: Ativar o site

```bash
sudo ln -s /etc/nginx/sites-available/api.webfusionlab /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Passo 4: SSL para o subdomínio (se não estiver já incluído)

```bash
sudo certbot --nginx -d api.webfusionlab.pt
```

---

## 📋 Variáveis de Ambiente Importantes

| Variável              | Descrição           | Exemplo                            |
| --------------------- | ------------------- | ---------------------------------- |
| `PORT`                | Porta da API        | `3001`                             |
| `NODE_ENV`            | Ambiente            | `production`                       |
| `DB_HOST`             | Host do PostgreSQL  | `postgres` (Docker) ou `localhost` |
| `DB_PORT`             | Porta do PostgreSQL | `5432`                             |
| `DB_NAME`             | Nome do banco       | `webfusionlab`                     |
| `DB_USER`             | Usuário do BD       | `webfusionlab`                     |
| `DB_PASSWORD`         | Senha do BD         | `SENHA_FORTE`                      |
| `SMTP_HOST`           | Host SMTP           | `smtp.gmail.com`                   |
| `SMTP_PORT`           | Porta SMTP          | `587`                              |
| `SMTP_USER`           | Email SMTP          | `seu_email@gmail.com`              |
| `SMTP_PASSWORD`       | Senha app SMTP      | `sua_senha_app`                    |
| `SENDER_EMAIL`        | Email de envio      | `noreply@webfusionlab.pt`          |
| `CONTACT_ADMIN_EMAIL` | Email do admin      | `admin@webfusionlab.pt`            |
| `JWT_SECRET`          | Secret JWT          | `CHAVE_SECRETA_FORTE`              |

---

## 📋 Comandos Úteis

### Ver status dos containers

```bash
docker-compose -f docker-compose.prod.yml ps
```

### Ver logs em tempo real

```bash
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f postgres
```

### Parar containers

```bash
docker-compose -f docker-compose.prod.yml stop
```

### Reiniciar containers

```bash
docker-compose -f docker-compose.prod.yml restart
```

### Remover e reconstruir (cuidado!)

```bash
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

### Acessar shell do container backend

```bash
docker-compose -f docker-compose.prod.yml exec backend sh
```

### Acessar shell do PostgreSQL

```bash
docker-compose -f docker-compose.prod.yml exec postgres psql -U webfusionlab -d webfusionlab
```

### Ver comandos SQL úteis

```bash
# Listar tabelas
\dt

# Listar bancos
\l

# Conectar a um banco
\c webfusionlab

# Sair
\q
```

---

## 🔄 Atualizar Aplicação

### Do seu Mac (automático)

```bash
cd /Users/carloslima/Desktop/webfusinlab/backend
git pull origin main
./deploy.sh usuario@seu-servidor
```

### Na VPS (manual)

```bash
cd /var/www/webfusionlab/backend
git pull origin main
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 📊 Backup do Banco de Dados

### Fazer backup

```bash
docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U webfusionlab webfusionlab > backup.sql
```

### Restaurar backup

```bash
docker-compose -f docker-compose.prod.yml exec -T postgres psql -U webfusionlab webfusionlab < backup.sql
```

---

## 🐛 Troubleshooting

### Container backend não inicia

```bash
docker-compose -f docker-compose.prod.yml logs backend
```

### Erro de conexão com PostgreSQL

```bash
# Verificar se postgres está rodando
docker-compose -f docker-compose.prod.yml ps

# Verificar logs do postgres
docker-compose -f docker-compose.prod.yml logs postgres

# Tentar reconectar
docker-compose -f docker-compose.prod.yml restart backend
```

### Erro de porta em uso

```bash
lsof -i :3001
sudo kill -9 <PID>
```

### Nginx não funciona

```bash
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx
```

### Limpar tudo e recomeçar

```bash
cd /var/www/webfusionlab/backend
docker-compose -f docker-compose.prod.yml down -v
rm -rf node_modules dist
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 🔄 Fluxo Completo de Deploy

### Primeira vez na VPS:

1. **SSH na VPS**

```bash
ssh usuario@servidor
```

2. **Criar estrutura**

```bash
sudo mkdir -p /var/www/webfusionlab
sudo chown $USER:$USER /var/www/webfusionlab
cd /var/www/webfusionlab
```

3. **Clonar repo**

```bash
git clone <seu-repo> .
cd backend
```

4. **Configurar .env**

```bash
nano .env.production
# Adicionar variáveis
```

5. **Subir containers**

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

6. **Configurar Nginx**

```bash
sudo nano /etc/nginx/sites-available/api.webfusionlab
# Adicionar configuração
sudo ln -s /etc/nginx/sites-available/api.webfusionlab /etc/nginx/sites-enabled/
sudo certbot --nginx -d api.webfusionlab.pt
sudo systemctl reload nginx
```

### Próximas vezes (do seu Mac):

```bash
cd /Users/carloslima/Desktop/webfusinlab/backend
git push origin main
./deploy.sh usuario@servidor
```

---

## 📞 URLs de Acesso

- **Frontend**: https://webfusionlab.pt
- **Backend API**: https://api.webfusionlab.pt
- **Documentação API** (dev): http://localhost:3001/api-docs
