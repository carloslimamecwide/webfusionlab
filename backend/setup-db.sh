#!/bin/bash

# Script para inicializar PostgreSQL e criar database

echo "🔧 Configurando PostgreSQL para WebFusionLab..."
echo ""

# Verificar se PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL não está instalado"
    echo "   Instale com: brew install postgresql (macOS)"
    exit 1
fi

# Verificar se PostgreSQL está rodando
if ! pg_isready -h localhost > /dev/null 2>&1; then
    echo "❌ PostgreSQL não está rodando"
    echo "   Inicie com: brew services start postgresql (macOS)"
    exit 1
fi

echo "✅ PostgreSQL está rodando"
echo ""

# Criar database
echo "📝 Criando database webfusionlab..."

psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'webfusionlab'" | grep -q 1 || \
psql -U postgres -c "CREATE DATABASE webfusionlab;"

echo "✅ Database criado"
echo ""

echo "🎉 Setup concluído!"
echo ""
echo "Próximos passos:"
echo "  1. Editar .env com suas configurações"
echo "  2. Rodar: npm run dev"
echo ""
