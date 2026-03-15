# CI/CD de Producao com GitHub Actions + Self-Hosted Runner

Este guia substitui o fluxo antigo baseado em `git pull` manual no servidor e Nginx no host. A partir daqui, o deploy de producao passa a acontecer localmente no servidor atraves de um `self-hosted runner`, sem SSH inbound para deploy 1.

## 1. Estrategia de branches recomendada

- `develop`: branch de trabalho diario.
- `main`: branch de producao neste repositorio.
- Trabalha sempre em `develop`.
- Quando estiver pronto para publicar, abre um PR de `develop` para `main`.
- O PR para `main` corre primeiro o workflow [`.github/workflows/pr-validation.yml`](./.github/workflows/pr-validation.yml).
- Se a validacao falhar, o PR nao deve ser merged.
- O merge em `main` dispara automaticamente o workflow [`.github/workflows/production.yml`](./.github/workflows/production.yml).
- Nao faças commits diretos em `main`; protege a branch para aceitar apenas merges via PR.

Fluxo recomendado:

1. Desenvolver e validar em `develop`.
2. Abrir PR `develop -> main`.
3. Fazer merge.
4. O runner self-hosted no servidor executa validacao, build e deploy local.

## 2. Arquitetura recomendada

Arquitetura simples e robusta para um developer sozinho:

- GitHub recebe o merge em `main`.
- O GitHub Actions agenda o job no runner com labels `self-hosted`, `linux`, `production`.
- O runner esta instalado no proprio servidor de producao, ou numa maquina interna com acesso ao Docker do servidor.
- O job faz `checkout`, gera os ficheiros `.env.production`, valida o codigo, corre testes, faz build das imagens e executa `docker compose up -d`.
- O `nginx` do WebFusionLab corre num container separado e publica `80/443`.
- O TLS termina no proprio container `nginx`.
- O `nginx` do WebFusionLab faz reverse proxy para:
  - `frontend:3000`
  - `backend:3001`
- `frontend`, `backend`, `nginx` e `postgres` correm na mesma rede Docker privada.
- Apenas o `nginx` publica porta para o exterior.

Resumo da topologia:

```text
GitHub (push em main)
        |
        v
GitHub Actions
        |
        v
Self-hosted runner no servidor de producao
        |
        v
docker compose up -d --build
        |
        +--> nginx (porta publica 80/443)
        +--> frontend (interno)
        +--> backend (interno)
        +--> postgres (interno)
```

## 3. Workflow de validacao de PR

Ficheiro: [`.github/workflows/pr-validation.yml`](./.github/workflows/pr-validation.yml)

O workflow faz:

1. Trigger em `pull_request` para `main`.
2. Corre em `ubuntu-latest`, separado do runner de producao.
3. Usa os ficheiros `.env.production.example` para validar sem depender de segredos de producao.
4. Checkout do repositorio.
5. Validacao de frontend e backend.
6. Execucao de testes quando existirem.
7. Build de frontend e backend.
8. Validacao de `docker compose config`.
9. Build das imagens `nginx`, `frontend` e `backend`.

Configuracao obrigatoria no GitHub:

1. `Settings -> Branches -> Add rule` para `main`.
2. Ativar `Require a pull request before merging`.
3. Ativar `Require status checks to pass before merging`.
4. Ativar `Require branches to be up to date before merging`.
5. Selecionar o check `Validate Pull Request`.
6. Opcional mas recomendado: ativar `Do not allow bypassing the above settings`.

Sem este branch protection, o workflow valida o PR, mas o GitHub continua a permitir merge manual.

## 4. Workflow de producao

Ficheiro: [`.github/workflows/production.yml`](./.github/workflows/production.yml)

O workflow faz:

1. Trigger em `push` para `main`.
2. Tambem pode ser executado manualmente via `workflow_dispatch`.
3. Execucao apenas no runner `self-hosted`, `linux`, `production`.
4. Checkout do repositorio.
5. Geracao local dos `.env.production` a partir de GitHub Secrets/Variables.
6. Validacao de frontend e backend.
7. Execucao de testes quando existirem.
8. Build de frontend e backend.
9. Build das imagens Docker.
10. Deploy local via `docker compose up -d --remove-orphans --wait`.

## 5. Docker Compose de producao

Ficheiro: [`docker-compose.yml`](./docker-compose.yml)

Servicos incluidos:

- `nginx`: reverse proxy publico com TLS.
- `frontend`: Next.js em modo standalone.
- `backend`: API Node/TypeScript.
- `postgres`: base de dados local do stack.

Notas:

- `frontend` e `backend` usam `expose`, nao `ports`, para ficarem acessiveis apenas dentro da rede Docker.
- `nginx` e o unico servico com portas publicadas.
- `80` serve redirect e healthcheck.
- `443` serve trafego HTTPS publico.
- Foram adicionados `healthchecks` para suportar `docker compose up --wait`.

## 6. Dockerfile do frontend

Ficheiro: [`frontend/Dockerfile`](./frontend/Dockerfile)

Boas praticas aplicadas:

