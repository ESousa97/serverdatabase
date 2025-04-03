import express from 'express';
import axios from 'axios';

const router = express.Router();

router.delete('/', async (req, res) => {
  const { path, type } = req.body;

  if (!path || !type) {
    return res.status(400).json({ error: 'Path e type são obrigatórios.' });
  }

  const url = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${path}`;

  try {
    // Se for pasta, buscar arquivos dentro dela
    if (type === 'dir') {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      });

      const deletePromises = data.map(async item => {
        const fileSha = item.sha;

        return axios.delete(`https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${item.path}`, {
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
    return res.status(500).json({ error: 'Erro ao deletar conteúdo', details: error.message });
  }
});

export default router;
