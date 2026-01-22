#!/bin/bash

# Script de deploy para VPS
# Uso: ./deploy.sh [usuario@servidor]

set -e

if [ -z "$1" ]; then
    echo "Uso: ./deploy.sh usuario@servidor"
    exit 1
fi

SERVER=$1
REMOTE_PATH="/var/www/webfusionlab/backend"

echo "🚀 Iniciando deploy para $SERVER..."

# Build local
echo "📦 Building aplicação localmente..."
npm run build

# Criar diretório remoto se não existir
echo "📁 Preparando diretório remoto..."
ssh $SERVER "mkdir -p $REMOTE_PATH"

# Sincronizar arquivos
echo "📤 Enviando arquivos..."
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude 'dist' \
    --exclude '.git' \
    --exclude '*.log' \
    --exclude '.DS_Store' \
    --exclude '.env' \
    ./ $SERVER:$REMOTE_PATH/

# Executar comandos remotos
echo "🐳 Iniciando containers no servidor..."
ssh $SERVER << 'EOF'
    cd /var/www/webfusionlab/backend
    # Criar .env se não existir
    if [ ! -f .env.production ]; then
        echo "⚠️  Arquivo .env.production não encontrado!"
        echo "📝 Configure as variáveis de ambiente antes de continuar"
        exit 1
    fi
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml up -d --build
    echo "✅ Deploy concluído!"
    docker-compose -f docker-compose.prod.yml ps
EOF

echo "🎉 Deploy finalizado com sucesso!"
