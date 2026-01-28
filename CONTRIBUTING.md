# Contribuindo para ES Data Base API

Obrigado por considerar contribuir para o ES Data Base API! Este documento fornece as diretrizes para contribuição.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Relatando Bugs](#relatando-bugs)
- [Sugerindo Funcionalidades](#sugerindo-funcionalidades)

## Código de Conduta

Este projeto segue nosso [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você concorda em manter esse código.

## Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub, então:
git clone https://github.com/seu-usuario/serverdatabase.git
cd serverdatabase
git remote add upstream https://github.com/ESousa97/serverdatabase.git
```

### 2. Configure o Ambiente

```bash
# Instale dependências
npm install

# Copie variáveis de ambiente
cp .env.example .env

# Execute o servidor
npm run dev
```

### 3. Crie uma Branch

```bash
# Atualize main
git checkout main
git pull upstream main

# Crie sua branch
git checkout -b tipo/descricao-curta

# Exemplos:
git checkout -b feat/add-user-roles
git checkout -b fix/auth-token-expiry
git checkout -b docs/update-api-docs
```

### Tipos de Branch

| Prefixo     | Uso                   |
| ----------- | --------------------- |
| `feat/`     | Nova funcionalidade   |
| `fix/`      | Correção de bug       |
| `docs/`     | Documentação          |
| `refactor/` | Refatoração de código |
| `test/`     | Testes                |
| `chore/`    | Tarefas de manutenção |

## Padrões de Código

### Estilo de Código

Este projeto usa ESLint e Prettier. Execute antes de commitar:

```bash
npm run lint:fix
npm run format
```

### Convenções

- **ES Modules**: Use `import/export` (não `require/module.exports`)
- **Async/Await**: Prefira sobre callbacks e `.then()`
- **Nomes descritivos**: Variáveis e funções com nomes claros
- **Comentários**: Documente lógica complexa
- **Logs**: Use o logger centralizado, não `console.log`

### Exemplo de Código

```javascript
// ✅ Bom
import express from 'express';
import logger from '../utils/logger.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll();
    logger.info(`Listed ${items.length} items`);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default router;
```

### Commits (Conventional Commits)

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição curta

[corpo opcional]

[rodapé opcional]
```

**Tipos permitidos:**

| Tipo       | Descrição                      |
| ---------- | ------------------------------ |
| `feat`     | Nova funcionalidade            |
| `fix`      | Correção de bug                |
| `docs`     | Documentação                   |
| `style`    | Formatação (não altera código) |
| `refactor` | Refatoração                    |
| `test`     | Testes                         |
| `chore`    | Manutenção                     |

**Exemplos:**

```bash
feat(auth): add refresh token rotation
fix(projects): handle empty category filter
docs(readme): update installation instructions
refactor(api): centralize error handling
```

## Processo de Pull Request

### 1. Antes de Abrir PR

- [ ] Código segue os padrões do projeto
- [ ] Testes passam (`npm test`)
- [ ] Lint passa (`npm run lint`)
- [ ] Documentação atualizada se necessário
- [ ] Commits seguem Conventional Commits

### 2. Descrição do PR

Use o template de PR fornecido e inclua:

- Descrição clara das mudanças
- Tipo de mudança (feat, fix, etc.)
- Como testar
- Screenshots se aplicável

### 3. Revisão

- Mantenha o PR focado em uma única mudança
- Responda feedback construtivamente
- Faça squash de commits se solicitado

## Relatando Bugs

Use o template de issue para bugs e inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir**
3. **Comportamento esperado** vs **atual**
4. **Ambiente** (Node.js version, OS, etc.)
5. **Logs de erro** se disponíveis

## Sugerindo Funcionalidades

Antes de sugerir:

1. Verifique se não existe issue similar
2. Considere se está alinhado com o propósito do projeto

Ao criar issue:

1. Descreva o problema que resolve
2. Proponha a solução desejada
3. Liste alternativas consideradas

## 🙏 Agradecimentos

Agradecemos todas as contribuições, grandes ou pequenas!

---

Dúvidas? Abra uma issue ou entre em contato.
