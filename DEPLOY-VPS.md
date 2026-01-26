# Deploy VPS (webfusionlab.pt + api.webfusionlab.pt)

Guia passo a passo via CLI, assumindo um VPS limpo e deploy via repo.

## 0) DNS (antes do VPS)

- A `webfusionlab.pt` -> IP do VPS
- A `www.webfusionlab.pt` -> IP do VPS
- A `api.webfusionlab.pt` -> IP do VPS

## 1) Atualizar o servidor e instalar dependencias basicas

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y git curl ufw nginx
```

Ativar Nginx no boot:

```bash
sudo systemctl enable nginx
```

## 2) Instalar Docker e Docker Compose

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

Reinicia a sessao (logout/login) para aplicar o grupo `docker`.

Instalar docker-compose:

```bash
sudo apt install -y docker-compose
```

Validar:

```bash
docker --version
docker-compose --version
```

## 3) Firewall (UFW)

```bash
sudo ufw allow OpenSSH
sudo ufw allow "Nginx Full"
sudo ufw --force enable
sudo ufw status
```

## 4) Clonar o repo no servidor

```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
git clone <URL_DO_REPO> webfusionlab
cd /var/www/webfusionlab
```

## 5) Configurar variaveis de ambiente

Backend:

```bash
nano /var/www/webfusionlab/backend/.env.production
```

Exemplo (ajusta os valores reais):

```
NODE_ENV=production
PORT=3001
DB_HOST=postgres
DB_PORT=5432
DB_NAME=webfusionlab
DB_USER=webfusionlab
DB_PASSWORD=troca_isto
POSTGRES_DB=webfusionlab
POSTGRES_USER=webfusionlab
POSTGRES_PASSWORD=troca_isto
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=teu_email
SMTP_PASSWORD=teu_app_password
SENDER_EMAIL=noreply@webfusionlab.pt
SENDER_NAME=WebFusionLab
CONTACT_ADMIN_EMAIL=admin@webfusionlab.pt
JWT_SECRET=troca_isto_por_uma_string_forte
```

Frontend:

```bash
nano /var/www/webfusionlab/frontend/.env.production
```

```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://webfusionlab.pt
NEXT_PUBLIC_API_URL=https://api.webfusionlab.pt
```

## 6) Subir os containers (root compose)

```bash
cd /var/www/webfusionlab
docker-compose up -d --build
docker-compose ps
```

## 7) Configurar Nginx (host) para os dois dominios

Criar o ficheiro:

```bash
sudo nano /etc/nginx/sites-available/webfusionlab
```

Cola o conteudo:

```nginx
server {
    listen 80;
    server_name webfusionlab.pt www.webfusionlab.pt;
    return 301 https://$host$request_uri;
}

server {
    listen 80;
    server_name api.webfusionlab.pt;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name webfusionlab.pt www.webfusionlab.pt;

    ssl_certificate /etc/letsencrypt/live/webfusionlab.pt/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/webfusionlab.pt/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 443 ssl http2;
    server_name api.webfusionlab.pt;

    ssl_certificate /etc/letsencrypt/live/api.webfusionlab.pt/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.webfusionlab.pt/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ativar o site:

```bash
sudo ln -s /etc/nginx/sites-available/webfusionlab /etc/nginx/sites-enabled/webfusionlab
sudo nginx -t
sudo systemctl reload nginx
```

## 8) SSL com Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d webfusionlab.pt -d www.webfusionlab.pt -d api.webfusionlab.pt
```

## 9) Testes rapidos

```bash
curl -I https://webfusionlab.pt
curl -I https://api.webfusionlab.pt
docker logs webfusionlab-frontend --tail=50
docker logs webfusionlab-backend --tail=50
```

## 10) Atualizacoes futuras (deploy pelo repo)

```bash
cd /var/www/webfusionlab
git pull origin main
docker-compose up -d --build
```
