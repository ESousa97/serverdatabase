# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-25

### Added
- ESLint configuration with security plugin
- Prettier for code formatting
- Vitest for unit testing
- GitHub Actions CI/CD workflows
- Security scanning workflow with CodeQL
- Dependabot configuration
- Issue and PR templates
- CONTRIBUTING.md guidelines
- CODE_OF_CONDUCT.md
- SECURITY.md policy
- `.editorconfig` for consistent formatting
- `.env.example` template

### Changed
- Replaced deprecated `csurf` with `csrf-csrf` library
- Updated Express to 4.21.2 (security fixes)
- Updated Axios to 1.7.9 (security fixes)
- Updated express-validator to v7
- Updated Sentry SDK to v8
- Updated swagger-ui-express to v5
- Improved README.md with concise documentation
- Refactored CORS configuration with environment variables
- Improved error handling middleware

### Removed
- `next-connect` (unused dependency)
- `redis` (unused dependency)
- Deprecated `csurf` package

### Security
- Fixed 17+ npm audit vulnerabilities
- Added security headers via Helmet
- Implemented rate limiting on auth endpoints
- Added input validation on all endpoints

## [1.0.0] - 2025-03-18

### Added
- Initial release
- Express.js REST API server
- Sequelize ORM with SQLite/PostgreSQL support
- JWT authentication with refresh tokens
- CRUD operations for Projects and Cards
- User authentication system
- GitHub integration for file uploads
- Swagger API documentation
- Winston logging
- Sentry error monitoring
- Docker support
- Database migrations and seeders
