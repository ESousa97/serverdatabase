// api/create-directory.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name } = req.body; // name: nome do diretório que você quer criar
  if (!name) {
    return res.status(400).json({ error: 'Nome do diretório é obrigatório.' });
  }

  // Caminho onde o diretório deve ser criado (no seu caso, dentro de public/assets)
  const uploadPath = process.env.GITHUB_UPLOAD_PATH || 'public/assets';
  // O diretório será criado com um arquivo placeholder ".gitkeep"
  const filePath = `${uploadPath}/${name}/.gitkeep`;

  // Conteúdo vazio em base64 (um arquivo vazio)
  const contentBase64 = Buffer.from('').toString('base64');

  const url = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${filePath}`;
  const payload = {
    message: `Criando diretório ${name} com arquivo placeholder`,
    committer: {
      name: process.env.COMMITTER_NAME,
      email: process.env.COMMITTER_EMAIL,
    },
    content: contentBase64,
    branch: process.env.GITHUB_BRANCH,
  };

  try {
    const response = await axios.put(url, payload, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });
    return res.status(200).json({ message: `Diretório ${name} criado com sucesso.`, details: response.data });
  } catch (error) {
    console.error('Erro ao criar diretório:', error.message);
    return res.status(500).json({ error: 'Erro ao criar diretório', details: error.message });
  }
});

export default router;
