# Servidor da API ES Data Base: Gerenciamento Avançado de Dados e Assets

**Slogan Filosófico:** _Estruturando dados, simplificando interações: uma fundação robusta para aplicações dinâmicas e gerenciamento inteligente de conteúdo._

## Abstract (Resumo Técnico)

Este projeto apresenta o "ES Data Base API Server", um backend abrangente desenvolvido em Node.js com Express.js, projetado para fornecer uma solução robusta e flexível para o gerenciamento de dados relacionais, autenticação de usuários e manipulação de assets digitais. O sistema aborda a complexidade inerente à construção de backends seguros e escaláveis, oferecendo funcionalidades CRUD para entidades como "Projetos" e "Cards", um sistema de autenticação baseado em JSON Web Tokens (JWT) com tokens de acesso e atualização, e uma inovadora integração com a API do GitHub para o armazenamento e gerenciamento de arquivos e diretórios de mídia. A arquitetura modular emprega Sequelize como ORM, permitindo a utilização de bancos de dados como SQLite para desenvolvimento e PostgreSQL para produção, garantindo portabilidade e consistência através da containerização com Docker. A API RESTful é documentada via Swagger (OpenAPI), facilitando a integração com aplicações frontend e outros serviços. O projeto enfatiza a segurança com mecanismos como Helmet, proteção CSRF, e limitação de taxa de requisições (rate limiting), além de logging detalhado com Winston e monitoramento de erros com Sentry. A contribuição principal reside na combinação de um sistema de gerenciamento de dados tradicional com uma abordagem criativa para o versionamento e armazenamento de assets, oferecendo uma plataforma completa para o desenvolvimento ágil de aplicações ricas em conteúdo.

## Badges Abrangentes

