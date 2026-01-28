# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Adicionado

- Documentação completa (README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY)
- Middleware de autenticação centralizado (`middleware/auth.js`)
- Middleware de tratamento de erros (`middleware/error-handler.js`)
- Middleware de validação (`middleware/validate.js`)
- Cliente GitHub API centralizado (`utils/github-client.js`)
- Classe de erro padronizada (`utils/api-error.js`)
- Arquivo `.env.example` com template de variáveis
- Arquivo `.editorconfig` para consistência de estilo
- Arquivo `.gitattributes` para normalização de line endings
- Templates de Issue e PR para GitHub
- Health check com verificação de banco de dados (`/api/v1/health`)
- Configuração de ESLint e Prettier
- Configuração de Jest para testes
- Scripts npm padronizados

### Alterado

- Refatorado `api/index.js` para usar middlewares centralizados
- Refatorado `api/auth/authMiddleware.js` de CommonJS para ES Modules
- Refatorado `api/imageupload.js` de next-connect para Express puro
- Refatorado rotas de GitHub para usar cliente centralizado
- Atualizado `package.json` com scripts e dependências
- Atualizado `Dockerfile` para Node.js 22 com multi-stage build
- Atualizado `.gitignore` com padrões abrangentes
- Melhorado tratamento de erros em todas as rotas
- Padronizado logging (removido console.log/error)
- Configuração de CORS via variável de ambiente

### Removido

- Dependência `csurf` (depreciada com vulnerabilidades)
- Dependência `next-connect` (desnecessária em Express)
- Dependência `redis` (não utilizada)
- URLs hardcoded em `directorylist.js`
- Código duplicado de chamadas à API do GitHub

### Segurança

- Removida dependência `csurf` com vulnerabilidades conhecidas
- Atualizada versão mínima do Node.js para 20+
- Adicionada documentação de segurança (SECURITY.md)

## [1.0.0] - 2025-01-27

### Adicionado

- Versão inicial do ES Data Base API Server
- Autenticação JWT com access e refresh tokens
- CRUD de Projetos
- CRUD de Cards
- Upload de imagens via GitHub API
- Gerenciamento de diretórios via GitHub API
- Documentação Swagger/OpenAPI
- Containerização com Docker
- Suporte a SQLite (dev) e PostgreSQL (prod)
- Logging com Winston
- Monitoramento com Sentry (opcional)
- Proteções de segurança (Helmet, Rate Limiting, CORS)
