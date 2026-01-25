# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | :white_check_mark: |
| < 1.1   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **Do NOT** open a public issue
2. Email the maintainers directly or use GitHub's private vulnerability reporting
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days
- **Resolution Timeline**: Depends on severity
  - Critical: 24-72 hours
  - High: 1-2 weeks
  - Medium/Low: Next release cycle

### Security Measures in Place

This project implements several security measures:

- **Authentication**: JWT with access and refresh tokens
- **CSRF Protection**: Double-submit cookie pattern via `csrf-csrf`
- **Rate Limiting**: Applied to authentication endpoints
- **Input Validation**: Using `express-validator`
- **Security Headers**: Via Helmet.js
- **SQL Injection Prevention**: Parameterized queries via Sequelize ORM
- **Dependency Scanning**: Automated via Dependabot and npm audit

### Security Best Practices for Deployment

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong, unique secrets for JWT
   - Rotate secrets periodically

2. **Database**
   - Use PostgreSQL in production
   - Enable SSL for database connections
   - Use least-privilege database users

3. **HTTPS**
   - Always use HTTPS in production
   - Configure proper SSL/TLS certificates

4. **CORS**
   - Restrict `CORS_ORIGINS` to known domains
   - Never use wildcard in production

5. **Updates**
   - Keep dependencies up to date
   - Monitor security advisories

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who report valid vulnerabilities.
