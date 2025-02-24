# EsDataBase

EsDataBase é uma aplicação robusta para gerenciar procedimentos e categorias, desenvolvida com **Node.js**, **Express**, e **PostgreSQL**. A aplicação está configurada para ser facilmente implantada no Vercel, utilizando **@vercel/postgres** para integração com o banco de dados e garantindo um ambiente escalável e eficiente.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução de código JavaScript no lado do servidor.
- **Express**: Framework minimalista para Node.js, facilitando a criação de APIs robustas.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenamento dos procedimentos, categorias e cards.
- **@vercel/postgres**: Integração perfeita com Vercel para gerenciar o banco de dados em um ambiente de deploy automatizado.
- **CORS**: Middleware para lidar com permissões de acesso entre domínios.
- **Vercel**: Plataforma de deploy que facilita a hospedagem da aplicação com alta escalabilidade.

## Funcionalidades

### Back-end
- **Gerenciamento de Procedimentos**: A API permite criar, ler, atualizar e deletar procedimentos.
- **Consulta por Categorias**: A API suporta a consulta de categorias e seus respectivos procedimentos.
- **Busca de Procedimentos**: O sistema inclui uma funcionalidade de busca otimizada com SQL, permitindo a pesquisa de procedimentos com base em termos fornecidos.
- **Listagem de Cards**: A aplicação também permite listar todos os "cards" associados aos procedimentos.

### Principais Endpoints

| Método | Endpoint                 | Descrição                                         |
|--------|--------------------------|---------------------------------------------------|
| GET    | `/api/cardlist`           | Retorna todos os cards                            |
| GET    | `/api/categories`         | Retorna todas as categorias e procedimentos       |
| GET    | `/api/procedure`          | Retorna um procedimento por ID                    |
| GET    | `/api/search`             | Busca procedimentos por termo                     |

### Estrutura do Banco de Dados

A aplicação utiliza PostgreSQL como banco de dados principal. A seguir estão algumas das principais queries utilizadas:

- **Buscar Procedimentos**:
  ```sql
  SELECT id, titulo, descricao FROM procedure WHERE conteudo ILIKE $1 ORDER BY similarity(conteudo, $1) DESC LIMIT 10;
  ```

- **Buscar Procedimento por ID:**
  ```sql
  SELECT * FROM procedure WHERE id = $1;
  ```

- **Listar Todas as Categorias:**
  ```sql
  SELECT DISTINCT categoria FROM procedure;
  ```

- **Listar Todos os Cards:**
  ```sql
  SELECT * FROM cards;
  ```
# Estrutura do Projeto

  ```bash
.
├── .github/                 # Diretório de arquivos de configuração do GitHub
├── api/                     # Diretório de APIs
│   ├── app.js               # Lida com a aplicação principal
│   ├── cardlist.js          # Endpoint para listar todos os cards
│   ├── categories.js        # Endpoint para listar categorias e procedimentos
│   ├── index.js             # Ponto de entrada principal
│   ├── procedure.js         # Endpoint para consulta de um procedimento específico
│   ├── search.js            # Endpoint de busca de procedimentos
├── node_modules/            # Dependências do Node.js
├── .env                     # Variáveis de ambiente (não incluído no repositório)
├── .gitignore               # Arquivo para ignorar arquivos desnecessários no Git
├── db.json                  # Definições e dados usados na aplicação (SQL, JSON, etc.)
├── LICENSE                  # Arquivo de licença do projeto
├── package-lock.json        # Arquivo de lock das dependências do Node.js
├── package.json             # Definições e dependências do projeto
├── README.md                # Arquivo de documentação principal do projeto
└── vercel.json              # Configurações de deploy no Vercel

```

# Licença

Este projeto está licenciado sob a MIT License – veja o arquivo [LICENSE](./LICENSE) para mais detalhes.


# 🚨 Projeto Descontinuado
Este projeto foi oficialmente descontinuado em 08 de outubro de 2024. Ele está sendo mantido publicamente no GitHub apenas para fins de consulta e visualização do código fonte. Não haverá atualizações futuras, suporte técnico ou correções de segurança.

**Importante:**

- Não recomendamos o uso deste código em produção, pois ele pode conter vulnerabilidades ou funcionalidades desatualizadas.

- A coleta de dados e qualquer integração com serviços externos foram desativadas.

- O uso deste código é de sua inteira responsabilidade. Para detalhes adicionais, consulte os [Termos de Uso](https://www.esdatabase.com.br/pages/terms/terms.html) e a [Política de Privacidade](https://www.esdatabase.com.br/pages/privacy/privacy.html).

---

## Front-end do Projeto

O código-fonte completo do front-end deste projeto pode ser acessado no repositório abaixo:

<p align="center">
  <a href="https://github.com/ESousa97/ESdatabase" target="_blank">
    <img alt="Front-end" src="https://img.shields.io/badge/GitHub-Front--end-green?style=for-the-badge&logo=github">
  </a>
</p>

---
