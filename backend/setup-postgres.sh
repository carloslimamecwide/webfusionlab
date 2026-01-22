#!/bin/bash

# 🔧 Script para configurar PostgreSQL no macOS
# Este script cria o role 'postgres' e configura o banco de dados

set -e

echo "🔍 Verificando PostgreSQL..."

# Verificar se PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL não está instalado"
    echo "📦 Instale com: brew install postgresql"
    exit 1
fi

# Verificar se PostgreSQL está rodando
if ! pg_isready -h localhost -p 5432 &> /dev/null; then
    echo "❌ PostgreSQL não está rodando"
    echo "🚀 Inicie com: brew services start postgresql"
    exit 1
fi

echo "✅ PostgreSQL está rodando"

# Conectar como superuser (geralmente é o usuário atual do macOS)
CURRENT_USER=$(whoami)

echo "👤 Usuário atual: $CURRENT_USER"

# Verificar se role 'postgres' já existe
if sudo -u $CURRENT_USER psql -h localhost -c "\du" 2>/dev/null | grep -q "postgres"; then
    echo "✅ Role 'postgres' já existe"
else
    echo "🆕 Criando role 'postgres'..."
    
    # Criar role 'postgres' com permissão de criar bancos de dados
    sudo -u $CURRENT_USER psql -h localhost -c "
        CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres' CREATEDB;
    " 2>/dev/null || {
        # Tentar sem sudo se acima falhar
        psql -h localhost -c "
            CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres' CREATEDB;
        " 2>/dev/null
    }
    
    echo "✅ Role 'postgres' criado com sucesso"
fi

# Verificar se banco de dados 'webfusionlab' já existe
if sudo -u $CURRENT_USER psql -h localhost -l 2>/dev/null | grep -q "webfusionlab"; then
    echo "✅ Banco de dados 'webfusionlab' já existe"
else
    echo "🆕 Criando banco de dados 'webfusionlab'..."
    
    # Criar banco de dados
    sudo -u $CURRENT_USER psql -h localhost -c "
        CREATE DATABASE webfusionlab OWNER postgres;
    " 2>/dev/null || {
        psql -h localhost -c "
            CREATE DATABASE webfusionlab OWNER postgres;
        " 2>/dev/null
    }
    
    echo "✅ Banco de dados 'webfusionlab' criado com sucesso"
fi

echo ""
echo "✅ PostgreSQL configurado com sucesso!"
echo ""
echo "📝 Credenciais:"
echo "  Host: localhost"
echo "  Port: 5432"
echo "  User: postgres"
echo "  Password: postgres"
echo "  Database: webfusionlab"
echo ""
echo "🚀 Agora você pode rodar: npm run dev"
