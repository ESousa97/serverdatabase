// /api/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

// Usuário dummy para demonstração
const dummyUser = { id: 1, email: 'test@test.com', password: 'password123' };

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === dummyUser.email && password === dummyUser.password) {
    const accessToken = jwt.sign(
      { userId: dummyUser.id, email: dummyUser.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    const refreshToken = jwt.sign(
      { userId: dummyUser.id, email: dummyUser.email },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );
    return res.json({ accessToken, refreshToken });
  } else {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

router.post('/logout', (req, res) => {
  // Com JWT, o logout é feito no lado do cliente.
  // Em produção, considere implementar uma blacklist de tokens.
  return res.json({ message: 'Logout realizado com sucesso' });
});

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token não fornecido' });
  }
  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);
    const newAccessToken = jwt.sign(
      { userId: payload.userId, email: payload.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Erro ao validar refresh token:', error);
    return res.status(401).json({ message: 'Refresh token inválido' });
  }
});

module.exports = router;