- multi-stage build;
- Node 20 para alinhar com Next.js 16;
- imagem final reduzida;
- utilizador nao-root;
- `HEALTHCHECK`;
- `NEXT_TELEMETRY_DISABLED=1`.

## 7. Dockerfile do backend

Ficheiro: [`backend/Dockerfile`](./backend/Dockerfile)

Boas praticas aplicadas:

- multi-stage build;
- dependencias de runtime separadas das de build;
- correcoes na copia das migracoes (`src/migrations`);
- utilizador nao-root;
- `HEALTHCHECK`.

## 8. Configuracao do Nginx

Ficheiros:

- [`nginx/Dockerfile`](./nginx/Dockerfile)
- [`nginx/default.conf`](./nginx/default.conf)

O `nginx` corre num container dedicado e faz:

- `webfusionlab.pt` e `www.webfusionlab.pt` -> `frontend:3000`
- `api.webfusionlab.pt` -> `backend:3001`
- TLS no proprio container usando:
  - `origin.crt`
  - `origin.key`
  montados a partir da VPS

Se mudares os dominios, adapta apenas o `server_name` em [`nginx/default.conf`](./nginx/default.conf) e as variaveis publicas do frontend.

## 9. Secrets e variables necessarios

Usa o Environment `production` no GitHub e coloca la as seguintes configuracoes.

Nao existem fallbacks no workflow de producao. Se faltar alguma variable, secret ou ficheiro de certificado, o job falha antes do deploy.

### Variables

- `PROD_COMPOSE_PROJECT_NAME=webfusionlab`
- `PROD_NGINX_HTTP_PORT=80`
- `PROD_NGINX_HTTPS_PORT=443`
- `PROD_NGINX_CERTS_PATH=/opt/webfusionlab/nginx-certs`
- `PROD_FRONTEND_SITE_URL=https://webfusionlab.pt`
- `PROD_FRONTEND_API_URL=https://api.webfusionlab.pt`
- `PROD_DB_NAME=webfusionlab`
- `PROD_DB_USER=webfusionlab`
- `PROD_SMTP_HOST=smtp.gmail.com`
- `PROD_SMTP_PORT=587`
- `PROD_SENDER_EMAIL=noreply@webfusionlab.pt`
- `PROD_SENDER_NAME=WebFusionLab`
- `PROD_CONTACT_ADMIN_EMAIL=admin@webfusionlab.pt`
- `PROD_SEED_ADMIN=false`
- `PROD_SEED_ADMIN_EMAIL=admin@webfusionlab.pt`
  Apenas obrigatoria quando `PROD_SEED_ADMIN=true`.

### Secrets

- `PROD_DB_PASSWORD=<password_forte_da_base_de_dados>`
- `PROD_SMTP_USER=<conta_smtp_real>`
- `PROD_SMTP_PASSWORD=<password_ou_app_password_smtp>`
- `PROD_JWT_SECRET=<segredo_longo_e_aleatorio>`
- `PROD_ADMIN_REGISTRATION_TOKEN=<token_longo_e_aleatorio>`
- `PROD_SEED_ADMIN_PASSWORD=<senha_inicial_admin_ou_valor_aleatorio>`
  Apenas obrigatoria quando `PROD_SEED_ADMIN=true`.

### Validacoes feitas pelo workflow antes do deploy

- Todas as `Variables` obrigatorias existem no Environment `production`.
- Todos os `Secrets` obrigatorios existem no Environment `production`.
- `PROD_SEED_ADMIN` esta definido explicitamente como `true` ou `false`.
- Se `PROD_SEED_ADMIN=true`, `PROD_SEED_ADMIN_EMAIL` e `PROD_SEED_ADMIN_PASSWORD` existem.
- Os ficheiros `/origin.crt` e `/origin.key` existem dentro de `PROD_NGINX_CERTS_PATH`.

### Resultado esperado destes valores

Com esta configuracao, o workflow gera automaticamente:

- `frontend/.env.production`
  - `NEXT_PUBLIC_SITE_URL=https://webfusionlab.pt`
  - `NEXT_PUBLIC_API_URL=https://api.webfusionlab.pt`
- `backend/.env.production`
  - `CONTACT_ADMIN_EMAIL=admin@webfusionlab.pt`
  - `DB_HOST=postgres`
  - `DB_NAME=webfusionlab`
  - `DB_USER=webfusionlab`
- `.env.production`
  - `COMPOSE_PROJECT_NAME=webfusionlab`
  - `NGINX_HTTP_PORT=80`
  - `NGINX_HTTPS_PORT=443`
  - `NGINX_CERTS_PATH=/opt/webfusionlab/nginx-certs`

### Certificados na VPS

Os certificados nao ficam no GitHub. Ficam apenas no servidor em:

```text
/opt/webfusionlab/nginx-certs/origin.crt
/opt/webfusionlab/nginx-certs/origin.key
```

Cria a pasta e define permissoes:

