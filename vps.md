# VPS - Deploy rápido

Comandos para atualizar código e subir serviços no VPS.

## Frontend (/opt/webfusionlab/frontend)

```
cd /opt/webfusionlab/frontend
git pull
docker-compose up -d --build
```

## Backend (/opt/webfusionlab/backend)

```
cd /opt/webfusionlab/backend
git pull
docker-compose -f docker-compose.prod.yml up -d --build
```

## Logs rápidos

```
docker logs webfusionlab-backend --tail=50
docker logs webfusionlab-frontend --tail=50
```

## Estado dos containers

```
docker ps
```

## Nginx

```
sudo systemctl status nginx
```
