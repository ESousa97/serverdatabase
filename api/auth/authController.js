// api/auth/authController.js
import * as authService from '../../services/authService.js';
import logger from '../../utils/logger.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.login(email, password);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ accessToken });
  } catch (err) {
    logger.error(`Erro no login: ${err.message}`);
    res.status(err.message === 'Credenciais inválidas' ? 401 : 500)
       .json({ message: err.message === 'Credenciais inválidas' ? 'Credenciais inválidas' : 'Erro interno no servidor' });
  }
};

export const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);
    const newAccessToken = await authService.refresh(token);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.sendStatus(403);
  }
};

export const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logout realizado com sucesso' });
};
