# Política de Segurança

## Versões Suportadas

| Versão | Suportada          |
| ------ | ------------------ |
| 1.x.x  | :white_check_mark: |

## Reportando uma Vulnerabilidade

Se você descobrir uma vulnerabilidade de segurança, por favor siga este processo:

### ⚠️ NÃO abra uma issue pública

Vulnerabilidades de segurança não devem ser reportadas através de issues públicas do GitHub.

### 📧 Como Reportar

1. **Email**: Envie um email para o mantenedor do projeto com detalhes da vulnerabilidade
2. **Assunto**: Use o prefixo `[SECURITY]` no assunto
3. **Informações necessárias**:
   - Tipo de vulnerabilidade
   - Caminho/componente afetado
   - Passos para reproduzir
   - Impacto potencial
   - Sugestões de correção (se houver)

### 📋 Modelo de Reporte

```
[SECURITY] Título breve da vulnerabilidade

## Descrição
Descreva a vulnerabilidade encontrada.

## Tipo
[ ] Injeção (SQL, NoSQL, OS Command, etc.)
[ ] Autenticação/Autorização
[ ] Cross-Site Scripting (XSS)
[ ] Cross-Site Request Forgery (CSRF)
[ ] Exposição de dados sensíveis
[ ] Configuração insegura
[ ] Dependência vulnerável
[ ] Outro: _______

## Reprodução
Passos detalhados para reproduzir:
1.
2.
3.

## Impacto
Qual o impacto potencial desta vulnerabilidade?

## Evidências
(Logs, screenshots, etc. - sem incluir dados sensíveis reais)

## Sugestão de Correção
(Se aplicável)
```

### ⏱️ Tempo de Resposta

- **Confirmação de recebimento**: 48 horas
- **Avaliação inicial**: 7 dias
- **Correção**: Depende da severidade
  - Crítico: 24-48 horas
  - Alto: 7 dias
  - Médio: 30 dias
  - Baixo: Próxima release

### 🏆 Reconhecimento

Reconhecemos e agradecemos pesquisadores de segurança responsáveis. Com sua permissão, creditaremos você no CHANGELOG e/ou README após a correção ser publicada.

## Práticas de Segurança do Projeto

### Autenticação

- JWT com expiração curta (15 minutos)
- Refresh tokens em httpOnly cookies
- Senhas hasheadas com bcrypt (salt rounds: 10)
- Rate limiting em rotas de autenticação

### Proteções Implementadas

- **Helmet.js**: Headers de segurança HTTP
- **CORS**: Configuração restritiva de origins
- **Rate Limiting**: Proteção contra brute force
- **Input Validation**: express-validator em todas as rotas
- **SQL Injection**: Sequelize ORM com queries parametrizadas

### Configurações Recomendadas

```env
# Produção
NODE_ENV=production
JWT_SECRET=[mínimo 32 caracteres aleatórios]
JWT_REFRESH_SECRET=[mínimo 32 caracteres aleatórios]
```

### Dependências

- Utilizamos apenas dependências com manutenção ativa
- Dependabot configurado para atualizações automáticas
- Auditoria regular com `npm audit`

## Atualizações de Segurança

Atualizações de segurança são lançadas como patch versions (ex: 1.0.x) e anunciadas no CHANGELOG.

---

Agradecemos sua ajuda em manter este projeto seguro!
