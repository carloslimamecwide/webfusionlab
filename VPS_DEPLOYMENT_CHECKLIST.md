# ✅ Checklist Deploy VPS - WebFusionLab

## 📋 Verificação Final - Tudo Configurado Corretamente

### ✅ Frontend (webfusionlab.pt)

- [x] Docker Compose configurado
- [x] Variáveis de ambiente:
  - `NEXT_PUBLIC_SITE_URL=https://webfusionlab.pt`
  - `NEXT_PUBLIC_API_URL=https://api.webfusionlab.pt`
- [x] Port: 3000
- [x] Dockerfile otimizado com multi-stage build

### ✅ Backend (api.webfusionlab.pt)

- [x] Docker Compose com PostgreSQL
- [x] Variáveis de ambiente configuradas
- [x] Port: 3001
- [x] Healthcheck no PostgreSQL
- [x] Email service pronto
- [x] Swagger documentação pronta

### ✅ Domínios

- [x] Frontend: `webfusionlab.pt` ou `www.webfusionlab.pt`
- [x] Backend API: `api.webfusionlab.pt`
- [x] DNS apontando para VPS

---

## 🚀 Deploy Checklist VPS

### Passo 1: Preparação da VPS

```bash
# Update sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo apt install docker-compose -y

# Instalar Nginx
sudo apt install nginx -y

# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y
```

### Passo 2: Estrutura de Pastas

```bash
cd /var/www
sudo mkdir -p webfusionlab/{backend,frontend}
sudo chown $USER:$USER webfusionlab
```

### Passo 3: Deploy Backend

```bash
cd /var/www/webfusionlab/backend

# Clonar ou transferir código
git clone <seu-repo> .
# OU
# scp -r local/backend/* user@server:/var/www/webfusionlab/backend/

# Criar .env.production com variáveis corretas
nano .env.production
```

**Conteúdo de .env.production (backend):**

```env
NODE_ENV=production
PORT=3001

# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=webfusionlab
DB_USER=webfusionlab
DB_PASSWORD=SENHA_FORTE_AQUI_32_CARACTERES

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_app_password_gerada_no_gmail

# Email config
SENDER_EMAIL=noreply@webfusionlab.pt
SENDER_NAME=WebFusionLab
CONTACT_ADMIN_EMAIL=admin@webfusionlab.pt

# JWT
JWT_SECRET=JWT_SECRET_FORTE_AQUI_32_CARACTERES_ALEATORIO
```

**Start Backend:**

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

**Verificar:**

```bash
docker-compose -f docker-compose.prod.yml ps
docker logs -f webfusionlab-backend
```

### Passo 4: Deploy Frontend

```bash
cd /var/www/webfusionlab/frontend

# Clonar ou transferir código
git clone <seu-repo> .
# OU
# scp -r local/frontend/* user@server:/var/www/webfusionlab/frontend/

# Start Frontend
docker-compose up -d --build
```

**Verificar:**

```bash
docker-compose ps
docker logs -f webfusionlab-frontend
```

### Passo 5: Configurar Nginx

#### Frontend (webfusionlab.pt)

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
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://localhost:3000;
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

#### Backend (api.webfusionlab.pt)

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
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security headers
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

**Ativar sites:**

```bash
sudo ln -s /etc/nginx/sites-available/webfusionlab /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.webfusionlab /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Passo 6: SSL com Let's Encrypt

```bash
# Gerar certificado para ambos os domínios
sudo certbot --nginx -d webfusionlab.pt -d www.webfusionlab.pt -d api.webfusionlab.pt

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Passo 7: Firewall

```bash
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw status
```

---

## 🔍 Verificação Final

### Testar Frontend

```bash
curl -I https://webfusionlab.pt
curl -I https://www.webfusionlab.pt
```

### Testar Backend

```bash
curl -I https://api.webfusionlab.pt
curl -I https://api.webfusionlab.pt/
```

### Testar Contacto

```bash
curl -X POST https://api.webfusionlab.pt/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "seu_email@gmail.com",
    "subject": "Teste",
    "message": "Mensagem de teste com mais de dez caracteres"
  }'
```

### Verificar Logs

```bash
# Backend
docker logs -f webfusionlab-backend

# Frontend
docker logs -f webfusionlab-frontend

# Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 📊 Status Atual

| Componente | Status    | Porta  | Domínio             |
| ---------- | --------- | ------ | ------------------- |
| Frontend   | ✅ Pronto | 3000   | webfusionlab.pt     |
| Backend    | ✅ Pronto | 3001   | api.webfusionlab.pt |
| PostgreSQL | ✅ Pronto | 5432   | localhost           |
| Nginx      | ✅ Pronto | 80/443 | Ambos               |
| SSL        | ✅ Pronto | 443    | Let's Encrypt       |

---

## 📝 Variáveis de Ambiente Necessárias

### Backend (.env.production)

- ✅ `DB_PASSWORD` - MUDAR (gerar senha forte)
- ✅ `SMTP_USER` - MUDAR (seu email Gmail)
- ✅ `SMTP_PASSWORD` - MUDAR (app password do Gmail)
- ✅ `JWT_SECRET` - MUDAR (gerar token aleatório)

### Frontend (.env.production)

- ✅ `NEXT_PUBLIC_SITE_URL=https://webfusionlab.pt`
- ✅ `NEXT_PUBLIC_API_URL=https://api.webfusionlab.pt`

---

## 🚨 Checklist Pré-Deploy

- [ ] VPS com Docker e Docker Compose instalados
- [ ] Nginx instalado e ativo
- [ ] Domínios apontam para VPS (DNS)
- [ ] Backend .env.production criado e configurado
- [ ] Variáveis secretas alteradas (DB_PASSWORD, JWT_SECRET, etc)
- [ ] Email SMTP configurado (Gmail app password)
- [ ] SSL Let's Encrypt instalado
- [ ] Firewall configurado
- [ ] Nginx configurado para ambos os sites
- [ ] Docker containers iniciados e rodando
- [ ] Testes de conectividade OK

---

## 🎯 Quick Deploy Script

```bash
#!/bin/bash

# Setup VPS
cd /var/www/webfusionlab

# Backend
cd backend
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
sleep 10

# Frontend
cd ../frontend
docker-compose down
docker-compose up -d --build

# Status
echo "Backend:"
docker-compose -f docker-compose.prod.yml ps
echo "Frontend:"
docker-compose ps

# Restart Nginx
sudo systemctl reload nginx

echo "✅ Deploy concluído!"
echo "Frontend: https://webfusionlab.pt"
echo "Backend: https://api.webfusionlab.pt"
```

---

## 📞 Troubleshooting

### Container não inicia

```bash
docker logs webfusionlab-backend
docker logs webfusionlab-frontend
```

### Porta em conflito

```bash
lsof -i :3000
lsof -i :3001
```

### Nginx error

```bash
sudo nginx -t
sudo systemctl restart nginx
sudo tail -f /var/log/nginx/error.log
```

### Database connection error

```bash
docker exec webfusionlab-postgres psql -U webfusionlab -d webfusionlab -c "SELECT 1"
```

---

## ✅ RESUMO - ESTÁ TUDO PRONTO!

🟢 **Frontend**: Configurado para `webfusionlab.pt`
🟢 **Backend**: Configurado para `api.webfusionlab.pt`
🟢 **Docker**: Ambos com Dockerfiles otimizados
🟢 **Ambiente**: Variáveis corretas
🟢 **Email**: Sistema de contacto integrado
🟢 **API**: Swagger documentada

**Próximo passo**: Executar na VPS! 🚀
