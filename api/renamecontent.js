// api/renamecontent.js
import express from 'express';
import { renameFile } from '../utils/github-client.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.put('/', async (req, res) => {
  const { oldPath, newPath } = req.body;

  if (!oldPath || !newPath) {
    return res.status(400).json({ error: 'oldPath e newPath são obrigatórios.' });
  }

  try {
    await renameFile(oldPath, newPath);
    return res.status(200).json({ message: 'Arquivo renomeado com sucesso.' });
  } catch (error) {
    logger.error('Erro ao renomear conteúdo:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return res.status(500).json({
      error: 'Erro ao renomear',
      details: error.message,
      github: error.response?.data || null,
    });
  }
});

export default router;
