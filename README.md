
# 📓 Meu Diário Pessoal

Bem-vindo ao repositório do *Meu Diário Pessoal*, um projeto full-stack desenvolvido para gerenciamento de anotações e reflexões diárias de forma segura e pessoal.

---

## ✨ Visão Geral

O *Meu Diário Pessoal* é uma aplicação modularizada, dividida em um frontend moderno (React) e um backend robusto (NestJS), garantindo performance, segurança e escalabilidade.

### 🌟 Tecnologias Utilizadas

| Componente | Linguagem/Framework | Biblioteca Principal |
| :--- | :--- | :--- |
| **Frontend** | React, JavaScript, CSS | React Router DOM, Lucide Icons |
| **Backend** | NestJS, TypeScript | TypeORM, JWT (Passport), Bcrypt |
| **Banco de Dados** | MySQL | MySQL2 |

## 🚀 Estrutura do Projeto

O projeto é dividido em dois diretórios principais: `diario-frontend` e `backend`.

### `diario-frontend` (React)
- Responsável pela interface do usuário, navegação (Login, Registro, Dashboard) e consumo da API.
- Implementa um design moderno com fundo em gradiente e componentes harmoniosos.

### `backend` (NestJS)
- Responsável pela lógica de autenticação (registro, login, JWT), persistência de dados no MySQL e exposição das rotas da API.

---

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

### 1. Requisitos

- **Node.js** (versão LTS recomendada)
- **MySQL Server** (ou similar compatível com TypeORM)

### 2. Configuração do Banco de Dados

1.  Crie um novo banco de dados no seu servidor MySQL (ex: `meu_diario_db`).
2.  No diretório `backend`, crie um arquivo de variáveis de ambiente (`.env`) e configure as credenciais do banco de dados e a chave secreta JWT.

Exemplo de `.env` no diretório `backend`:

```env
# Configuração do Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_DATABASE=meu_diario_db

# Configuração do JWT (use uma string segura e longa)
JWT_SECRET=sua_chave_secreta_muito_segura
````

### 3\. Setup do Backend (NestJS)

Navegue até o diretório `backend` no terminal:

```bash
cd backend
npm install
npm run start:dev
```

O backend estará acessível em `http://localhost:3000`.

### 4\. Setup do Frontend (React)

Abra uma **nova janela de terminal** e navegue até o diretório `diario-frontend`:

```bash
cd ../diario-frontend
npm install
npm start
```

O frontend será aberto no seu navegador, geralmente em `http://localhost:3001`.

-----

## 🔑 Rotas de Autenticação (Backend)

| Rota | Método | Descrição | Protegida por JWT |
| :--- | :--- | :--- | :--- |
| `/auth/register` | `POST` | Cria um novo usuário. | Não |
| `/auth/login` | `POST` | Autentica o usuário e retorna o token de acesso. | Não |
| `/auth/profile` | `GET` | Retorna os dados do usuário logado (nome, email, etc.). | Sim |

-----

## 💡 Melhorias Futuras

O projeto *Meu Diário Pessoal* está em constante evolução. Abaixo estão algumas funcionalidades e aprimoramentos planejados para o futuro, que visam aumentar a usabilidade, segurança e o conjunto de recursos da aplicação:

### 🚀 Funcionalidades Principais
* **Gestão de Anotações:**
    * **Funcionalidade CRUD Completa:** Implementação da criação, visualização, edição e exclusão de anotações (Notas e Reflexões) no frontend e backend.
    * **Busca e Filtragem Avançada:** Capacidade de pesquisar anotações por texto, data ou tags.
* **Tags e Categorias:**
    * Adicionar um sistema para marcar e organizar anotações por tags personalizadas (ex: *Humor*, *Metas*, *Viagem*).
* **Exportação de Dados:**
    * Permitir que o usuário exporte seu diário em formatos comuns (ex: PDF, TXT).

### 🔒 Segurança e Usabilidade
* **Autenticação Reforçada:**
    * Implementar autenticação em duas etapas (2FA) para maior segurança.
* **Configurações de Usuário:**
    * Adicionar a funcionalidade de redefinição de senha e alteração de e-mail.
* **Melhoria de UI/UX:**
    * Revisão de design para dispositivos móveis (Responsividade).
    * Adicionar um tema escuro (Dark Mode).

### ⚙️ Melhorias Técnicas
* **Testes Unitários e E2E:**
    * Aumentar a cobertura de testes para garantir a estabilidade das funcionalidades do backend (NestJS).
* **Otimização de Querys:**
    * Revisão e otimização das consultas TypeORM para garantir a performance da aplicação em escala.
