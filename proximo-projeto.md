# Novo projeto no VPS (modelo)

Exemplo com domínio fictício `meuprojeto.pt` e API em `api.meuprojeto.pt`. Troca pelos teus nomes reais.

## 1) DNS

- A: `meuprojeto.pt` → IP do VPS
- A: `www.meuprojeto.pt` → IP do VPS (opcional, recomendado)
- CNAME: nome:"WWW" `api.meuprojeto.pt` → IP do VPS
- Testar: `ping meuprojeto.pt` e `ping api.meuprojeto.pt` (devem responder com o IP do VPS)

## 2) Código no servidor

```
cd /opt
git clone https://github.com/teu-user/teu-repo-novo.git meuprojeto
cd meuprojeto
# estrutura recomendada
# /opt/meuprojeto/frontend
# /opt/meuprojeto/backend
```

## 3) Docker com novas portas (ex.: 4000 frontend, 4001 backend)

### Backend (/opt/meuprojeto/backend)

`docker-compose.prod.yml` exemplo:

```
version: "3.8"

services:
  postgres:
    image: postgres:15-alpine
    container_name: meuprojeto-postgres
    environment:
      POSTGRES_DB: meuprojeto
      POSTGRES_USER: meuprojeto
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - meuprojeto_postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    networks:
      - meuprojeto_net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U meuprojeto"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: meuprojeto-backend
    ports:
      - "4001:4001"  # porta diferente
    environment:
      - NODE_ENV=production
      - PORT=4001
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=meuprojeto
      - DB_USER=meuprojeto
      - DB_PASSWORD=${DB_PASSWORD}
      # outras variáveis (SMTP, JWT, etc.)
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - meuprojeto_net

volumes:
  meuprojeto_postgres_data:

networks:
  meuprojeto_net:
    driver: bridge
```

Subir e verificar:

```
cd /opt/meuprojeto/backend
docker-compose -f docker-compose.prod.yml up -d --build
docker ps  # ver 0.0.0.0:4001->4001/tcp
```

### Frontend (/opt/meuprojeto/frontend)

`docker-compose.yml` exemplo:

```
version: "3.8"

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: meuprojeto-frontend
    ports:
      - "4000:4000"  # porta diferente
    env_file:
      - .env
    restart: unless-stopped
    networks:
      - meuprojeto_net

networks:
  meuprojeto_net:
    driver: bridge
```

`.env` do frontend:

```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://meuprojeto.pt
NEXT_PUBLIC_API_URL=https://api.meuprojeto.pt
```

Subir e verificar:

```
cd /opt/meuprojeto/frontend
docker-compose up -d --build
docker ps  # ver 0.0.0.0:4000->4000/tcp
curl -I http://127.0.0.1:4000
curl -I http://127.0.0.1:4001
```

## 4) Nginx (reverse proxy)

### Site principal (meuprojeto.pt)

`/etc/nginx/sites-available/meuprojeto`

```
server {
  listen 80;
  server_name meuprojeto.pt www.meuprojeto.pt;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name meuprojeto.pt www.meuprojeto.pt;

  ssl_certificate /etc/letsencrypt/live/meuprojeto.pt/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/meuprojeto.pt/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  location / {
    proxy_pass http://127.0.0.1:4000;
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

Ativar:

```
sudo ln -s /etc/nginx/sites-available/meuprojeto /etc/nginx/sites-enabled/meuprojeto
```

### API (api.meuprojeto.pt)

`/etc/nginx/sites-available/api-meuprojeto`

```
server {
  listen 80;
  server_name api.meuprojeto.pt;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name api.meuprojeto.pt;

  ssl_certificate /etc/letsencrypt/live/meuprojeto.pt/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/meuprojeto.pt/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  location / {
    proxy_pass http://127.0.0.1:4001;
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

Ativar:

```
sudo ln -s /etc/nginx/sites-available/api-meuprojeto /etc/nginx/sites-enabled/api-meuprojeto
```

## 5) Certbot

Se ainda não tens certificados para o domínio:

```
sudo certbot --nginx -d meuprojeto.pt -d www.meuprojeto.pt -d api.meuprojeto.pt
```

## 6) Testes

```
sudo nginx -t
sudo systemctl reload nginx
curl -I https://meuprojeto.pt
curl -I https://api.meuprojeto.pt
```

## Modelo mental (checklist rápido)

- DNS: apontar domínio/subdomínios para o IP do VPS
- Código: /opt/<nome-do-projeto> com frontend + backend
- Docker: portas únicas (frontend e backend) + nomes de containers/volumes próprios
- Nginx: ficheiros novos em sites-available + symlink em sites-enabled
- Certbot: emitir certificados para o novo domínio
- Testes: `curl -I` e browser em `https://meuprojeto.pt` e `https://api.meuprojeto.pt`

Se quiseres, partilha o domínio e estrutura do repo que geramos os ficheiros docker-compose e nginx já prontos com os nomes certos.
