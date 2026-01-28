// api/deletecontent.js
import express from 'express';
import { getFileInfo, deleteFile, listDirectoryContent } from '../utils/github-client.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.delete('/', async (req, res) => {
  const { path, type } = req.body;

  if (!path || !type) {
    return res.status(400).json({ error: 'Path e type são obrigatórios.' });
  }

  try {
    if (type === 'dir') {
      // Para diretórios, obtenha a lista de arquivos e delete cada um
      const items = await listDirectoryContent(path);

      const deletePromises = items.map(async (item) => {
        return deleteFile({
          path: item.path.replace(/^public\/assets\//, ''),
          sha: item.sha,
          message: `Deletando ${item.name}`,
        });
      });

      await Promise.all(deletePromises);
      return res.status(200).json({ message: 'Todos os arquivos da pasta foram deletados.' });
    } else if (type === 'file') {
      // Para arquivos, obtenha o SHA e delete
      const fileInfo = await getFileInfo(path);

      await deleteFile({
        path,
        sha: fileInfo.sha,
        message: `Deletando ${path}`,
      });

      return res.status(200).json({ message: 'Arquivo deletado com sucesso.' });
    }

    return res.status(400).json({ error: 'Tipo inválido. Use "file" ou "dir".' });
  } catch (error) {
    logger.error('Erro ao deletar conteúdo:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return res.status(500).json({
      error: 'Erro ao deletar conteúdo',
      details: error.message,
      github: error.response?.data || null,
    });
  }
});

export default router;
