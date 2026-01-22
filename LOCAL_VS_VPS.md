# WebFusionLab - Setup Local vs VPS

## 🏠 Rodar Localmente (Sem Docker)

### Backend

#### Passo 1: Instalar PostgreSQL

```bash
brew install postgresql@15
brew services start postgresql@15
```

#### Passo 2: Criar banco de dados

```bash
createdb webfusionlab
psql webfusionlab < /Users/carloslima/Desktop/webfusinlab/backend/setup.sql
```

#### Passo 3: Instalar dependências

```bash
cd /Users/carloslima/Desktop/webfusinlab/backend
npm install
```

#### Passo 4: Criar .env local

```bash
cp .env.example .env
```

Editar `.env`:

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
JWT_SECRET=seu_jwt_secret
```

#### Passo 5: Rodar backend

```bash
npm run dev
```

Acessa em: **http://localhost:3001**

### Frontend

#### Passo 1: Instalar dependências

```bash
cd /Users/carloslima/Desktop/webfusinlab/frontend
npm install
```

#### Passo 2: Rodar frontend

```bash
npm run dev
```

Acessa em: **http://localhost:3000**

---

## 🚀 Deploy na VPS (Com Docker)

### Backend na VPS

#### Passo 1: SSH na VPS

```bash
ssh usuario@seu-servidor
```

#### Passo 2: Criar estrutura

```bash
sudo mkdir -p /var/www/webfusionlab/backend
sudo chown $USER:$USER /var/www/webfusionlab/backend
cd /var/www/webfusionlab/backend
```

#### Passo 3: Clonar repo

```bash
git clone <seu-repo> .
```

#### Passo 4: Criar .env.production

```bash
nano .env.production
```

Cole (atualize com seus valores):

```env
NODE_ENV=production
PORT=3001
DB_HOST=postgres
DB_PORT=5432
DB_NAME=webfusionlab
DB_USER=webfusionlab
DB_PASSWORD=SENHA_SUPER_FORTE
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_senha_app
SENDER_EMAIL=noreply@webfusionlab.pt
SENDER_NAME=WebFusionLab
CONTACT_ADMIN_EMAIL=admin@webfusionlab.pt
JWT_SECRET=JWT_SECRET_SUPER_FORTE
```

#### Passo 5: Subir com Docker Compose

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

#### Passo 6: Ver logs

```bash
docker-compose -f docker-compose.prod.yml logs -f backend
```

---

### Frontend na VPS

#### Passo 1: SSH na VPS

```bash
ssh usuario@seu-servidor
```

#### Passo 2: Criar estrutura

```bash
sudo mkdir -p /var/www/webfusionlab/frontend
sudo chown $USER:$USER /var/www/webfusionlab/frontend
cd /var/www/webfusionlab/frontend
```

#### Passo 3: Clonar repo

```bash
git clone <seu-repo> .
```

#### Passo 4: Subir com Docker Compose

```bash
docker-compose up -d --build
```

#### Passo 5: Ver logs

```bash
docker-compose logs -f webfusionlab-frontend
```

---

## 🔐 Configurar Nginx na VPS

### Frontend (webfusionlab.pt)

```bash
sudo nano /etc/nginx/sites-available/webfusionlab
```

```nginx
server {
    listen 80;
    server_name webfusionlab.pt www.webfusionlab.pt;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name webfusionlab.pt www.webfusionlab.pt;

    ssl_certificate /etc/letsencrypt/live/webfusionlab.pt/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/webfusionlab.pt/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Backend API (api.webfusionlab.pt)

```bash
sudo nano /etc/nginx/sites-available/api.webfusionlab
```

```nginx
server {
    listen 80;
    server_name api.webfusionlab.pt;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.webfusionlab.pt;

    ssl_certificate /etc/letsencrypt/live/webfusionlab.pt/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/webfusionlab.pt/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Ativar sites

```bash
sudo ln -s /etc/nginx/sites-available/webfusionlab /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.webfusionlab /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL com Let's Encrypt

```bash
sudo certbot --nginx -d webfusionlab.pt -d www.webfusionlab.pt -d api.webfusionlab.pt
```

---

## 📋 Comandos Rápidos Locais

### Backend

```bash
cd /Users/carloslima/Desktop/webfusinlab/backend

# Rodar em desenvolvimento
npm run dev

# Build
npm run build

# Rodar produção local
npm start
```

### Frontend

```bash
cd /Users/carloslima/Desktop/webfusinlab/frontend

# Rodar em desenvolvimento
npm run dev

# Build
npm run build

# Rodar produção local
npm start
```

---

## 📋 Comandos Rápidos VPS (Docker)

```bash
# Status dos containers
docker-compose -f docker-compose.prod.yml ps
docker-compose ps

# Logs em tempo real
docker-compose -f docker-compose.prod.yml logs -f
docker-compose logs -f

# Parar
docker-compose -f docker-compose.prod.yml stop
docker-compose stop

# Reiniciar
docker-compose -f docker-compose.prod.yml restart
docker-compose restart

# Remover tudo (cuidado!)
docker-compose -f docker-compose.prod.yml down
docker-compose down

# Atualizar
git pull origin main
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## ✅ Resumo

| Ambiente       | Como Rodar          | Porta                     |
| -------------- | ------------------- | ------------------------- |
| Backend Local  | `npm run dev`       | 3001                      |
| Frontend Local | `npm run dev`       | 3000                      |
| Backend VPS    | `docker-compose up` | 443 (api.webfusionlab.pt) |
| Frontend VPS   | `docker-compose up` | 443 (webfusionlab.pt)     |