![Licença](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)
![Node.js Version](https://img.shields.io/badge/node-22.x-green.svg?style=for-the-badge)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg?style=for-the-badge)
![Sequelize](https://img.shields.io/badge/ORM-Sequelize-blue.svg?style=for-the-badge)
![Express.js](https://img.shields.io/badge/framework-Express.js-lightgrey.svg?style=for-the-badge)
![Swagger](https://img.shields.io/badge/API_Docs-Swagger-green.svg?style=for-the-badge)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-kitloong-yellow.svg?style=for-the-badge&logo=buymeacoffee)](https://www.buymeacoffee.com/kitloong)

<!-- Badges dependentes do link do repositório (usando placeholders) -->
![GitHub Issues](https://img.shields.io/github/issues/USUARIO/PROJETO?style=for-the-badge)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/USUARIO/PROJETO?style=for-the-badge)
![GitHub Last Commit](https://img.shields.io/github/last-commit/USUARIO/PROJETO?style=for-the-badge)
![GitHub Top Language](https://img.shields.io/github/languages/top/USUARIO/PROJETO?style=for-the-badge)
![GitHub Code Size](https://img.shields.io/github/languages/code-size/USUARIO/PROJETO?style=for-the-badge)
![GitHub Contributors](https://img.shields.io/github/contributors/USUARIO/PROJETO?style=for-the-badge)

## Sumário (Table of Contents)

*   [Abstract (Resumo Técnico)](#abstract-resumo-técnico)
*   [Badges Abrangentes](#badges-abrangentes)
*   [Sumário (Table of Contents)](#sumário-table-of-contents)
*   [Introdução e Motivação](#introdução-e-motivação)
*   [Arquitetura do Sistema](#arquitetura-do-sistema)
*   [Decisões de Design Chave](#decisões-de-design-chave)
*   [✨ Funcionalidades Detalhadas (com Casos de Uso)](#-funcionalidades-detalhadas-com-casos-de-uso)
*   [🛠️ Tech Stack Detalhado](#️-tech-stack-detalhado)
*   [📂 Estrutura Detalhada do Código-Fonte](#-estrutura-detalhada-do-código-fonte)
*   [📋 Pré-requisitos Avançados](#-pré-requisitos-avançados)
*   [🚀 Guia de Instalação e Configuração Avançada](#-guia-de-instalação-e-configuração-avançada)
*   [⚙️ Uso Avançado e Exemplos](#️-uso-avançado-e-exemplos)
*   [🔧 API Reference (se aplicável)](#-api-reference-se-aplicável)
*   [🧪 Estratégia de Testes e Qualidade de Código](#-estratégia-de-testes-e-qualidade-de-código)
*   [🚢 Deployment Detalhado e Escalabilidade](#-deployment-detalhado-e-escalabilidade)
*   [🤝 Contribuição (Nível Avançado)](#-contribuição-nível-avançado)
*   [📜 Licença e Aspectos Legais](#-licença-e-aspectos-legais)
*   [👥 Equipe Principal e Colaboradores Chave](#-equipe-principal-e-colaboradores-chave)
*   [🗺️ Roadmap Detalhado e Visão de Longo Prazo](#️-roadmap-detalhado-e-visão-de-longo-prazo)
*   [❓ FAQ (Perguntas Frequentes)](#-faq-perguntas-frequentes)
*   [📞 Contato e Suporte](#-contato-e-suporte)

## Introdução e Motivação

No cenário atual de desenvolvimento de software, a demanda por aplicações web ricas em funcionalidades, interativas e seguras é crescente. Um componente crítico para o sucesso de tais aplicações é um backend robusto, capaz de gerenciar dados de forma eficiente, controlar o acesso de usuários e interagir com serviços externos. O "ES Data Base API Server" surge da necessidade de prover uma fundação sólida e flexível para o desenvolvimento rápido e seguro dessas aplicações.

Muitas soluções existentes podem apresentar complexidade na configuração, falta de flexibilidade para diferentes tipos de bancos de dados, ou abordagens de segurança insuficientes. Este projeto visa endereçar esses desafios ao oferecer um servidor de API completo, construído sobre tecnologias Node.js e Express.js, que se destacam por seu desempenho e vasto ecossistema. A principal motivação é fornecer aos desenvolvedores uma plataforma que acelere o desenvolvimento de backends, sem comprometer a qualidade, segurança ou escalabilidade.

A proposta de valor única do projeto reside na sua arquitetura modular e na combinação de funcionalidades essenciais:
1.  **Gerenciamento de Dados Flexível:** Utilização do Sequelize ORM, permitindo a fácil adaptação a diferentes SGBDs (SQLite para desenvolvimento, PostgreSQL para produção), com um esquema de banco de dados bem definido através de migrations.
2.  **Autenticação Segura:** Implementação de um sistema de autenticação baseado em JWT (Access e Refresh tokens), com hashing de senhas (bcryptjs) e proteção contra ataques comuns.
3.  **Gerenciamento Inovador de Assets:** Uma abordagem distinta para o upload e manipulação de arquivos (imagens, diretórios) utilizando a API do GitHub como um sistema de armazenamento versionado. Isso oferece uma alternativa interessante para gerenciamento de mídia, especialmente para projetos que já utilizam o GitHub extensivamente.
4.  **API Documentada e Padronizada:** Exposição de uma API RESTful clara e consistente, com documentação interativa gerada pelo Swagger (OpenAPI), facilitando a integração com clientes frontend ou outros microsserviços.
5.  **Foco em Segurança:** Incorporação de múltiplas camadas de segurança, incluindo Helmet para proteção de headers HTTP, `csurf` para prevenção de CSRF, e `express-rate-limit` para mitigar ataques de força bruta ou DoS.
6.  **Pronto para Produção:** Configurações para diferentes ambientes, logging detalhado com Winston, integração com Sentry para monitoramento de erros, e um Dockerfile para fácil containerização e deploy.

O objetivo de longo prazo é que o "ES Data Base API Server" sirva como um boilerplate confiável e uma referência para a construção de backends modernos, incentivando boas práticas de desenvolvimento e segurança.

## Arquitetura do Sistema

O "ES Data Base API Server" é estruturado em uma arquitetura modular, projetada para promover a separação de responsabilidades, testabilidade e manutenibilidade. Os principais componentes e seus fluxos de interação são descritos abaixo:

```mermaid
graph TD
    Usuario["👤 Usuário"] -- "Acessa Aplicação" --> Cliente["📱 Cliente (Web/Mobile)"]
    Cliente -- "Requisições HTTP/API" --> Gateway["🚪 API Gateway (Express.js)"]
    
    subgraph "Servidor Node.js/Express API"
        Gateway -- "Aplica Segurança" --> Security["🛡️ Camada de Segurança"]
        Security -- "Helmet Protection" --> Helmet["⛑️ Helmet"]
        Security -- "CSRF Protection" --> CSRF["🔒 CSRF Protection"]
        Security -- "Rate Limiting" --> RateLimit["⏱️ Rate Limiter"]
        Security -- "JWT Authentication" --> AuthMid["🎫 Auth Middleware"]
        
        AuthMid -- "Roteia para Módulos" --> Modules["📋 Módulos da API"]
        Modules -- "Autenticação" --> AuthMod["🔐 Auth Module"]
        Modules -- "Gerencia Projetos" --> ProjectMod["📂 Project Module"]
        Modules -- "Gerencia Cards" --> CardMod["🗃️ Card Module"]
        Modules -- "Gerencia Assets" --> AssetMod["📁 Asset Module"]
        Modules -- "Sistema de Busca" --> SearchMod["🔍 Search Module"]
        Modules -- "Gerencia Categorias" --> CategoryMod["📊 Category Module"]
        
        AuthMod -- "Processa Lógica" --> AuthSvc["🔐 Auth Service"]
        ProjectMod -- "Processa Lógica" --> ProjectSvc["📂 Project Service"]
        CardMod -- "Processa Lógica" --> CardSvc["🗃️ Card Service"]
        AssetMod -- "Processa Lógica" --> AssetSvc["📁 Asset Service"]
        
        AuthSvc -- "Acessa Dados" --> ORM["🗄️ Sequelize ORM"]
        ProjectSvc -- "Acessa Dados" --> ORM
        CardSvc -- "Acessa Dados" --> ORM
        
        ORM -- "User Model" --> UserModel["👤 User Model"]
        ORM -- "Project Model" --> ProjectModel["📂 Project Model"]
        ORM -- "Card Model" --> CardModel["🗃️ Card Model"]
    end
    
    subgraph "Utilitários e Monitoramento"
        Logger["📝 Winston Logger"]
        Sentry["🔍 Sentry Monitoring"]
        EnvConfig["⚙️ Environment Config"]
    end
    
    UserModel -- "Persiste Dados" --> Database["🗄️ Database (SQLite/PostgreSQL)"]
    ProjectModel -- "Persiste Dados" --> Database
    CardModel -- "Persiste Dados" --> Database
    
    AssetSvc -- "Busca Assets" --> GitHubAPI["☁️ GitHub API"]
    
    Modules -- "Registra Logs" --> Logger
    Gateway -- "Monitora Erros" --> Sentry
    Gateway -- "Carrega Configurações" --> EnvConfig
    
    Database -- "Retorna Dados" --> ORM
    GitHubAPI -- "Retorna Assets" --> AssetSvc
    ORM -- "Resposta Processada" --> Gateway
    Gateway -- "Resposta HTTP" --> Cliente
    Cliente -- "Exibe Resultado" --> Usuario

    %% Estilos para diferentes camadas
    style Cliente fill:#DAE8FC,stroke:#6C8EBF,stroke-width:2px,color:#000
    style Gateway fill:#D5E8D4,stroke:#82B366,stroke-width:2px,color:#000
    style Security fill:#FFF2CC,stroke:#D6B656,stroke-width:2px,color:#000
    style Helmet fill:#FFF2CC,stroke:#D6B656,stroke-width:2px,color:#000
    style CSRF fill:#FFF2CC,stroke:#D6B656,stroke-width:2px,color:#000
    style RateLimit fill:#FFF2CC,stroke:#D6B656,stroke-width:2px,color:#000
    style AuthMid fill:#FFF2CC,stroke:#D6B656,stroke-width:2px,color:#000
    style Modules fill:#FFF2CC,stroke:#D6B656,stroke-width:2px,color:#000
    style AuthMod fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style ProjectMod fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style CardMod fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style AssetMod fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style SearchMod fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style CategoryMod fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style AuthSvc fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style ProjectSvc fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style CardSvc fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style AssetSvc fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style ORM fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style UserModel fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style ProjectModel fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style CardModel fill:#E1D5E7,stroke:#9673A6,stroke-width:2px,color:#000
    style Logger fill:#FFE6CC,stroke:#D79B00,stroke-width:2px,color:#000
    style Sentry fill:#FFE6CC,stroke:#D79B00,stroke-width:2px,color:#000
    style EnvConfig fill:#FFE6CC,stroke:#D79B00,stroke-width:2px,color:#000
    style Database fill:#F8CECC,stroke:#B85450,stroke-width:2px,color:#000
    style GitHubAPI fill:#F8CECC,stroke:#B85450,stroke-width:2px,color:#000
```

**Explicação dos Componentes:**

1.  **Cliente (Interface do Usuário):** Qualquer aplicação (web, mobile, desktop) que consome a API. Interage com o servidor via requisições HTTP.
2.  **API Gateway / Roteador Principal (Express.js):** Ponto de entrada para todas as requisições. Direciona as requisições para os middlewares de segurança e, em seguida, para os módulos específicos da API (`api/index.js`).
3.  **Camada de Segurança:**
    *   **Helmet:** Aplica diversos headers HTTP para melhorar a segurança da aplicação.
    *   **CSRF Protection (csurf):** Protege contra ataques de Cross-Site Request Forgery, utilizando tokens CSRF.
    *   **Rate Limiter (express-rate-limit):** Limita o número de requisições de um mesmo IP para prevenir abusos e ataques de força bruta.
    *   **Middleware de Autenticação JWT:** (Potencialmente aplicado a rotas protegidas) Verifica a validade de tokens JWT para autorizar o acesso a recursos. Embora um `authMiddleware.js` exista, sua aplicação global ou por rota específica não está explícita nos arquivos de rotas de dados fornecidos.
4.  **Módulos da API:** Conjuntos de rotas e controladores que lidam com funcionalidades específicas:
    *   **Módulo de Autenticação (`api/auth/`):** Gerencia login (`/login`), refresh de token (`/refresh`) e logout (`/logout`). Utiliza `authController.js`.
    *   **Módulo de Projetos (`api/project.js`):** Operações CRUD para a entidade "Projeto".
    *   **Módulo de Cards (`api/cardlist.js`):** Operações CRUD para a entidade "Card".
    *   **Módulo de Gerenciamento de Assets (`api/imageupload.js`, `api/create-directory.js`, etc.):** Lida com upload de imagens, criação, listagem, deleção e renomeação de arquivos/diretórios no repositório GitHub configurado.
    *   **Módulo de Busca (`api/search.js`):** Permite buscar conteúdo dentro dos projetos.
    *   **Módulo de Categorias (`api/categories.js`):** Lista categorias baseadas nos dados dos projetos.
5.  **Camada de Serviços:**
    *   **AuthService (`services/authService.js`):** Encapsula a lógica de negócio para autenticação (validação de credenciais, geração de tokens).
    *   Outros serviços (ProjectService, CardService, AssetService) estão majoritariamente implícitos na lógica dos controladores/rotas, mas poderiam ser abstraídos para maior separação.
6.  **Camada de Acesso a Dados (ORM):**
    *   **Sequelize ORM (`models/index.js`):** Abstrai as interações com o banco de dados, permitindo o uso de JavaScript para definir modelos e realizar queries.
    *   **Models (`models/user.js`, `models/project.js`, `models/card.js`):** Definem a estrutura das tabelas do banco de dados e suas relações.
7.  **Utilitários e Configuração:**
    *   **Logger (Winston) (`utils/logger.js`):** Sistema de logging configurável para registrar eventos da aplicação, erros e informações de debug.
    *   **Sentry Integration:** Se configurado (`SENTRY_DSN`), envia erros não tratados para a plataforma Sentry para monitoramento.
    *   **Configuração de Ambiente (`.env`, `config/config.js`):** Gerencia configurações sensíveis e específicas de cada ambiente (desenvolvimento, produção).
8.  **Infraestrutura e Serviços Externos:**
    *   **Banco de Dados (SQLite/PostgreSQL):** Armazena os dados persistentes da aplicação (usuários, projetos, cards).
    *   **API do GitHub:** Utilizada como backend de armazenamento para os assets (imagens e arquivos).

**Fluxo de Dados Típico (Ex: Criar um Projeto):**
1.  O Cliente envia uma requisição `POST /api/v1/projects` com os dados do projeto e um token de autenticação (se a rota for protegida) e um token CSRF.
2.  O API Gateway (Express) recebe a requisição.
3.  Middlewares de segurança (Helmet, CSRF, RateLimit) são aplicados.
4.  O Roteador direciona para o Módulo de Projetos.
5.  O controlador de projetos valida os dados de entrada (usando `express-validator`).
6.  O controlador interage com o Sequelize (Camada de Acesso a Dados) para criar um novo registro de projeto no Banco de Dados.
7.  O Banco de Dados persiste a informação.
8.  O controlador retorna uma resposta de sucesso (ex: `201 Created`) com os dados do projeto criado.
9.  O Logger registra a operação.

Esta arquitetura visa um baixo acoplamento entre os componentes e alta coesão dentro de cada módulo, facilitando o desenvolvimento, testes e a evolução do sistema.

## Decisões de Design Chave

Diversas decisões técnicas foram tomadas para moldar a arquitetura e funcionalidade do "ES Data Base API Server", visando um equilíbrio entre robustez, flexibilidade e boas práticas de desenvolvimento:

1.  **Node.js com Express.js (Backend):**
    *   **Justificativa:** Node.js oferece um ambiente de execução JavaScript no servidor, conhecido por seu modelo I/O não-bloqueante e alta performance para aplicações com muitas operações concorrentes. Express.js é um framework minimalista e flexível para Node.js, amplamente adotado e com um ecossistema rico, ideal para construir APIs RESTful.
    *   **Trade-offs:** Sendo single-threaded, operações CPU-bound intensivas podem bloquear o event loop se não gerenciadas corretamente (ex: com worker threads ou offloading para outros serviços).

2.  **Sequelize ORM (Persistência de Dados):**
    *   **Justificativa:** Sequelize é um ORM maduro para Node.js que suporta múltiplos dialetos SQL (PostgreSQL, MySQL, SQLite, MSSQL). Isso oferece flexibilidade para escolher o SGBD mais adequado para cada ambiente (SQLite para desenvolvimento/testes, PostgreSQL para produção, como configurado). Facilita a modelagem de dados, migrações de schema (`sequelize-cli`) e queries complexas.
    *   **Trade-offs:** ORMs podem introduzir uma camada de abstração que, em alguns casos, pode dificultar a otimização de queries muito específicas ou gerar SQL menos performático que o escrito manualmente.

3.  **Autenticação com JSON Web Tokens (JWT):**
    *   **Justificativa:** JWTs são um padrão aberto (RFC 7519) para criar tokens de acesso que afirmam um certo número de "claims". São stateless, o que facilita a escalabilidade horizontal, pois o servidor não precisa manter o estado da sessão. O uso de Access Tokens de curta duração e Refresh Tokens de longa duração é uma prática recomendada para segurança.
    *   **Trade-offs:** Tokens JWT, uma vez emitidos, não podem ser facilmente invalidados antes de expirarem (a menos que se use uma blacklist, o que adiciona state). O armazenamento seguro de tokens no cliente é crucial.

4.  **Armazenamento de Assets na API do GitHub:**
    *   **Justificativa:** Esta é uma decisão de design distintiva. Utilizar a API do GitHub para armazenar e gerenciar arquivos (imagens, diretórios) oferece versionamento automático (Git), uma API robusta e, para repositórios públicos ou dentro dos limites de uso, pode ser uma alternativa de baixo custo a serviços de storage dedicados (como S3).
    *   **Trade-offs:**
        *   **Rate Limiting:** A API do GitHub possui limites de requisição que podem ser atingidos em aplicações de alto tráfego.
        *   **Tamanho de Arquivos:** Pode haver restrições quanto ao tamanho de arquivos individuais e do repositório total.
        *   **Performance:** A latência pode ser maior comparada a CDNs ou serviços de storage otimizados para entrega de mídia.
        *   **Dependência:** Cria uma dependência forte da plataforma GitHub e suas políticas.
        *   **Segurança/Privacidade:** Requer gerenciamento cuidadoso de tokens de acesso ao GitHub e considerações sobre a privacidade dos assets armazenados.

5.  **Containerização com Docker:**
    *   **Justificativa:** O `Dockerfile` permite empacotar a aplicação e suas dependências em um container isolado, garantindo consistência entre ambientes de desenvolvimento, teste e produção. Facilita o deploy e a escalabilidade.
    *   **Trade-offs:** Adiciona uma camada de complexidade ao build e ao gerenciamento de containers, embora os benefícios geralmente superem isso.

6.  **Documentação de API com Swagger/OpenAPI:**
    *   **Justificativa:** `swagger-jsdoc` e `swagger-ui-express` permitem gerar documentação interativa da API diretamente a partir de comentários no código ou de uma especificação OpenAPI. Isso melhora a developer experience para os consumidores da API.
    *   **Trade-offs:** Requer disciplina para manter os comentários ou a especificação atualizados conforme a API evolui.

7.  **Medidas de Segurança (Helmet, CSRF, Rate Limiting):**
    *   **Justificativa:** A segurança é uma prioridade. `Helmet` configura diversos headers HTTP para proteger contra vulnerabilidades comuns. `csurf` implementa proteção contra CSRF. `express-rate-limit` previne abuso limitando requisições.
    *   **Trade-offs:** Podem adicionar um pequeno overhead de performance e requerem configuração cuidadosa para não bloquear tráfego legítimo.

8.  **Logging com Winston e Monitoramento com Sentry:**
    *   **Justificativa:** `Winston` oferece um sistema de logging flexível e configurável, essencial para debug e auditoria. A integração com `Sentry` (opcional, via `SENTRY_DSN`) permite o rastreamento e análise de erros em tempo real em produção.
    *   **Trade-offs:** Logging excessivo pode impactar a performance. Sentry é um serviço externo que pode ter custos.

9.  **Variáveis de Ambiente para Configuração (`dotenv`):**
    *   **Justificativa:** Seguir a metodologia Twelve-Factor App, externalizando a configuração em variáveis de ambiente. Isso melhora a segurança (não comitando segredos no código) e a portabilidade entre ambientes.
    *   **Trade-offs:** Requer gerenciamento adequado das variáveis de ambiente em cada deploy.

Estas decisões refletem um esforço para criar um sistema moderno, seguro, e adaptável, embora algumas escolhas, como o uso da API do GitHub para assets, introduzam considerações específicas que devem ser avaliadas para cada caso de uso.

## ✨ Funcionalidades Detalhadas (com Casos de Uso)

O "ES Data Base API Server" oferece um conjunto rico de funcionalidades para gerenciamento de dados, autenticação e manipulação de assets.

1.  **Autenticação de Usuários (`/api/v1/auth`)**
    *   **Descrição:** Sistema completo para registro (implícito, via seeding ou interface de admin), login, e gerenciamento de sessão usando JWT.
    *   **Funcionalidades Específicas:**
        *   **Login (`POST /login`):**
            *   **Propósito:** Autenticar um usuário com email e senha.
            *   **Mecanismo:** Valida credenciais contra o banco de dados (senhas hasheadas com bcrypt). Em sucesso, retorna um Access Token (curta duração) e um Refresh Token (longa duração, em um cookie httpOnly, secure, sameSite=None).
            *   **Caso de Uso:** Um usuário insere suas credenciais em um formulário de login. A aplicação cliente envia para este endpoint. Se válido, o cliente armazena o Access Token para requisições subsequentes e o Refresh Token é gerenciado automaticamente pelo navegador para renovação da sessão.
        *   **Refresh Token (`POST /refresh`):**
            *   **Propósito:** Obter um novo Access Token usando um Refresh Token válido.
            *   **Mecanismo:** Recebe o Refresh Token (do cookie). Se válido e não expirado, emite um novo Access Token.
            *   **Caso de Uso:** Quando o Access Token de um usuário expira, a aplicação cliente pode solicitar silenciosamente um novo Access Token usando este endpoint, sem exigir que o usuário faça login novamente.
        *   **Logout (`POST /logout`):**
            *   **Propósito:** Invalidar a sessão do usuário.
            *   **Mecanismo:** Limpa o cookie do Refresh Token.
            *   **Caso de Uso:** Um usuário clica no botão "Sair". A aplicação cliente chama este endpoint para encerrar a sessão no backend.
    *   **Segurança Adicional:**
        *   Rate limiting nas rotas de autenticação para prevenir ataques de força bruta.
        *   Validação de entrada para email e senha.

2.  **Gerenciamento de Projetos (`/api/v1/projects`)**
    *   **Descrição:** Funcionalidades CRUD completas para a entidade "Projeto". Um projeto pode conter título, descrição, conteúdo e categoria.
    *   **Funcionalidades Específicas (Endpoints):**
        *   `GET /`: Listar todos os projetos.
        *   `GET /:id`: Buscar um projeto específico por ID.
        *   `POST /`: Criar um novo projeto (requer título; descrição, conteúdo, categoria são opcionais).
        *   `PUT /:id`: Atualizar um projeto existente.
        *   `DELETE /:id`: Deletar um projeto.
    *   **Caso de Uso:** Uma aplicação de gerenciamento de portfólio ou um CMS pode usar estes endpoints para permitir que administradores criem, editem e exibam informações sobre diferentes projetos.

3.  **Gerenciamento de Cards (`/api/v1/cards`)**
    *   **Descrição:** Funcionalidades CRUD completas para a entidade "Card". Um card pode conter título, descrição e URL de imagem.
    *   **Funcionalidades Específicas (Endpoints):**
        *   `GET /`: Listar todos os cards.
        *   `GET /:id`: Buscar um card específico por ID.
        *   `POST /`: Criar um novo card (requer título; descrição, imageurl são opcionais).
        *   `PUT /:id`: Atualizar um card existente.
        *   `DELETE /:id`: Deletar um card.
    *   **Caso de Uso:** Uma galeria de imagens, um sistema de cartões de visita digitais, ou uma lista de produtos podem usar estes endpoints para gerenciar seus itens.

4.  **Listagem de Categorias (`GET /api/v1/categories`)**
    *   **Descrição:** Retorna uma lista de todas as categorias distintas associadas aos projetos existentes.
    *   **Mecanismo:** Consulta a tabela `projects` e extrai os valores únicos do campo `categoria`.
    *   **Caso de Uso:** Popular um filtro de categorias em uma interface de usuário que exibe projetos, permitindo que os usuários naveguem por projetos de uma categoria específica.

5.  **Busca de Conteúdo (`GET /api/v1/search`)**
    *   **Descrição:** Permite buscar projetos cujo campo `conteudo` corresponda a um termo de busca fornecido (case-insensitive).
    *   **Parâmetro:** `query` (termo de busca).
    *   **Mecanismo:** Executa uma query SQL `ILIKE` na tabela `projects`.
    *   **Caso de Uso:** Um usuário digita palavras-chave em uma barra de busca para encontrar projetos relevantes com base em seu conteúdo.

6.  **Gerenciamento de Assets via API do GitHub**
    *   **Descrição:** Um conjunto de endpoints para interagir com um repositório GitHub configurado, tratando-o como um sistema de arquivos para assets. Requer configuração de variáveis de ambiente como `GITHUB_TOKEN`, `GITHUB_REPO`, etc.
    *   **Funcionalidades Específicas:**
        *   **Upload de Imagens (`POST /api/v1/imageupload`):**
            *   **Propósito:** Fazer upload de um arquivo de imagem para um diretório específico no repositório GitHub.
            *   **Parâmetros:** `image` (arquivo), `directory` (opcional, nome do diretório de destino), `overwrite` (booleano, opcional, para permitir sobrescrever arquivos existentes).
            *   **Mecanismo:** Usa `multer` para processar o upload do arquivo na memória, converte para base64 e usa a API do GitHub (`contents`) para criar ou atualizar o arquivo.
            *   **Caso de Uso:** Um usuário faz upload de uma imagem de perfil ou uma imagem para um card/projeto. A imagem é armazenada no GitHub e a URL de download é retornada.
        *   **Listar Diretórios Raiz de Assets (`GET /api/v1/directories`):**
            *   **Propósito:** Listar os nomes dos diretórios existentes no caminho base de assets (ex: `public/assets/`) no repositório GitHub.
            *   **Caso de Uso:** Popular um seletor de pastas em uma interface de gerenciamento de mídia.
        *   **Listar Conteúdo de um Diretório (`GET /api/v1/directory-content/:directory`):**
            *   **Propósito:** Listar arquivos e subdiretórios dentro de um diretório específico no caminho de assets do GitHub.
            *   **Retorno:** Nome, caminho, tipo (arquivo/diretório), URL de download.
            *   **Caso de Uso:** Exibir o conteúdo de uma pasta selecionada em um gerenciador de arquivos.
        *   **Criar Diretório (`POST /api/v1/create-directory`):**
            *   **Propósito:** Criar um novo diretório no caminho de assets do GitHub (adicionando um arquivo `.gitkeep` para que o diretório vazio seja comitado).
            *   **Parâmetro:** `name` (nome do diretório).
            *   **Caso de Uso:** Permitir que usuários organizem seus uploads em novas pastas.
        *   **Deletar Conteúdo (Arquivo ou Diretório) (`DELETE /api/v1/delete-content`):**
            *   **Propósito:** Deletar um arquivo ou um diretório (e todo o seu conteúdo) do caminho de assets do GitHub.
            *   **Parâmetros:** `path` (caminho relativo do arquivo/diretório), `type` ('file' ou 'dir').
            *   **Caso de Uso:** Remover arquivos ou pastas desnecessários do sistema de assets.
        *   **Renomear Conteúdo (Arquivo) (`PUT /api/v1/rename-content`):**
            *   **Propósito:** Renomear um arquivo no caminho de assets do GitHub.
            *   **Parâmetros:** `oldPath` (caminho antigo), `newPath` (caminho novo).
            *   **Mecanismo:** Lê o conteúdo do arquivo antigo, cria um novo arquivo com o novo nome e mesmo conteúdo, e então deleta o arquivo antigo.
            *   **Caso de Uso:** Corrigir nomes de arquivos ou reorganizar arquivos.

7.  **Segurança e Utilitários da API**
    *   **Proteção CSRF (`GET /api/v1/csrf-token`):**
        *   **Propósito:** Fornecer um token CSRF para ser incluído em requisições subsequentes que modificam o estado (POST, PUT, DELETE), protegendo contra ataques CSRF.
        *   **Mecanismo:** O middleware `csurf` gera e valida esses tokens.
        *   **Caso de Uso:** Aplicações cliente devem obter este token e incluí-lo em um header (ex: `X-CSRF-Token`) ou no corpo da requisição.
    *   **Helmet:** Aplica automaticamente diversos headers HTTP de segurança.
    *   **Rate Limiting:** Limita a frequência de requisições para proteger contra abusos.
    *   **Logging (Winston):** Registros detalhados das operações do servidor e erros, armazenados em console e no arquivo `logs/server.log`.
    *   **Monitoramento de Erros (Sentry):** Se configurado, envia exceções não tratadas para o Sentry.
    *   **CORS Configurado:** Permite requisições de origens específicas (`localhost:3000`, `localhost:3001`, domínios Vercel), essencial para aplicações frontend separadas.
    *   **Ping (`GET /api/v1/ping`):** Endpoint simples para verificar a saúde e disponibilidade da API. Retorna `{ "pong": true }`.

Estas funcionalidades, combinadas, fornecem uma base sólida para uma variedade de aplicações que necessitam de um backend robusto para dados e mídia.

## 🛠️ Tech Stack Detalhado

A tabela abaixo detalha as principais tecnologias, bibliotecas e ferramentas utilizadas no desenvolvimento do "ES Data Base API Server", juntamente com seu propósito e justificativa de escolha.

| Categoria             | Tecnologia / Ferramenta         | Versão Específica (do `package.json`) | Propósito no Projeto                                                                                                | Justificativa da Escolha                                                                                                                                                              |
| --------------------- | ------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend**           | Node.js                         | `22.x` (definido em `engines`)        | Ambiente de execução JavaScript no servidor.                                                                        | Alta performance para I/O-bound, vasto ecossistema (npm), linguagem unificada (JavaScript) se o frontend também usar.                                                               |
|                       | Express.js                      | `^4.19.2`                             | Framework web minimalista e flexível para construir a API RESTful.                                                  | Popular, simples, robusto, grande comunidade, muitos middlewares disponíveis.                                                                                                         |
| **Banco de Dados**    | Sequelize                       | `^6.37.6`                             | ORM (Object-Relational Mapper) para interagir com bancos de dados SQL.                                              | Suporte a múltiplos SGBDs (SQLite, PostgreSQL), modelagem de dados, migrations, seeders, abstração de queries SQL.                                                                     |
|                       | SQLite3                         | `^5.1.7`                              | Driver para banco de dados SQLite.                                                                                  | Leve, baseado em arquivo, ideal para desenvolvimento e testes rápidos, sem necessidade de servidor de BD separado.                                                                    |
|                       | pg (PostgreSQL)                 | `^8.14.1`                             | Driver para banco de dados PostgreSQL.                                                                              | Robusto, escalável, rico em funcionalidades, adequado para ambientes de produção.                                                                                                     |
|                       | pg-hstore                       | `^2.3.4`                              | Serializa/desserializa o tipo de dados HSTORE do PostgreSQL.                                                        | Útil para armazenar dados chave-valor no PostgreSQL, se necessário.                                                                                                                   |
| **Autenticação**      | JSON Web Token (jsonwebtoken)   | `^9.0.2`                              | Geração e verificação de tokens JWT para autenticação stateless.                                                    | Padrão da indústria, seguro quando bem implementado, facilita escalabilidade.                                                                                                         |
|                       | bcryptjs                        | `^3.0.2`                              | Hashing de senhas de forma segura.                                                                                  | Algoritmo de hashing adaptativo e robusto, amplamente utilizado para proteger senhas.                                                                                                 |
|                       | cookie-parser                   | `^1.4.7`                              | Middleware para parsear cookies HTTP.                                                                               | Necessário para gerenciar o Refresh Token armazenado em cookie httpOnly.                                                                                                             |
| **Segurança**         | Helmet                          | `^8.1.0`                              | Middleware para configurar diversos headers HTTP de segurança.                                                      | Ajuda a proteger contra vulnerabilidades web comuns (XSS, clickjacking, etc.) com configuração mínima.                                                                             |
|                       | csurf                           | `^1.11.0`                             | Middleware para proteção contra CSRF (Cross-Site Request Forgery).                                                  | Essencial para proteger endpoints que modificam estado contra requisições maliciosas forjadas.                                                                                        |
|                       | express-rate-limit              | `^7.5.0`                              | Middleware para limitar a taxa de requisições a API.                                                                | Previne ataques de força bruta, DoS e abuso da API.                                                                                                                                   |
| **API & Documentação**| Swagger JSDoc                   | `^6.2.8`                              | Gera especificações OpenAPI a partir de comentários JSDoc no código.                                                | Facilita a criação e manutenção da documentação da API.                                                                                                                               |
|                       | Swagger UI Express              | `^4.6.2`                              | Serve uma interface de usuário interativa para a documentação da API gerada pelo Swagger.                           | Permite explorar e testar os endpoints da API diretamente pelo navegador.                                                                                                             |
| **Upload de Arquivos**| Multer                          | `^1.4.5-lts.2`                        | Middleware para manipulação de `multipart/form-data`, usado para upload de arquivos.                               | Padrão para upload de arquivos em aplicações Express, flexível para configurar armazenamento (memória, disco).                                                                   |
|                       | next-connect                    | `^0.12.2`                             | Roteador e construtor de middlewares (usado em `imageupload.js`).                                                   | Permite uma sintaxe mais concisa para definir rotas e aplicar middlewares, similar ao Next.js API routes.                                                                          |
| **Utilitários**       | dotenv                          | `^16.4.7`                             | Carrega variáveis de ambiente de um arquivo `.env` para `process.env`.                                              | Facilita a configuração de diferentes ambientes (dev, prod) sem hardcoding de credenciais.                                                                                          |
|                       | express-async-handler           | `^1.2.0`                              | Wrapper para rotas assíncronas do Express, simplificando o tratamento de erros.                                     | Reduz boilerplate para `try...catch` em funções de rota assíncronas, passando erros para o middleware de erro do Express.                                                            |
|                       | express-validator               | `^6.14.3`                             | Conjunto de middlewares para validação e sanitização de dados de entrada.                                           | Essencial para garantir a integridade e segurança dos dados recebidos pela API.                                                                                                       |
|                       | axios                           | `^1.8.4`                              | Cliente HTTP baseado em Promises para interagir com a API do GitHub.                                                | Amplamente utilizado, API simples e poderosa para fazer requisições HTTP.                                                                                                             |
| **Logging**           | Winston                         | `^3.17.0`                             | Biblioteca de logging versátil e configurável.                                                                      | Suporta múltiplos transportes (console, arquivo), níveis de log, formatação customizável. Essencial para monitoramento e debug.                                                   |
| **Monitoramento**     | Sentry Node SDK                 | `^7.18.1`                             | SDK para integrar a aplicação com o Sentry para rastreamento de erros.                                              | Permite monitoramento proativo de exceções em produção, facilitando a identificação e correção de bugs.                                                                            |
| **DevOps**            | Docker                          | (Definido no `Dockerfile`)            | Plataforma para desenvolver, enviar e executar aplicações em containers.                                            | Garante consistência de ambiente, facilita o deploy e a escalabilidade.                                                                                                               |
|                       | Sequelize CLI                   | `^6.6.2` (em `devDependencies`)       | Interface de linha de comando para Sequelize (gerar migrations, seeders, executar migrations).                      | Ferramenta essencial para gerenciar a evolução do schema do banco de dados.                                                                                                           |
| **Observação**        | Redis                           | `^4.6.7`                              | Cliente Redis. Embora presente nas dependências, o uso de cache com Redis foi removido do `api/search.js`.             | Pode ser um resquício de uma funcionalidade anterior ou planejado para uso futuro (ex: caching, rate limiting avançado, message broker).                                          |

Este stack tecnológico foi escolhido para prover uma base robusta, segura e escalável, utilizando ferramentas e bibliotecas bem estabelecidas na comunidade JavaScript/Node.js.

## 📂 Estrutura Detalhada do Código-Fonte

A organização do código-fonte do "ES Data Base API Server" segue uma estrutura modular, visando a separação de responsabilidades e a facilidade de manutenção. Abaixo está uma representação da estrutura de diretórios e arquivos principais, seguida de uma explicação de seus papéis:

```
serverdatabase-main/
├── .dockerignore             # Especifica arquivos a serem ignorados ao construir a imagem Docker.
├── .github/                  # Arquivos de configuração do GitHub.
│   └── FUNDING.yml           # Configuração de links de patrocínio (ex: Buy Me A Coffee).
├── .gitignore                # Especifica arquivos e pastas a serem ignorados pelo Git.
├── Dockerfile                # Instruções para construir a imagem Docker da aplicação.
├── LICENSE                   # Arquivo de licença do projeto (MIT License).
├── api/                      # Contém toda a lógica da API (rotas, controladores).
│   ├── auth/                 # Módulo de autenticação.
│   │   ├── authController.js # Controladores para lógica de autenticação (login, refresh, logout).
│   │   ├── authMiddleware.js # (Potencial) Middleware para proteger rotas com JWT (uso não explícito nas rotas de dados).
│   │   └── authRoutes.js     # Definição das rotas de autenticação.
│   ├── cardlist.js           # Rotas e lógica para o CRUD de "Cards".
│   ├── categories.js         # Rota para listar categorias de projetos.
│   ├── create-directory.js   # Rota para criar diretórios na API do GitHub.
│   ├── deletecontent.js      # Rota para deletar conteúdo (arquivos/diretórios) na API do GitHub.
│   ├── directorycontent.js   # Rota para listar o conteúdo de um diretório na API do GitHub.
│   ├── directorylist.js      # Rota para listar diretórios raiz de assets no GitHub.
│   ├── imageupload.js        # Rota para upload de imagens para a API do GitHub.
│   ├── index.js              # Ponto de entrada principal da API Express: configuração de middlewares, rotas, Swagger, etc.
│   ├── project.js            # Rotas e lógica para o CRUD de "Projetos".
│   ├── renamecontent.js      # Rota para renomear arquivos na API do GitHub.
│   └── search.js             # Rota para buscar conteúdo em projetos.
├── config/                   # Arquivos de configuração da aplicação.
│   └── config.js             # Configurações de banco de dados para diferentes ambientes (dev, test, prod) usando Sequelize.
├── database.sqlite           # Arquivo do banco de dados SQLite (usado em desenvolvimento, se configurado).
├── logs/                     # Diretório para arquivos de log.
│   └── server.log            # Arquivo de log principal gerado pelo Winston.
├── migrations/               # Arquivos de migração do Sequelize para gerenciar o schema do banco de dados.
│   ├── 20250318235013-create-projects.js
│   ├── 20250318235020-create-cards.js
│   └── 20250322002942-create-user.js
├── models/                   # Definições dos modelos (schemas) do Sequelize.
│   ├── card.js               # Modelo Sequelize para a entidade "Card".
│   ├── index.js              # Ponto de agregação dos modelos Sequelize e inicialização da conexão.
│   ├── project.js            # Modelo Sequelize para a entidade "Projeto".
│   └── user.js               # Modelo Sequelize para a entidade "Usuário".
├── package-lock.json         # Registra as versões exatas das dependências instaladas.
├── package.json              # Metadados do projeto, dependências, scripts.
├── seeders/                  # Arquivos de seed do Sequelize para popular o banco de dados com dados iniciais.
│   ├── 20250318235533-demo-projects.js
│   └── 20250322003023-demo-user.js
├── services/                 # Lógica de negócio desacoplada dos controladores.
│   └── authService.js        # Serviço de autenticação (validação, geração de tokens).
└── utils/                    # Utilitários diversos.
    └── logger.js             # Configuração do logger Winston.
```

**Explicação dos Diretórios Principais:**

*   **`.github/`**: Contém configurações específicas do GitHub, como o `FUNDING.yml` para exibir botões de patrocínio.
*   **`api/`**: Coração da aplicação, onde todas as rotas e a lógica de controle da API são definidas.
    *   **`api/auth/`**: Submódulo dedicado exclusivamente à autenticação, separando suas responsabilidades.
    *   **`api/index.js`**: Orquestrador principal da API. Inicializa o Express, configura middlewares globais (CORS, Helmet, CSRF, cookieParser, bodyParser), define as rotas principais, configura o Swagger, e inicia o servidor.
*   **`config/`**: Centraliza as configurações da aplicação, especialmente as do banco de dados para diferentes ambientes, lidas pelo Sequelize.
*   **`logs/`**: Destino dos arquivos de log gerados pela aplicação, útil para auditoria e depuração.
*   **`migrations/`**: Essencial para o versionamento do esquema do banco de dados. Cada arquivo representa uma alteração incremental no schema.
*   **`models/`**: Define a estrutura dos dados da aplicação através dos modelos do Sequelize. `models/index.js` é crucial para carregar todos os modelos e estabelecer a conexão com o banco.
*   **`seeders/`**: Contém scripts para popular o banco de dados com dados iniciais ou de demonstração, útil para desenvolvimento e testes.
*   **`services/`**: Camada de serviço que encapsula a lógica de negócio mais complexa, mantendo os controladores mais enxutos. Atualmente, contém `authService.js`.
*   **`utils/`**: Funções e módulos utilitários que podem ser reutilizados em diferentes partes da aplicação, como o `logger.js`.

**Arquivos Raiz Importantes:**

*   **`Dockerfile`**: Define como construir a imagem Docker da aplicação, facilitando o deploy.
*   **`LICENSE`**: Especifica os termos sob os quais o software é distribuído.
*   **`package.json`**: Documento fundamental de projetos Node.js, listando metadados, dependências, devDependencies e scripts (como `start` e `build`).

Esta estrutura promove uma clara separação de interesses, facilitando a navegação, compreensão e extensão do projeto.

## 📋 Pré-requisitos Avançados

Para compilar, executar e desenvolver o "ES Data Base API Server", os seguintes pré-requisitos de software e configuração são necessários:

1.  **Node.js:**
    *   **Versão:** `22.x` (conforme especificado em `package.json` -> `engines`). Recomenda-se usar um gerenciador de versões Node como NVM (Node Version Manager) para facilitar a instalação e troca entre versões.
2.  **NPM (Node Package Manager):**
    *   Geralmente instalado junto com o Node.js. Usado para gerenciar as dependências do projeto.
3.  **Git:**
    *   Sistema de controle de versão necessário para clonar o repositório e gerenciar o código-fonte.
4.  **Docker (Opcional, mas Recomendado):**
    *   Para construir e executar a aplicação em um ambiente containerizado, facilitando o deploy e garantindo consistência.
5.  **Variáveis de Ambiente:**
    *   O projeto utiliza variáveis de ambiente para configurações sensíveis e específicas de cada ambiente. É crucial criar um arquivo `.env` na raiz do projeto (copiando de um `.env.example` se disponível, ou criando manualmente) com as seguintes variáveis (no mínimo):

    | Variável               | Descrição                                                                      | Exemplo (Não usar em produção!)         | Obrigatória |
    | ---------------------- | ------------------------------------------------------------------------------ | --------------------------------------- | ----------- |
    | `PORT`                 | Porta em que o servidor API irá escutar.                                       | `8000`                                  | Sim         |
    | `JWT_SECRET`           | Segredo para assinar os Access Tokens JWT. Deve ser uma string longa e aleatória. | `seuSuperSegredoJWTParaAccessToken`     | Sim         |
    | `JWT_REFRESH_SECRET`   | Segredo para assinar os Refresh Tokens JWT. Deve ser uma string longa e aleatória.| `seuSuperSegredoJWTParaRefreshToken`    | Sim         |
    | `NODE_ENV`             | Ambiente de execução (`development`, `production`, `test`).                      | `development`                           | Sim         |
    | `SENTRY_DSN`           | DSN do Sentry para monitoramento de erros (opcional).                          | `https://seu_dsn@sentry.io/project_id`  | Não         |
    | `BASE_URL`             | URL base da API (usado no Swagger).                                            | `http://localhost:8000/api/v1`          | Não         |
    | **Configuração do Banco de Dados (para Produção - PostgreSQL):**                                                                                             |             |
    | `DB_DIALECT`           | Dialeto do banco de dados para produção.                                       | `postgres`                              | Se `NODE_ENV=production` |
    | `DB_HOST`              | Host do servidor PostgreSQL.                                                   | `localhost` ou IP/hostname do servidor  | Se `NODE_ENV=production` |
    | `DB_PORT`              | Porta do servidor PostgreSQL.                                                  | `5432`                                  | Se `NODE_ENV=production` |
    | `DB_NAME`              | Nome do banco de dados PostgreSQL.                                             | `esdatabase_prod`                       | Se `NODE_ENV=production` |
    | `DB_USER`              | Usuário para conectar ao banco de dados PostgreSQL.                            | `admin`                                 | Se `NODE_ENV=production` |
    | `DB_PASSWORD`          | Senha para conectar ao banco de dados PostgreSQL.                              | `senhaSuperSegura`                      | Se `NODE_ENV=production` |
    | **Configuração do Banco de Dados (para Desenvolvimento - SQLite):**                                                                                          |             |
    | `SQLITE_STORAGE`       | Caminho para o arquivo do banco de dados SQLite.                               | `./database.sqlite`                     | Se `NODE_ENV=development` e não usando config padrão |
    | **Configuração da API do GitHub (para Gerenciamento de Assets):**                                                                                            |             |
    | `GITHUB_TOKEN`         | Token de Acesso Pessoal (PAT) do GitHub com permissões `repo`.                 | `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` | Sim (para assets) |
    | `GITHUB_REPO`          | Nome do repositório no formato `usuario/nome-do-repositorio`.                  | `SeuUsuarioGitHub/SeuRepositorioAssets` | Sim (para assets) |
    | `GITHUB_BRANCH`        | Branch do repositório onde os assets serão comitados.                          | `main` ou `master`                      | Sim (para assets) |
    | `GITHUB_UPLOAD_PATH`   | Caminho base dentro do repositório para uploads (ex: `public/assets`).         | `public/assets`                         | Sim (para assets) |
    | `COMMITTER_NAME`       | Nome do committer para commits feitos pela API.                                | `ES Data Base Bot`                      | Sim (para assets) |
    | `COMMITTER_EMAIL`      | Email do committer para commits feitos pela API.                               | `bot@example.com`                       | Sim (para assets) |

    **Nota sobre `GITHUB_TOKEN`:** Este token deve ser gerado nas configurações de desenvolvedor da sua conta GitHub e deve ter escopo `repo` (controle total de repositórios privados e públicos) para permitir que a API crie, leia, atualize e delete arquivos no repositório especificado. Mantenha este token seguro.

Atender a estes pré-requisitos garantirá que você possa instalar as dependências, executar as migrações do banco de dados e iniciar o servidor da API corretamente.

## 🚀 Guia de Instalação e Configuração Avançada

Siga os passos abaixo para clonar, configurar e executar o "ES Data Base API Server" em seu ambiente local.

**1. Clonar o Repositório:**

```bash
git clone URL_DO_REPOSITORIO_AQUI esdatabase-server
cd esdatabase-server
```
(Substitua `URL_DO_REPOSITORIO_AQUI` pela URL real do repositório, se disponível. O nome do diretório do projeto é `serverdatabase-main` no ZIP fornecido, então o comando de clone pode ser ajustado para `git clone URL_DO_REPOSITORIO_AQUI serverdatabase-main` se você quiser manter esse nome.)

**2. Instalar Dependências:**

Certifique-se de ter Node.js (versão `22.x`) e npm instalados.

```bash
npm install
```
Este comando instalará todas as dependências listadas no `package.json`.

**3. Configurar Variáveis de Ambiente:**

Crie um arquivo chamado `.env` na raiz do projeto. Você pode copiar de um arquivo `.env.example` (se fornecido no repositório) ou criar um novo. Preencha com as variáveis de ambiente necessárias, conforme detalhado na seção "Pré-requisitos Avançados".

Exemplo de conteúdo mínimo para **desenvolvimento (usando SQLite e GitHub Assets)**:
```env
# Configurações do Servidor
PORT=8000
NODE_ENV=development

# Segredos JWT (gere valores aleatórios e seguros para produção)
JWT_SECRET=seuSuperSegredoJWTParaAccessTokenDev
JWT_REFRESH_SECRET=seuSuperSegredoJWTParaRefreshTokenDev

# Configuração do Banco de Dados (SQLite para desenvolvimento)
SQLITE_STORAGE=./database.sqlite

# Configuração da API do GitHub para Assets
GITHUB_TOKEN=ghp_SEU_GITHUB_PERSONAL_ACCESS_TOKEN
GITHUB_REPO=SEU_USUARIO_GITHUB/NOME_DO_REPOSITORIO_ASSETS
GITHUB_BRANCH=main
GITHUB_UPLOAD_PATH=public/assets # Diretório dentro do GITHUB_REPO para os uploads
COMMITTER_NAME="Seu Nome ou Nome do Bot"
COMMITTER_EMAIL="seuemail@example.com"

# Opcional: Sentry DSN para monitoramento de erros
# SENTRY_DSN=https_seu_dsn_aqui@sentry.io/projectid

# Opcional: URL base para Swagger
# BASE_URL=http://localhost:8000/api/v1
```
**Importante:**
*   Para `GITHUB_TOKEN`, gere um Personal Access Token (PAT) no GitHub com as permissões de `repo`.
*   Crie o repositório (`GITHUB_REPO`) no GitHub se ele ainda não existir.
*   Os segredos JWT (`JWT_SECRET`, `JWT_REFRESH_SECRET`) devem ser strings longas, complexas e aleatórias, especialmente em produção.

**4. Executar Migrações e Seeders do Banco de Dados (Sequelize):**

Estes comandos criarão as tabelas no banco de dados e popularão com dados iniciais, se houver seeders.

*   **Para criar o banco de dados (se não existir, especialmente para PostgreSQL):**
    ```bash
    # Para PostgreSQL, você pode precisar criar o banco de dados manualmente primeiro.
    # Ex: CREATEDB nome_do_banco_de_dados
    # Para SQLite, o arquivo será criado automaticamente.
    ```

*   **Executar Migrações:**
    ```bash
    npx sequelize-cli db:migrate
    ```

*   **Executar Seeders (opcional, para dados de demonstração):**
    ```bash
    npx sequelize-cli db:seed:all
    ```
    (O seeder de usuário cria `admin@teste.com` com senha `123456`).

**5. Iniciar a Aplicação:**

*   **Modo de Desenvolvimento:**
    ```bash
    npm start
    ```
    Isso executará o script `node api/index.js`. O servidor estará acessível em `http://localhost:PORT` (ex: `http://localhost:8000`).
    A documentação da API (Swagger UI) estará disponível em `http://localhost:PORT/api-docs`.

*   **Para Produção (usando PostgreSQL):**
    Certifique-se de que as variáveis de ambiente no `.env` (ou no ambiente de produção) estejam configuradas para PostgreSQL (`DB_DIALECT=postgres`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`).
    O comando `npm start` também pode ser usado, mas geralmente em produção você usaria um gerenciador de processos como PM2 ou executaria via Docker.

**6. Usando Docker (Opcional):**

*   **Construir a Imagem Docker:**
    A partir da raiz do projeto (onde está o `Dockerfile`):
    ```bash
    docker build -t esdatabase-server .
    ```

*   **Executar o Container Docker:**
    ```bash
    docker run -p 8000:8000 --env-file .env --name esdatabase-app esdatabase-server
    ```
    *   `-p 8000:8000`: Mapeia a porta 8000 do host para a porta 8000 do container.
    *   `--env-file .env`: Passa as variáveis de ambiente do arquivo `.env` local para o container.
    *   `--name esdatabase-app`: Nomeia o container para facilitar o gerenciamento.
    *   `esdatabase-server`: Nome da imagem construída.

    Se você estiver usando PostgreSQL em um container Docker separado, precisará configurar a rede Docker para que os containers possam se comunicar (ex: usando Docker Compose).

Após estes passos, a API deverá estar operacional e pronta para receber requisições.

## ⚙️ Uso Avançado e Exemplos

Esta seção demonstra exemplos de como interagir com os principais endpoints da API usando `cURL`. Lembre-se de substituir `http://localhost:8000` pela URL base correta da sua API e os tokens/IDs conforme necessário.

**1. Obter Token CSRF:**
Primeiro, obtenha um token CSRF. Este token será necessário para requisições `POST`, `PUT`, `DELETE`.

```bash
CSRF_RESPONSE=$(curl -s -c cookies.txt http://localhost:8000/api/v1/csrf-token)
CSRF_TOKEN=$(echo $CSRF_RESPONSE | jq -r .csrfToken)
echo "CSRF Token: $CSRF_TOKEN"
```
*   `-s`: Modo silencioso.
*   `-c cookies.txt`: Salva os cookies (incluindo o cookie `_csrf`) em `cookies.txt`.
*   `jq` é usado para extrair o `csrfToken` do JSON (instale `jq` se não tiver).

**2. Autenticação - Login:**
(O endpoint de login está isento da proteção CSRF global, mas enviaremos o CSRF token se o tivermos, embora não seja estritamente necessário para esta rota específica).

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
-H "Content-Type: application/json" \
-H "X-CSRF-Token: $CSRF_TOKEN" \
-b cookies.txt -c cookies.txt \
-d '{
  "email": "admin@teste.com",
  "password": "123456"
}'
```
*   `-b cookies.txt`: Envia cookies salvos.
*   `-c cookies.txt`: Atualiza os cookies (o `refreshToken` será setado aqui).
*   A resposta conterá um `accessToken`. Armazene-o para as próximas requisições.
    ```bash
    # Supondo que a resposta foi salva em response.json
    ACCESS_TOKEN=$(cat response.json | jq -r .accessToken)
    echo "Access Token: $ACCESS_TOKEN"
    ```

**3. Criar um Novo Projeto (Requer Autenticação e CSRF):**
(Assumindo que a rota de projetos requer autenticação, embora não esteja explícito no código fornecido. Se não requerer, o header `Authorization` pode ser omitido).

```bash
curl -X POST http://localhost:8000/api/v1/projects \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $ACCESS_TOKEN" \
-H "X-CSRF-Token: $CSRF_TOKEN" \
-b cookies.txt \
-d '{
  "titulo": "Meu Novo Projeto Incrível",
  "descricao": "Uma descrição detalhada do projeto.",
  "conteudo": "Conteúdo principal do projeto...",
  "categoria": "Desenvolvimento Web"
}'
```

**4. Listar Todos os Projetos:**

```bash
curl -X GET http://localhost:8000/api/v1/projects \
-H "Authorization: Bearer $ACCESS_TOKEN" # Se a rota for protegida
```

**5. Upload de Imagem (para o GitHub):**
Este endpoint espera `multipart/form-data`.

```bash
curl -X POST http://localhost:8000/api/v1/imageupload \
-H "Authorization: Bearer $ACCESS_TOKEN" \
-H "X-CSRF-Token: $CSRF_TOKEN" \
-b cookies.txt \
-F "image=@/caminho/para/sua/imagem.jpg" \
-F "directory=minhas_imagens" \
-F "overwrite=false"
```
*   `-F "image=@/path/to/your/image.jpg"`: Especifica o arquivo a ser enviado.
*   `-F "directory=minhas_imagens"`: Diretório de destino opcional no GitHub.
*   `-F "overwrite=false"`: Opcional, para não sobrescrever se o arquivo existir.

**6. Listar Conteúdo de um Diretório no GitHub:**

```bash
curl -X GET http://localhost:8000/api/v1/directory-content/minhas_imagens \
-H "Authorization: Bearer $ACCESS_TOKEN" # Se a rota for protegida
```

**7. Criar um Novo Diretório no GitHub:**

```bash
curl -X POST http://localhost:8000/api/v1/create-directory \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $ACCESS_TOKEN" \
-H "X-CSRF-Token: $CSRF_TOKEN" \
-b cookies.txt \
-d '{
  "name": "nova_pasta_de_assets"
}'
```

**8. Deletar um Arquivo do GitHub:**

```bash
curl -X DELETE http://localhost:8000/api/v1/delete-content \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $ACCESS_TOKEN" \
-H "X-CSRF-Token: $CSRF_TOKEN" \
-b cookies.txt \
-d '{
  "path": "minhas_imagens/imagem_a_deletar.jpg",
  "type": "file"
}'
```

**Notas Importantes:**

*   **Autenticação de Rotas:** Os exemplos acima assumem que rotas como `/projects` ou `/imageupload` podem requerer autenticação (`Authorization: Bearer $ACCESS_TOKEN`). Verifique a implementação específica de cada rota para saber se a autenticação é obrigatória. O `authMiddleware.js` existe, mas sua aplicação nas rotas de dados não está explícita nos trechos de código fornecidos.
*   **CSRF Token:** Lembre-se de obter um novo CSRF token se a sessão expirar ou se você iniciar uma nova "conversa" com a API. O cookie `_csrf` e o token `X-CSRF-Token` devem estar sincronizados.
*   **Cookies:** Os comandos `curl` com `-b cookies.txt -c cookies.txt` ajudam a gerenciar cookies entre requisições, o que é importante para o `refreshToken` (httpOnly) e o cookie `_csrf`.
*   **jq:** A ferramenta `jq` é muito útil para processar JSON na linha de comando.

Estes exemplos cobrem alguns dos cenários de uso mais comuns. Consulte a documentação Swagger (`/api-docs`) para uma lista completa de endpoints e seus parâmetros.

## 🔧 API Reference (se aplicável)

Sim, este projeto é uma API RESTful. A documentação interativa completa da API está disponível via Swagger UI no endpoint `/api-docs` (ex: `http://localhost:8000/api-docs`) quando o servidor está em execução.

Abaixo, uma visão geral dos principais grupos de endpoints. Todos os endpoints estão sob o prefixo `/api/v1`.

**Autenticação (`/auth`)**

*   **`POST /login`**
    *   **Descrição:** Autentica um usuário e retorna tokens de acesso e refresh.
    *   **Request Body:** `{ "email": "user@example.com", "password": "password123" }`
    *   **Response (Sucesso 200):** `{ "accessToken": "jwt_access_token_string" }` (Refresh token é enviado em cookie httpOnly).
    *   **Response (Erro 401):** `{ "message": "Credenciais inválidas" }`
*   **`POST /refresh`**
    *   **Descrição:** Gera um novo access token usando um refresh token válido (enviado via cookie).
    *   **Response (Sucesso 200):** `{ "accessToken": "new_jwt_access_token_string" }`
    *   **Response (Erro 401/403):** Se o refresh token for inválido ou ausente.
*   **`POST /logout`**
    *   **Descrição:** Realiza o logout do usuário, limpando o cookie do refresh token.
    *   **Response (Sucesso 200):** `{ "message": "Logout realizado com sucesso" }`

**CSRF Token**

*   **`GET /csrf-token`**
    *   **Descrição:** Retorna um token CSRF para ser usado em requisições subsequentes que modificam dados.
    *   **Response (Sucesso 200):** `{ "csrfToken": "csrf_token_string" }`

**Projetos (`/projects`)**

*   **`GET /`**: Lista todos os projetos.
*   **`POST /`**: Cria um novo projeto.
    *   **Request Body:** `{ "titulo": "string", "descricao": "string" (opcional), "conteudo": "string" (opcional), "categoria": "string" (opcional) }`
*   **`GET /:id`**: Busca um projeto por ID.
*   **`PUT /:id`**: Atualiza um projeto existente.
    *   **Request Body:** Similar ao POST.
*   **`DELETE /:id`**: Deleta um projeto.

**Cards (`/cards`)**

*   **`GET /`**: Lista todos os cards.
*   **`POST /`**: Cria um novo card.
    *   **Request Body:** `{ "titulo": "string", "descricao": "string" (opcional), "imageurl": "string" (opcional) }`
*   **`GET /:id`**: Busca um card por ID.
*   **`PUT /:id`**: Atualiza um card existente.
    *   **Request Body:** Similar ao POST.
*   **`DELETE /:id`**: Deleta um card.

**Categorias (`/categories`)**

*   **`GET /`**: Lista todas as categorias distintas de projetos.

**Busca (`/search`)**

*   **`GET /?query={termo}`**: Busca projetos pelo conteúdo.
    *   **Query Parameter:** `query` (string, termo de busca).

**Gerenciamento de Assets (via GitHub API)**

*   **Upload de Imagem (`/imageupload`)**
    *   **`POST /`**: Faz upload de uma imagem.
    *   **Request Body (multipart/form-data):** `image` (arquivo), `directory` (string, opcional), `overwrite` (boolean, opcional).
    *   **Response (Sucesso 200):** `{ "imageUrl": "url_de_download_da_imagem_no_github" }`
*   **Listar Diretórios de Assets (`/directories`)**
    *   **`GET /`**: Lista os diretórios na raiz do `GITHUB_UPLOAD_PATH`.
*   **Conteúdo de Diretório (`/directory-content`)**
    *   **`GET /:directory`**: Lista arquivos e subdiretórios dentro do `:directory` especificado.
*   **Criar Diretório (`/create-directory`)**
    *   **`POST /`**: Cria um novo diretório.
    *   **Request Body:** `{ "name": "nome_do_novo_diretorio" }`
*   **Deletar Conteúdo (`/delete-content`)**
    *   **`DELETE /`**: Deleta um arquivo ou diretório.
    *   **Request Body:** `{ "path": "caminho/do/conteudo", "type": "file" | "dir" }`
*   **Renomear Conteúdo (`/rename-content`)**
    *   **`PUT /`**: Renomeia um arquivo.
    *   **Request Body:** `{ "oldPath": "caminho/antigo/arquivo.ext", "newPath": "caminho/novo/arquivo.ext" }`

**Ping**

*   **`GET /ping`**
    *   **Descrição:** Endpoint de health check.
    *   **Response (Sucesso 200):** `{ "pong": true }`

**Notas sobre a API:**
*   **Proteção CSRF:** A maioria dos endpoints `POST`, `PUT`, `DELETE` requerem um token CSRF válido enviado no header `X-CSRF-Token` ou `X-XSRF-TOKEN`, ou no corpo da requisição. O endpoint `/api/v1/auth/login` é uma exceção.
*   **Autenticação JWT:** Embora o sistema de autenticação JWT esteja implementado para login/refresh, a aplicação de um middleware de autenticação (`Authorization: Bearer <token>`) para proteger os endpoints de dados (como `/projects`, `/cards`) não está explicitamente detalhada nos trechos de código das rotas fornecidas. Isso deve ser verificado na implementação completa ou considerado para desenvolvimento futuro.
*   **Validação de Entrada:** Muitos endpoints utilizam `express-validator` para validar os dados da requisição. Respostas de erro apropriadas (ex: 400 Bad Request) são retornadas se a validação falhar.
*   **Rate Limiting:** Aplicado a rotas sensíveis, como as de autenticação, para prevenir abusos.

Para detalhes exatos sobre parâmetros, corpos de requisição/resposta e códigos de status, consulte a documentação interativa no endpoint `/api-docs`.

## 🧪 Estratégia de Testes e Qualidade de Código

Uma estratégia de testes robusta e a manutenção da qualidade do código são fundamentais para a confiabilidade e manutenibilidade de qualquer software. Para o "ES Data Base API Server":

**1. Filosofia de Testes:**
A filosofia de testes deve visar a cobertura em múltiplos níveis (pirâmide de testes), garantindo que diferentes aspectos da aplicação funcionem como esperado:
*   **Testes Unitários:** Foco em testar as menores unidades de código isoladamente (ex: funções em serviços, modelos, utilitários).
*   **Testes de Integração:** Verificar a interação entre diferentes componentes ou módulos (ex: rota -> controlador -> serviço -> modelo; interação com a API do GitHub).
*   **Testes de API (End-to-End):** Testar os endpoints da API como uma caixa preta, verificando se as requisições HTTP produzem as respostas esperadas e os efeitos colaterais corretos (ex: criação de dados no banco).

**2. Implementação Atual de Testes:**
Os dados do projeto fornecidos **não incluem arquivos de teste** (ex: diretório `tests/` ou arquivos com sufixo `.test.js` ou `.spec.js`). Portanto, a implementação atual de testes automatizados não pode ser detalhada. Esta é uma área crítica para desenvolvimento futuro.

**3. Ferramentas e Frameworks Sugeridos:**
Para implementar os testes, as seguintes ferramentas são comumente usadas no ecossistema Node.js/Express:
*   **Framework de Teste:**
    *   **Jest:** Uma escolha popular, oferece um ambiente de teste completo com assertions, mocking, e relatórios de cobertura integrados.
    *   **Mocha:** Outro framework flexível, geralmente usado em conjunto com bibliotecas de assertion como Chai.
*   **Biblioteca de Assertion:**
    *   **Chai:** (Se usando Mocha) Fornece uma variedade de estilos de assertion (should, expect, assert).
*   **Testes de API HTTP:**
    *   **Supertest:** Permite testar endpoints HTTP de forma programática, abstraindo o servidor Express.
*   **Mocking e Stubs:**
    *   **Jest Mocks:** Funcionalidades de mocking integradas no Jest.
    *   **Sinon.JS:** Biblioteca poderosa para spies, stubs e mocks, útil com Mocha/Chai.
*   **Cobertura de Código:**
    *   **Istanbul (via Jest ou nyc):** Gera relatórios sobre a porcentagem do código que é coberta por testes.

**4. Como Executar Testes (Exemplo Hipotético):**
Se os testes fossem implementados (ex: com Jest), um script seria adicionado ao `package.json`:
```json
// package.json (exemplo)
"scripts": {
  "test": "jest --coverage"
}
```
E os testes seriam executados com:
```bash
npm test
```

**5. Qualidade de Código:**
*   **Linting e Formatação:**
    *   **ESLint:** Para análise estática de código, identificando padrões problemáticos e forçando um estilo de código.
    *   **Prettier:** Um formatador de código opinativo para garantir consistência visual.
    *   (Configurações para ESLint e Prettier não estão presentes no `package.json` fornecido, mas são altamente recomendadas.)
*   **Convenções de Código:** Adoção de um guia de estilo consistente (ex: Airbnb JavaScript Style Guide).
*   **Revisão de Código (Code Review):** Processo essencial onde outros desenvolvedores revisam as alterações antes de serem integradas, ajudando a identificar bugs, melhorar a qualidade e compartilhar conhecimento.

**6. Integração Contínua / Entrega Contínua (CI/CD):**
*   **GitHub Actions (ou similar):** Configurar workflows de CI/CD para automatizar a execução de testes, linting, e builds a cada push ou pull request.
*   (Não há arquivos de workflow do GitHub Actions no diretório `.github/` fornecido.)

**Recomendações Futuras:**
*   **Priorizar a criação de uma suíte de testes abrangente**, começando por testes unitários para a lógica de serviços (especialmente `authService.js`) e testes de API para os principais endpoints.
*   **Configurar ESLint e Prettier** para manter a consistência e qualidade do código.
*   **Implementar pipelines de CI/CD** para automatizar verificações de qualidade e, potencialmente, o deploy.
*   **Monitorar a cobertura de código** e estabelecer metas para aumentá-la progressivamente.

A ausência de testes automatizados é um débito técnico significativo. A introdução de uma estratégia de testes robusta aumentará a confiança nas modificações e na estabilidade geral da aplicação.

## 🚢 Deployment Detalhado e Escalabilidade

O "ES Data Base API Server" é projetado para ser flexível em termos de deployment, com suporte primário via Docker e potencial para plataformas serverless como Vercel.

**1. Deployment com Docker:**

O `Dockerfile` fornecido permite containerizar a aplicação, tornando o deployment consistente em qualquer ambiente que suporte Docker.

*   **Ambiente de Produção:**
    *   **Construção da Imagem:** `docker build -t esdatabase-server:latest .`
    *   **Execução do Container:**
        ```bash
        docker run -d \
          -p 80:8000 \
          --env-file .env.production \
          --restart always \
          --name esdatabase-prod-app \
          esdatabase-server:latest
        ```
        *   `-d`: Executa em modo detached.
        *   `-p 80:8000`: Mapeia a porta 80 do host para a 8000 do container (ajuste conforme necessário).
        *   `--env-file .env.production`: Utiliza um arquivo de variáveis de ambiente específico para produção.
        *   `--restart always`: Reinicia o container automaticamente em caso de falha.

*   **Plataformas de Orquestração (Kubernetes, Docker Swarm):**
    *   Para deployments mais complexos e escaláveis, a imagem Docker pode ser utilizada em orquestradores como Kubernetes ou Docker Swarm. Isso permite gerenciamento avançado de réplicas, balanceamento de carga, atualizações rolling, e auto-healing.
    *   Seriam necessários arquivos de configuração específicos para essas plataformas (ex: YAMLs de Deployment/Service para Kubernetes).

*   **Serviços de Cloud que Suportam Containers:**
    *   **AWS:** Elastic Container Service (ECS), Elastic Kubernetes Service (EKS), App Runner.
    *   **Google Cloud:** Cloud Run, Google Kubernetes Engine (GKE).
    *   **Azure:** Azure Container Instances (ACI), Azure Kubernetes Service (AKS).

**2. Deployment em Vercel (Considerações):**

O nome do projeto no `package.json` (`json-server-vercel`) e as configurações de CORS no `api/index.js` (permitindo origens Vercel) sugerem que o deploy em Vercel é uma intenção.

*   **Como Serverless Functions:**
    *   O Vercel é otimizado para aplicações frontend e backends serverless (Node.js, Go, Python, Ruby). O arquivo `api/index.js` pode ser adaptado para funcionar como o handler de uma serverless function.
    *   **Estrutura:** O Vercel geralmente espera que os handlers da API estejam em um diretório `api/`. O `main` no `package.json` é `api/index.js`.
    *   **Configuração (`vercel.json`):** Um arquivo `vercel.json` pode ser necessário para configurar builds, rewrites, e variáveis de ambiente.
    *   **Banco de Dados:** Para PostgreSQL em produção, seria necessário usar um serviço de banco de dados gerenciado (ex: Vercel Postgres, Neon, Supabase, AWS RDS, Google Cloud SQL) e configurar as variáveis de conexão no Vercel. SQLite não é adequado para produção serverless devido à natureza efêmera do sistema de arquivos.
    *   **Gerenciamento de Assets no GitHub:** Esta funcionalidade permaneceria a mesma, dependendo das variáveis de ambiente configuradas no Vercel.

**3. Escalabilidade:**

*   **Horizontal Scaling:**
    *   **Com Docker e Orquestradores:** Aumentar o número de instâncias (réplicas) do container da API e usar um balanceador de carga para distribuir o tráfego. O uso de JWT (stateless) facilita a escalabilidade horizontal.
    *   **Com Vercel (Serverless):** A plataforma Vercel gerencia automaticamente a escalabilidade das serverless functions com base na demanda.
*   **Banco de Dados:**
    *   O PostgreSQL é altamente escalável. Podem ser usadas réplicas de leitura, sharding (para volumes de dados muito grandes), e serviços de banco de dados gerenciados que oferecem escalabilidade.
    *   Otimizar queries e índices é crucial para a performance do banco de dados.
*   **Gerenciamento de Assets (GitHub API):**
    *   **Limitações:** A principal limitação de escalabilidade aqui é o rate limit da API do GitHub. Para aplicações com um volume muito alto de uploads/downloads de assets, pode ser necessário:
        *   Implementar caching robusto para os assets (ex: usando uma CDN na frente das URLs de download do GitHub).
        *   Considerar uma migração para um serviço de storage dedicado (AWS S3, Google Cloud Storage) se os limites do GitHub se tornarem um gargalo.
*   **Monitoramento e Logging:**
    *   Utilizar Sentry para monitoramento de erros e Winston para logging (com logs centralizados em produção, ex: ELK Stack, Datadog, Logtail) é vital para identificar gargalos de performance e problemas de escalabilidade.

**4. Considerações Adicionais para Produção:**

*   **HTTPS:** Sempre use HTTPS em produção. Plataformas como Vercel e a maioria dos balanceadores de carga/gateways de API em serviços de nuvem facilitam a configuração de SSL/TLS.
*   **Variáveis de Ambiente Seguras:** Gerencie segredos (JWT secrets, DB passwords, API keys) de forma segura usando os mecanismos fornecidos pela plataforma de deploy (ex: Vercel Environment Variables, Kubernetes Secrets, AWS Secrets Manager).
*   **Backup do Banco de Dados:** Implemente uma estratégia de backup regular para o banco de dados de produção.
*   **CDN para Assets Estáticos:** Se os assets armazenados no GitHub forem públicos, usar uma CDN pode melhorar significativamente a performance de entrega e reduzir a carga na API do GitHub.

A escolha da estratégia de deployment dependerá dos requisitos específicos do projeto, do tráfego esperado, do orçamento e da familiaridade da equipe com as diferentes tecnologias e plataformas.

## 📜 Licença e Aspectos Legais

O "ES Data Base API Server" é distribuído sob os termos da **MIT License**.

Copyright (c) 2024 ES Data Base

A permissão é concedida, gratuitamente, a qualquer pessoa que obtenha uma cópia deste software e arquivos de documentação associados (o "Software"), para lidar com o Software sem restrições, incluindo, sem limitação, os direitos de usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender cópias do Software, e permitir que as pessoas a quem o Software é fornecido o façam, sujeito às seguintes condições:

O aviso de copyright acima e este aviso de permissão devem ser incluídos em todas as cópias ou partes substanciais do Software.

O SOFTWARE É FORNECIDO "COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA OU IMPLÍCITA, INCLUINDO, MAS NÃO SE LIMITANDO ÀS GARANTIAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO E NÃO VIOLAÇÃO. EM NENHUM CASO OS AUTORES OU DETENTORES DOS DIREITOS AUTORAIS SERÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO, DANOS OU OUTRA RESPONSABILIDADE, SEJA EM UMA AÇÃO DE CONTRATO, DELITO OU DE OUTRA FORMA, DECORRENTE DE, OU EM CONEXÃO COM O SOFTWARE OU O USO OU OUTRAS NEGOCIAÇÕES NO SOFTWARE.

Você pode encontrar o texto completo da licença no arquivo [LICENSE](LICENSE) na raiz deste repositório.

Ao usar, contribuir ou distribuir este software, você concorda em cumprir os termos desta licença.

## 👥 Equipe Principal e Colaboradores Chave

Este projeto é mantido e desenvolvido principalmente por:

*   **ES Data Base** (Conforme indicado no arquivo `LICENSE`).

O projeto também se beneficia do apoio e das ferramentas da comunidade open-source.

**Apoio ao Projeto:**
Você pode apoiar o desenvolvimento e manutenção deste projeto ou de projetos relacionados através do link de financiamento fornecido por `kitloong` (conforme `serverdatabase-main/.github/FUNDING.yml`):
*   [![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-kitloong-yellow.svg?style=for-the-badge&logo=buymeacoffee)](https://www.buymeacoffee.com/kitloong)

Agradecemos a todos que dedicam seu tempo e esforço para melhorar este software!

(Se houver outros contribuidores significativos ou se o autor principal tiver um perfil público como GitHub ou LinkedIn que deseje vincular, esta seção pode ser expandida.)

## ❓ FAQ (Perguntas Frequentes)

1.  **P: Como devo gerar e configurar o `GITHUB_TOKEN` para o gerenciamento de assets?**
    *   **R:** Você precisa gerar um Personal Access Token (PAT) na sua conta GitHub. Vá em `Settings > Developer settings > Personal access tokens > Tokens (classic)`. Clique em "Generate new token (classic)". Dê um nome ao token, selecione a expiração e, crucialmente, marque o escopo `repo` (que concede controle total de repositórios privados e públicos). Copie o token gerado e adicione-o à sua variável de ambiente `GITHUB_TOKEN`. **Trate este token como uma senha, pois ele concede amplas permissões à sua conta.**

2.  **P: Por que usar a API do GitHub para armazenar assets em vez de um serviço como AWS S3?**
    *   **R:** Esta abordagem pode ser vantajosa para:
        *   **Custo Zero (ou Baixo):** Para repositórios públicos ou dentro dos limites de uso de repositórios privados, pode não haver custo direto de armazenamento.
        *   **Versionamento Automático:** Todo asset enviado é comitado, beneficiando-se do versionamento do Git.
        *   **Infraestrutura Existente:** Se o projeto já utiliza o GitHub extensivamente, pode simplificar o stack.
        *   **Simplicidade para Projetos Menores:** Pode ser mais simples de configurar inicialmente do que um bucket S3 com todas as suas políticas.
        No entanto, para aplicações de grande escala com alto volume de assets ou requisitos de baixa latência global, serviços dedicados como S3 (com CDN) são geralmente mais apropriados devido a rate limits, performance e funcionalidades específicas de storage.

3.  **P: Como lidar com o rate limit da API do GitHub ao usar o sistema de assets?**
    *   **R:** A API do GitHub tem [limites de taxa](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting). Para mitigar problemas:
        *   **Cache:** Implemente caching no lado do cliente ou servidor para as URLs dos assets, evitando buscar repetidamente na API do GitHub.
        *   **Otimização:** Evite operações desnecessárias na API.
        *   **Tokens Autenticados:** Requisições autenticadas com um PAT geralmente têm limites de taxa mais altos do que requisições anônimas.
        *   **Monitoramento:** Monitore o uso da API. Se os limites se tornarem um problema frequente, considere alternativas de armazenamento para casos de uso intensivo.

4.  **P: As rotas de dados (como `/projects`, `/cards`) são protegidas por autenticação?**
    *   **R:** A implementação de autenticação JWT para login/refresh está completa. No entanto, a aplicação explícita de um middleware de autenticação (`Authorization: Bearer <token>`) para proteger os endpoints de CRUD de dados não está claramente visível nos trechos de código das rotas fornecidas (`api/project.js`, `api/cardlist.js`). O arquivo `api/auth/authMiddleware.js` existe, mas seu uso não é mostrado. Recomenda-se verificar a implementação completa ou adicionar essa proteção como uma melhoria, se necessário para o seu caso de uso.

5.  **P: Como posso obter o token CSRF para fazer requisições `POST`, `PUT` ou `DELETE`?**
    *   **R:** Faça uma requisição `GET` para o endpoint `/api/v1/csrf-token`. A resposta JSON conterá o `csrfToken`. Este token deve ser incluído em um header (ex: `X-CSRF-Token`) ou no corpo da requisição para as operações que modificam dados. O servidor também espera um cookie `_csrf` que é gerenciado pelo middleware `csurf`.

6.  **P: Onde os logs do servidor são armazenados?**
    *   **R:** O logger Winston está configurado para enviar logs para o console e para o arquivo `logs/server.log` na raiz do projeto.

7.  **P: Posso usar um banco de dados diferente de SQLite ou PostgreSQL?**
    *   **R:** Sim, teoricamente. O Sequelize suporta outros SGBDs como MySQL e MSSQL. Você precisaria:
        1.  Instalar o driver apropriado (ex: `mysql2`).
        2.  Atualizar o arquivo `config/config.js` com as configurações de conexão para o novo dialeto.
        3.  Garantir que as migrações e modelos sejam compatíveis com o dialeto escolhido (geralmente são, mas podem haver pequenas diferenças de SQL).

## 📞 Contato e Suporte

Para dúvidas, reporte de bugs, sugestões de funcionalidades ou discussões sobre o "ES Data Base API Server", utilize os seguintes canais:

*   **Issues do GitHub:**
    *   Este é o canal preferencial para reportar bugs e sugerir novas funcionalidades. Por favor, verifique se já existe uma issue similar antes de criar uma nova.
    *   Acesse: [URL_DO_REPOSITORIO_AQUI/issues](URL_DO_REPOSITORIO_AQUI/issues) (Substitua `URL_DO_REPOSITORIO_AQUI` pelo link real do repositório).

*   **Apoiar o Projeto:**
    *   Você pode apoiar o desenvolvimento através do link de "Buy Me A Coffee" fornecido por `kitloong` (presente no arquivo `.github/FUNDING.yml`):
        *   [![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-kitloong-yellow.svg?style=for-the-badge&logo=buymeacoffee)](https://www.buymeacoffee.com/kitloong)

*   **Comunidade (se aplicável):**
    *   (Se o projeto tiver um fórum, servidor Discord, Slack ou lista de e-mail, liste-os aqui.)

Ao reportar um problema, por favor, forneça o máximo de detalhes possível, incluindo passos para reproduzir o erro, mensagens de erro exatas, e informações sobre o seu ambiente (versão do Node.js, sistema operacional, etc.). Isso nos ajudará a diagnosticar e resolver o problema mais rapidamente.

Agradecemos o seu interesse e feedback!

<p align="center">
  <img src="https://img.shields.io/github/stars/ESousa97/Instabytes-Front-End-Imersao-Alura-Google?style=social" alt="GitHub Stars">
  <img src="https://img.shields.io/github/forks/ESousa97/Instabytes-Front-End-Imersao-Alura-Google?style=social" alt="GitHub Forks">
</p>

<p align="center">
  <em>Desenvolvido com ❤️ por José Enoque Sousa - Revolucionando redes sociais através da democratização de conteúdo de qualidade com Inteligência Artificial</em>
</p>

> ✨ **Criado em:** 24 de fev. de 2025 às 20:41
