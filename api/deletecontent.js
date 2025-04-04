import express from 'express';
import axios from 'axios';

const router = express.Router();

// Defina uma variável para a base dos assets; você pode configurá-la via .env se desejar
const basePath = process.env.GITHUB_ASSETS_BASE || 'public/assets';

router.delete('/', async (req, res) => {
  const { path, type } = req.body;

  if (!path || !type) {
    return res.status(400).json({ error: 'Path e type são obrigatórios.' });
  }

  // Monte a URL incluindo a base de assets para que o GitHub procure em public/assets
  const url = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${basePath}/${path}`;

  try {
    if (type === 'dir') {
      // Para diretórios, obtenha a lista de arquivos dentro da pasta
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      });

      const deletePromises = data.map(async item => {
        const fileSha = item.sha;
        return axios.delete(`https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${basePath}/${item.path}`, {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
          },
          data: {
            message: `Deletando ${item.path}`,
            sha: fileSha,
            branch: process.env.GITHUB_BRANCH,
            committer: {
              name: process.env.COMMITTER_NAME,
              email: process.env.COMMITTER_EMAIL,
            },
          },
        });
      });

      await Promise.all(deletePromises);
      return res.status(200).json({ message: 'Todos os arquivos da pasta foram deletados.' });

    } else if (type === 'file') {
      // Para arquivos, obtenha o sha do arquivo e depois delete
      const getFile = await axios.get(url, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      });

      const sha = getFile.data.sha;

      await axios.delete(url, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
        data: {
          message: `Deletando ${path}`,
          sha,
          branch: process.env.GITHUB_BRANCH,
          committer: {
            name: process.env.COMMITTER_NAME,
            email: process.env.COMMITTER_EMAIL,
          },
        },
      });

      return res.status(200).json({ message: 'Arquivo deletado com sucesso.' });
    }

  } catch (error) {
    console.error('Erro ao deletar conteúdo:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return res.status(500).json({
      error: 'Erro ao deletar conteúdo',
      details: error.message,
      github: error.response?.data || null
    });
  }
});

export default router;
