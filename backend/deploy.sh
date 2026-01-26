#!/bin/bash

# Script de deploy para VPS
# Uso: ./deploy.sh [usuario@servidor]

set -e

if [ -z "$1" ]; then
    echo "Uso: ./deploy.sh usuario@servidor"
    exit 1
fi

SERVER=$1
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REMOTE_PATH="/var/www/webfusionlab"

echo "🚀 Iniciando deploy para $SERVER..."

# Build local (opcional)
echo "📦 Build local opcional (ignorado - build ocorre no servidor via Docker)"

# Criar diretório remoto se não existir
echo "📁 Preparando diretório remoto..."
ssh $SERVER "mkdir -p $REMOTE_PATH"

# Sincronizar arquivos
echo "📤 Enviando arquivos..."
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude 'dist' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude '*.log' \
    --exclude '.DS_Store' \
    --exclude '.env' \
    "$PROJECT_ROOT/" $SERVER:$REMOTE_PATH/

# Executar comandos remotos
echo "🐳 Iniciando containers no servidor..."
ssh $SERVER << 'EOF'
    cd /var/www/webfusionlab
    # Verificar envs essenciais
    if [ ! -f backend/.env.production ] || [ ! -f frontend/.env.production ]; then
        echo "⚠️  Arquivo .env.production não encontrado!"
        echo "📝 Configure as variáveis de ambiente antes de continuar"
        exit 1
    fi
    docker-compose down
    docker-compose up -d --build
    echo "✅ Deploy concluído!"
    docker-compose ps
EOF

echo "🎉 Deploy finalizado com sucesso!"
