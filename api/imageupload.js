// api/imageupload.js
import express from 'express';
import multer from 'multer';
import { getFileInfo, createOrUpdateFile } from '../utils/github-client.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Configura o multer para armazenar o arquivo na memória
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB máximo
  },
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { directory, overwrite } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const dir = directory || 'default';
    const filePath = `${dir}/${file.originalname}`;
    const contentBase64 = file.buffer.toString('base64');
    const shouldOverwrite = overwrite === 'true' || overwrite === true;

    let sha = null;

    try {
      const existingFile = await getFileInfo(filePath);
      sha = existingFile.sha;

      // Se o arquivo já existe e overwrite for false → impedir o upload
      if (!shouldOverwrite) {
        return res.status(409).json({
          error: 'Arquivo já existe e overwrite está desabilitado.',
          existingFile: existingFile.download_url,
        });
      }
    } catch (error) {
      // Se o arquivo não existe (404), seguimos normalmente (sem SHA)
      if (error.response?.status !== 404) {
        throw error;
      }
    }

    const message = sha
      ? `Atualizando arquivo ${file.originalname}`
      : `Adicionando arquivo ${file.originalname}`;

    const result = await createOrUpdateFile({
      path: filePath,
      content: contentBase64,
      message,
      sha,
    });

    res.status(200).json({
      message: sha ? 'Arquivo atualizado com sucesso' : 'Arquivo criado com sucesso',
      imageUrl: result.content.download_url,
    });
  } catch (error) {
    logger.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro no upload', details: error.message });
  }
});

export default router;
