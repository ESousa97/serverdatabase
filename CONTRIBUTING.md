# Contributing to ES Database API

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/ESousa97/serverdatabase/issues)
2. If not, create a new issue using the bug report template
3. Include:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (Node.js version, OS)
   - Relevant logs or screenshots

### Suggesting Features

1. Check existing issues and discussions for similar suggestions
2. Open a new issue using the feature request template
3. Describe the problem your feature would solve
4. Propose your solution and alternatives considered

### Pull Requests

1. Fork the repository
2. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following our coding standards
4. Write or update tests as needed
5. Run the test suite:
   ```bash
   npm test
   npm run lint
   ```
6. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve issue with X"
   git commit -m "docs: update README"
   ```
7. Push to your fork and submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/serverdatabase.git
cd serverdatabase

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run migrations
npm run db:migrate

# Start development server
npm run dev
```

## Coding Standards

- Use ES6+ features (ES Modules)
- Follow existing code style (enforced by ESLint and Prettier)
- Write meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Running Quality Checks

```bash
# Lint code
npm run lint

# Fix lint issues
npm run lint:fix

# Format code
npm run format

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, semicolons)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:

```
feat: add user profile endpoint
fix: resolve authentication token expiry issue
docs: update API documentation
refactor: simplify error handling middleware
```

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Update documentation if needed
- Ensure all tests pass
- Request review from maintainers
- Be responsive to feedback

## Questions?

Open a [discussion](https://github.com/ESousa97/serverdatabase/discussions) or reach out to the maintainers.

Thank you for contributing!
