// config/config.js
import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    dialect: 'sqlite',
    storage: process.env.SQLITE_STORAGE || './database.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:'
  },
  production: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

export default config;