```bash
sudo mkdir -p /opt/webfusionlab/nginx-certs
sudo chown -R root:root /opt/webfusionlab/nginx-certs
sudo chmod 700 /opt/webfusionlab/nginx-certs
sudo chmod 644 /opt/webfusionlab/nginx-certs/origin.crt
sudo chmod 600 /opt/webfusionlab/nginx-certs/origin.key
```

O certificado deve vir do `Cloudflare -> SSL/TLS -> Origin Server`.

Em `Cloudflare -> SSL/TLS -> Overview`, usa:

```text
Full (strict)
```

Ficheiros de exemplo no repo:

- [`.env.production.example`](./.env.production.example)
- [`frontend/.env.production.example`](./frontend/.env.production.example)
- [`backend/.env.production.example`](./backend/.env.production.example)

## 10. Passos para instalar e registar o self-hosted runner

Assume Ubuntu/Debian e um utilizador dedicado `deploy`.

### 9.1 Criar utilizador e preparar Docker

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG docker deploy
sudo mkdir -p /opt/actions-runner/webfusionlab-production
sudo chown -R deploy:deploy /opt/actions-runner
```

### 9.2 Instalar Docker Engine + Docker Compose plugin

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo apt-get update
sudo apt-get install -y docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
```

### 9.3 Instalar o runner

No GitHub:

1. Abre o repositorio.
2. Vai a `Settings -> Actions -> Runners`.
3. Clica em `New self-hosted runner`.
4. Escolhe `Linux x64`.
5. Copia o comando e o token gerado pelo GitHub.

No servidor:

```bash
sudo su - deploy
cd /opt/actions-runner/webfusionlab-production

curl -o actions-runner-linux-x64-<VERSION>.tar.gz -L https://github.com/actions/runner/releases/download/v<VERSION>/actions-runner-linux-x64-<VERSION>.tar.gz
tar xzf actions-runner-linux-x64-<VERSION>.tar.gz

./config.sh \
  --url https://github.com/<OWNER>/<REPO> \
  --token <RUNNER_REGISTRATION_TOKEN> \
  --name webfusionlab-production \
  --labels self-hosted,linux,production \
  --work _work \
  --unattended
```

### 9.4 Instalar o runner como service

```bash
cd /opt/actions-runner/webfusionlab-production
sudo ./svc.sh install deploy
sudo ./svc.sh start
sudo ./svc.sh status
```

## 11. Comandos necessarios no servidor

Instalacao base:

```bash
sudo apt-get update
sudo apt-get install -y curl git ca-certificates
curl -fsSL https://get.docker.com | sudo sh
sudo apt-get install -y docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
```

Verificacao:

```bash
docker --version
docker compose version
id deploy
sudo systemctl status actions.runner.*
```

Diagnostico de deploy:

```bash
cd /opt/actions-runner/webfusionlab-production/_work/webfusinlab/webfusinlab
docker compose --env-file .env.production ps
docker compose --env-file .env.production logs --tail=200
docker image ls
docker volume ls
```

## 12. Explicacao do fluxo completo de deploy

1. Fazes merge de `develop` para `main`.
2. O GitHub dispara o workflow de producao quando entra um novo commit em `main`.
3. O job e enviado para o runner com labels `self-hosted`, `linux`, `production`.
4. O runner executa localmente no servidor.
5. O workflow faz `checkout` do monorepo.
6. O workflow gera:
   - `.env.production`
   - `frontend/.env.production`
   - `backend/.env.production`
7. O frontend e validado com `lint`.
8. O backend e validado com `tsc --noEmit`.
9. Os testes sao corridos com `npm run test --if-present`.
10. O frontend e o backend sao compilados.
11. O `docker compose` valida a configuracao.
12. As imagens de `nginx`, `frontend` e `backend` sao reconstruidas localmente.
13. O `docker compose up -d --remove-orphans --wait` atualiza os containers em producao.
14. O Nginx continua a ser a unica porta publica e encaminha para frontend/backend internos.

## 13. Sugestoes de seguranca e manutencao

### Seguranca

- Protege `main` para aceitar apenas PRs e exigir checks verdes.
- Usa o Environment `production` no GitHub para isolar os segredos.
- Mantem o runner dedicado a producao, sem workloads de desenvolvimento.
- Garante que o utilizador do runner esta apenas no grupo `docker`.
- Publica apenas a porta do `nginx`; nao abras `3000`, `3001` ou `5432`.
- Usa segredos fortes para `JWT_SECRET`, `DB_PASSWORD` e `ADMIN_REGISTRATION_TOKEN`.
- Ativa TLS no edge: um load balancer interno, proxy externo ou certificados montados no `nginx`.

### Manutencao

- Atualiza periodicamente:
  - imagem `postgres`;
  - imagens base `node` e `nginx`;
  - runner do GitHub Actions.
- Monitoriza espaco em disco com especial atencao a:
  - imagens Docker antigas;
  - volumes;
  - logs do runner.
- Mantem backups do volume `postgres_data`.
- Faz testes regulares de restore da base de dados.
- Adiciona testes reais ao repo; neste momento o workflow executa `test --if-present`, porque ainda nao ha scripts de teste definidos.
