#!/bin/bash

# 📊 Script para visualizar a base de dados WebFusionLab

echo "📊 ===== BASE DE DADOS WEBFUSIONLAB ====="
echo ""

# Admins
echo "👤 ADMINS:"
psql -U postgres -h localhost -d webfusionlab -c "SELECT id, email, name, is_active, created_at FROM admins;" 2>/dev/null

echo ""
echo "📁 PROJETOS:"
psql -U postgres -h localhost -d webfusionlab -c "SELECT id, admin_id, title, category, year, created_at FROM projects;" 2>/dev/null

echo ""
echo "📈 ESTATÍSTICAS:"
psql -U postgres -h localhost -d webfusionlab -c "
  SELECT 
    (SELECT COUNT(*) FROM admins) as total_admins,
    (SELECT COUNT(*) FROM projects) as total_projetos;
" 2>/dev/null
