const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { login, refresh, logout } = require('./authController');

// Rate limiting middleware: limite de 10 requisições por 15 minutos por IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // máximo de 10 requisições
  message: { message: "Muitas requisições, tente novamente mais tarde." }
});

router.post('/login', authLimiter, login);
router.post('/refresh', authLimiter, refresh);
router.post('/logout', authLimiter, logout);

module.exports = router;
