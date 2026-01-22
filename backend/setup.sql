# SQL Script para setup manual da database

# Conectar como admin
# psql -U postgres

# Criar database
CREATE DATABASE webfusionlab;

# Conectar à database
\c webfusionlab

# Criar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

# Executar migrations
-- Ver migrations/001_init.sql
