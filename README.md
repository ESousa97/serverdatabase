# ES Data Base API Server

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen?style=flat)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?style=flat)](https://expressjs.com)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-blue?style=flat)](https://sequelize.org)
[![CodeFactor](https://www.codefactor.io/repository/github/esousa97/serverdatabase/badge?style=flat)](https://www.codefactor.io/repository/github/esousa97/serverdatabase)

> Backend robusto para gerenciamento de projetos, cards e assets digitais com integração GitHub.

## 📋 Índice

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Tech Stack](#-tech-stack)
- [Início Rápido](#-início-rápido)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API Reference](#-api-reference)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Desenvolvimento](#-desenvolvimento)
- [Testes](#-testes)
- [Deploy](#-deploy)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## 🎯 Sobre

O **ES Data Base API Server** é uma API RESTful desenvolvida em Node.js/Express.js que oferece:

- **CRUD completo** para entidades Projetos e Cards
- **Autenticação JWT** com tokens de acesso e refresh
- **Gerenciamento de assets** via integração com API do GitHub
- **Documentação interativa** com Swagger/OpenAPI

Ideal para aplicações que precisam de um backend flexível com gerenciamento de conteúdo e mídia.

## ✨ Funcionalidades

| Feature          | Descrição                                  |
| ---------------- | ------------------------------------------ |
| 🔐 Autenticação  | JWT com access e refresh tokens            |
| 📁 Projetos      | CRUD completo com categorização            |
| 🗂️ Cards         | Gerenciamento de cards com imagens         |
| 📤 Upload        | Upload de arquivos para repositório GitHub |
| 📂 Diretórios    | Criação e gerenciamento de diretórios      |
| 🔍 Busca         | Pesquisa full-text em projetos             |
| 📚 Swagger       | Documentação interativa da API             |
| 🛡️ Segurança     | Helmet, Rate Limiting, CORS                |
| 📊 Logging       | Winston com níveis configuráveis           |
| 🔔 Monitoramento | Integração opcional com Sentry             |

## 🛠️ Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js 4.x
- **ORM:** Sequelize 6.x
- **Banco de Dados:** SQLite (dev) / PostgreSQL (prod)
- **Autenticação:** JSON Web Tokens (JWT)
- **Documentação:** Swagger/OpenAPI 3.0
- **Logging:** Winston
- **Segurança:** Helmet, express-rate-limit
- **Containerização:** Docker

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 20.x ou superior
- npm ou yarn
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/ESousa97/serverdatabase.git
cd serverdatabase

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas configurações

# Inicie o servidor
npm start
```

O servidor estará disponível em `http://localhost:8000`

### Com Docker

```bash
# Build da imagem
docker build -t es-database-api .

# Execute o container
docker run -p 8000:8000 --env-file .env es-database-api
```

## ⚙️ Configuração

### Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
# Server
NODE_ENV=development
PORT=8000

# JWT (OBRIGATÓRIO)
JWT_SECRET=sua_chave_secreta_aqui
JWT_REFRESH_SECRET=outra_chave_secreta_aqui

# Database (PostgreSQL - produção)
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=esdatabase
DB_USER=postgres
DB_PASSWORD=sua_senha

# GitHub Integration (para gerenciamento de assets)
GITHUB_TOKEN=ghp_seu_token
GITHUB_REPO=usuario/repositorio
GITHUB_BRANCH=main

# CORS (lista separada por vírgula)
ALLOWED_ORIGINS=https://seusite.com,https://outro.com
```

### Banco de Dados

```bash
# Executar migrations
npm run db:migrate

# Popular com dados de exemplo
npm run db:seed

# Reset completo
npm run db:reset
```

## 📖 Uso

### Documentação Swagger

Acesse a documentação interativa em: `http://localhost:8000/api-docs`

### Autenticação

```bash
# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "senha123"}'

# Response
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Exemplos de Requisições

```bash
# Listar projetos
curl http://localhost:8000/api/v1/projects \
  -H "Authorization: Bearer SEU_TOKEN"

# Criar projeto
curl -X POST http://localhost:8000/api/v1/projects \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Meu Projeto", "descricao": "Descrição", "categoria": "tech"}'

# Upload de imagem
curl -X POST http://localhost:8000/api/v1/imageupload \
  -H "Authorization: Bearer SEU_TOKEN" \
  -F "image=@/caminho/imagem.jpg" \
  -F "directory=minha-pasta"
```

## 📚 API Reference

### Endpoints Principais

| Método | Endpoint                     | Descrição         |
| ------ | ---------------------------- | ----------------- |
| POST   | `/api/v1/auth/login`         | Autenticação      |
| POST   | `/api/v1/auth/refresh`       | Renovar token     |
| POST   | `/api/v1/auth/logout`        | Logout            |
| GET    | `/api/v1/projects`           | Listar projetos   |
| POST   | `/api/v1/projects`           | Criar projeto     |
| GET    | `/api/v1/projects/:id`       | Buscar projeto    |
| PUT    | `/api/v1/projects/:id`       | Atualizar projeto |
| DELETE | `/api/v1/projects/:id`       | Deletar projeto   |
| GET    | `/api/v1/cards`              | Listar cards      |
| POST   | `/api/v1/cards`              | Criar card        |
| GET    | `/api/v1/search?query=termo` | Buscar projetos   |
| GET    | `/api/v1/categories`         | Listar categorias |
| POST   | `/api/v1/imageupload`        | Upload de imagem  |
| GET    | `/api/v1/directories`        | Listar diretórios |
| GET    | `/api/v1/health`             | Health check      |

## 📁 Estrutura do Projeto

```
├── api/                    # Rotas e controllers
│   ├── auth/               # Módulo de autenticação
│   │   ├── authController.js
│   │   ├── authMiddleware.js
│   │   └── authRoutes.js
│   ├── index.js            # Entry point do servidor
│   ├── cardlist.js         # Rotas de cards
│   ├── project.js          # Rotas de projetos
│   └── ...
├── config/
│   └── config.js           # Configuração do Sequelize
├── middleware/             # Middlewares customizados
│   ├── auth.js             # Autenticação JWT
│   ├── error-handler.js    # Tratamento de erros
│   ├── validate.js         # Validação de dados
│   └── index.js
├── migrations/             # Migrations do banco
├── models/                 # Modelos Sequelize
├── seeders/                # Seeds de dados
├── services/               # Lógica de negócio
├── utils/                  # Utilitários
│   ├── api-error.js        # Classe de erro padronizada
│   ├── github-client.js    # Cliente GitHub API
│   └── logger.js           # Configuração Winston
├── .env.example            # Template de variáveis
├── Dockerfile              # Containerização
└── package.json
```

## 💻 Desenvolvimento

### Scripts Disponíveis

```bash
npm start           # Inicia o servidor
npm run dev         # Modo desenvolvimento com watch
npm run lint        # Verifica código com ESLint
npm run lint:fix    # Corrige problemas automaticamente
npm run format      # Formata código com Prettier
npm run test        # Executa testes
npm run test:coverage  # Testes com cobertura
```

### Padrões de Código

- ESLint + Prettier para formatação
- Conventional Commits para mensagens
- ES Modules (import/export)

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Modo watch
npm run test:watch

# Com cobertura
npm run test:coverage
```

## 🚢 Deploy

### Docker

```bash
docker build -t es-database-api .
docker run -p 8000:8000 \
  -e NODE_ENV=production \
  -e JWT_SECRET=... \
  -e DB_HOST=... \
  es-database-api
```

### Variáveis de Produção

Configure todas as variáveis do `.env.example` com valores de produção, especialmente:

- `NODE_ENV=production`
- JWT secrets fortes e únicos
- Credenciais do banco PostgreSQL
- `ALLOWED_ORIGINS` com domínios permitidos

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja [CONTRIBUTING.md](CONTRIBUTING.md) para guidelines.

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para detalhes.

---

<p align="center">
  Desenvolvido com ❤️ por <a href="https://github.com/ESousa97">ES Data Base</a>
</p>
