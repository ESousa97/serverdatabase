const express = require('express');
const { body } = require('express-validator');
const asyncHandler = require('express-async-handler');
const rateLimit = require('express-rate-limit');
const { login, refresh, logout } = require('./authController');

const router = express.Router();

// Rate limiting middleware: 10 requisições por 15 minutos por IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Muitas requisições, tente novamente mais tarde." }
});

// Validação dos dados do login
const validateLogin = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
];

router.post('/login', authLimiter, validateLogin, asyncHandler(login));
router.post('/refresh', authLimiter, asyncHandler(refresh));
router.post('/logout', authLimiter, asyncHandler(logout));

module.exports = router;
