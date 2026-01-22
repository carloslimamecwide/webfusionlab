#!/bin/bash

# Script de deploy para VPS
# Uso: ./deploy.sh [usuario@servidor]

set -e

if [ -z "$1" ]; then
    echo "Uso: ./deploy.sh usuario@servidor"
    exit 1
fi

SERVER=$1
REMOTE_PATH="/var/www/webfusionlab/frontend"

echo "🚀 Iniciando deploy para $SERVER..."

# Build local (opcional)
echo "📦 Building aplicação localmente..."
npm run build

# Criar diretório remoto se não existir
echo "📁 Preparando diretório remoto..."
ssh $SERVER "mkdir -p $REMOTE_PATH"

# Sincronizar arquivos (excluindo node_modules e .next)
echo "📤 Enviando arquivos..."
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude '*.log' \
    --exclude '.DS_Store' \
    ./ $SERVER:$REMOTE_PATH/

# Executar comandos remotos
echo "🐳 Iniciando containers no servidor..."
ssh $SERVER << 'EOF'
    cd /var/www/webfusionlab/frontend
    docker-compose down
    docker-compose up -d --build
    echo "✅ Deploy concluído!"
    docker-compose ps
EOF

echo "🎉 Deploy finalizado com sucesso!"
echo "Acesse: https://webfusionlab.pt"
