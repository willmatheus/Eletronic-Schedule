-- Active: 1708312482039@@127.0.0.1@3306
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS Schedule;

-- Seleção do banco de dados
USE Schedule;

-- Criação da tabela "eventos" que referencia a tabela "registro"
CREATE TABLE IF NOT EXISTS Eventos (
    id VARCHAR(100) PRIMARY KEY,
    data VARCHAR(10) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    horario VARCHAR(6) NOT NULL,
    descricao TEXT,
    local VARCHAR(100) NOT NULL,
    numeroDeConvidados INT NOT NULL
);

-- Criação da tabela "tarefas" que referencia a tabela "registro"
CREATE TABLE IF NOT EXISTS Tarefas (
    id VARCHAR(100) PRIMARY KEY,
    data VARCHAR(10) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    horario VARCHAR(6) NOT NULL,
    descricao TEXT,
    status VARCHAR(10) NOT NULL
);

-- Criação da tabela "reunioes" que referencia a tabela "registro"
CREATE TABLE IF NOT EXISTS Reunioes (
    id VARCHAR(100) PRIMARY KEY,
    data VARCHAR(10),
    titulo VARCHAR(100) NOT NULL,
    horario VARCHAR(6) NOT NULL,
    descricao TEXT,
    link VARCHAR(1024) NOT NULL,
    pauta TEXT
);
