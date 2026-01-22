# Deploy Guide - WebFusionLab Frontend

## Pré-requisitos na VPS

1. Docker e Docker Compose instalados
2. Nginx instalado
3. Certificado SSL (Let's Encrypt/Certbot)
4. Domínio webfusionlab.pt apontado para o IP da VPS

## Instalação na VPS

### 1. Instalar Docker (se necessário)

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### 2. Instalar Docker Compose (se necessário)

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. Clonar/Transferir o projeto

```bash
# Opção 1: Via Git
git clone <seu-repo> /var/www/webfusionlab
cd /var/www/webfusionlab/frontend

# Opção 2: Via SCP do seu Mac
scp -r /Users/carloslima/Desktop/webfusinlab/frontend user@seu-servidor:/var/www/webfusionlab/
```

### 4. Build e Start do Container

```bash
cd /var/www/webfusionlab/frontend
docker-compose up -d --build
```

### 5. Verificar logs

```bash
docker logs -f webfusionlab-frontend
```

## Configuração do Nginx

### Criar arquivo de configuração

```bash
sudo nano /etc/nginx/sites-available/webfusionlab
```

### Conteúdo do arquivo:

```nginx
server {
    listen 80;
    server_name webfusionlab.pt www.webfusionlab.pt;

    # Redirecionar HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name webfusionlab.pt www.webfusionlab.pt;

    # Certificados SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/webfusionlab.pt/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/webfusionlab.pt/privkey.pem;

    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Proxy para o container Next.js
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

    # Otimizações
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Ativar o site

```bash
sudo ln -s /etc/nginx/sites-available/webfusionlab /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Configurar SSL com Let's Encrypt

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d webfusionlab.pt -d www.webfusionlab.pt
```

## Comandos úteis

### Rebuild da aplicação

```bash
cd /var/www/webfusionlab/frontend
docker-compose down
docker-compose up -d --build
```

### Ver logs

```bash
docker logs -f webfusionlab-frontend
```

### Parar containers

```bash
docker-compose down
```

### Reiniciar containers

```bash
docker-compose restart
```

### Ver status

```bash
docker-compose ps
```

### Atualizar aplicação (pull de novo código)

```bash
cd /var/www/webfusionlab/frontend
git pull origin main
docker-compose down
docker-compose up -d --build
```

## Configuração de Firewall (UFW)

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## Monitoramento

### Verificar uso de recursos

```bash
docker stats webfusionlab-frontend
```

### Configurar auto-restart

O container já está configurado com `restart: unless-stopped` no docker-compose.yml

## Backup

### Fazer backup da imagem

```bash
docker save webfusionlab-frontend:latest | gzip > webfusionlab-frontend-backup.tar.gz
```

## Troubleshooting

### Container não inicia

```bash
docker logs webfusionlab-frontend
```

### Portas em conflito

```bash
sudo lsof -i :3000
sudo netstat -tulpn | grep 3000
```

### Limpar cache do Docker

```bash
docker system prune -a
```

## CI/CD (Opcional)

Para automatizar deployments, você pode criar um webhook ou usar GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/webfusionlab/frontend
            git pull origin main
            docker-compose down
            docker-compose up -d --build
```

## Variáveis de Ambiente

Ajuste conforme necessário no arquivo `.env.production` ou diretamente no `docker-compose.yml`:

- `NEXT_PUBLIC_SITE_URL`: https://webfusionlab.pt
- `NEXT_PUBLIC_API_URL`: URL da sua API backend
- `NODE_ENV`: production

## Recursos adicionais

- Docker Hub: https://hub.docker.com/
- Next.js Deployment: https://nextjs.org/docs/deployment
- Nginx Documentation: https://nginx.org/en/docs/
