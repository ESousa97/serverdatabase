// api/auth/authRoutes.js
import express from 'express';
import { body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import rateLimit from 'express-rate-limit';
import { login, refresh, logout } from './authController.js';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Muitas requisições, tente novamente mais tarde.' },
});

const validateLogin = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
];

router.post('/login', authLimiter, validateLogin, asyncHandler(login));
router.post('/refresh', authLimiter, asyncHandler(refresh));
router.post('/logout', authLimiter, asyncHandler(logout));

export default router;
