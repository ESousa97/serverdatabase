# ES Database API

[![CI](https://github.com/ESousa97/serverdatabase/actions/workflows/ci.yml/badge.svg)](https://github.com/ESousa97/serverdatabase/actions/workflows/ci.yml)
[![Security](https://github.com/ESousa97/serverdatabase/actions/workflows/security.yml/badge.svg)](https://github.com/ESousa97/serverdatabase/actions/workflows/security.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/ESousa97/serverdatabase/badge)](https://www.codefactor.io/repository/github/ESousa97/serverdatabase)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)

A production-ready REST API server for managing projects, cards, users, and digital assets with JWT authentication and GitHub integration for file storage.

## Features

- **RESTful API** - Full CRUD operations for projects, cards, and users
- **JWT Authentication** - Secure access with refresh tokens
- **CSRF Protection** - Double-submit cookie pattern using `csrf-csrf`
- **File Management** - Upload and manage files via GitHub API
- **Swagger Documentation** - Interactive API docs at `/api-docs`
- **Database Flexibility** - SQLite for development, PostgreSQL for production
- **Security Hardened** - Helmet, rate limiting, input validation

## Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/ESousa97/serverdatabase.git
cd serverdatabase

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

The API will be available at `http://localhost:8000`

## Configuration

Create a `.env` file based on `.env.example`:

```env
# Server
NODE_ENV=development
PORT=8000

# Database (SQLite for dev, PostgreSQL for prod)
DB_DIALECT=sqlite

# Authentication
JWT_SECRET=your-secure-secret
JWT_REFRESH_SECRET=your-refresh-secret

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# GitHub Integration (optional)
GITHUB_REPO=username/repository
GITHUB_TOKEN=ghp_your_token
```

## API Endpoints

| Method         | Endpoint               | Description          |
| -------------- | ---------------------- | -------------------- |
| GET            | `/api/v1/ping`         | Health check         |
| GET            | `/api/v1/csrf-token`   | Get CSRF token       |
| POST           | `/api/v1/auth/login`   | User login           |
| POST           | `/api/v1/auth/refresh` | Refresh token        |
| POST           | `/api/v1/auth/logout`  | User logout          |
| GET/POST       | `/api/v1/projects`     | List/Create projects |
| GET/PUT/DELETE | `/api/v1/projects/:id` | Project operations   |
| GET/POST       | `/api/v1/cards`        | List/Create cards    |
| GET/PUT/DELETE | `/api/v1/cards/:id`    | Card operations      |
| GET            | `/api/v1/categories`   | List categories      |
| GET            | `/api/v1/search`       | Search               |
| POST           | `/api/v1/imageupload`  | Upload image         |

Full documentation available at `/api-docs` when the server is running.

## Scripts

```bash
npm start          # Start production server
npm run dev        # Start with file watching
npm test           # Run tests
npm run test:coverage  # Run tests with coverage
npm run lint       # Run ESLint
npm run lint:fix   # Fix lint errors
npm run format     # Format code with Prettier
npm run db:migrate # Run database migrations
npm run db:seed    # Seed database
```

## Project Structure

```
serverdatabase/
├── api/                    # Route handlers
│   ├── auth/               # Authentication routes
│   ├── index.js            # Express app entry point
│   ├── cardlist.js         # Cards CRUD
│   ├── project.js          # Projects CRUD
│   └── ...                 # Other routes
├── config/                 # Configuration files
├── migrations/             # Sequelize migrations
├── models/                 # Sequelize models
├── seeders/                # Database seeders
├── services/               # Business logic
├── tests/                  # Test files
├── utils/                  # Utility functions
└── package.json
```

## Security

- JWT authentication with refresh tokens
- CSRF protection (double-submit cookie pattern)
- Rate limiting on authentication endpoints
- Helmet security headers
- Input validation with express-validator
- SQL injection protection via Sequelize ORM

Report security vulnerabilities via [SECURITY.md](SECURITY.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Author

**ESousa97** - [GitHub](https://github.com/ESousa97)
