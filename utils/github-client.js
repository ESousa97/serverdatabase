// utils/github-client.js
// Cliente centralizado para interações com a API do GitHub

import axios from 'axios';
import logger from './logger.js';

/**
 * Cliente HTTP configurado para a API do GitHub
 */
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
  },
});

// Interceptor para adicionar token de autenticação
githubApi.interceptors.request.use((config) => {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `token ${token}`;
  }
  return config;
});

// Interceptor para logging de erros
githubApi.interceptors.response.use(
  (response) => response,
  (error) => {
    logger.error('GitHub API Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

/**
 * Configuração padrão do repositório
 */
const getRepoConfig = () => ({
  repo: process.env.GITHUB_REPO,
  branch: process.env.GITHUB_BRANCH || 'main',
  basePath: process.env.GITHUB_ASSETS_BASE || 'public/assets',
  uploadPath: process.env.GITHUB_UPLOAD_PATH || 'public/assets',
  committer: {
    name: process.env.COMMITTER_NAME || 'API Bot',
    email: process.env.COMMITTER_EMAIL || 'bot@api.local',
  },
});

/**
 * Lista diretórios em um caminho
 * @param {string} path - Caminho dentro do repositório
 * @returns {Promise<string[]>} Lista de nomes de diretórios
 */
export const listDirectories = async (path = '') => {
  const config = getRepoConfig();
  const fullPath = path ? `${config.basePath}/${path}` : config.basePath;
  const url = `/repos/${config.repo}/contents/${fullPath}`;

  const response = await githubApi.get(url, {
    params: { ref: config.branch },
  });

  return response.data.filter((item) => item.type === 'dir').map((item) => item.name);
};

/**
 * Lista conteúdo de um diretório
 * @param {string} directory - Nome do diretório
 * @returns {Promise<Array>} Lista de itens do diretório
 */
export const listDirectoryContent = async (directory) => {
  const config = getRepoConfig();
  const url = `/repos/${config.repo}/contents/${config.basePath}/${directory}`;

  try {
    const response = await githubApi.get(url, {
      params: { ref: config.branch },
    });

    return response.data.map((item) => ({
      name: item.name,
      path: item.path,
      type: item.type,
      download_url: item.download_url,
      sha: item.sha,
    }));
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

/**
 * Obtém informações de um arquivo
 * @param {string} filePath - Caminho do arquivo
 * @returns {Promise<Object>} Informações do arquivo incluindo SHA
 */
export const getFileInfo = async (filePath) => {
  const config = getRepoConfig();
  const fullPath = `${config.basePath}/${filePath}`;
  const url = `/repos/${config.repo}/contents/${fullPath}`;

  const response = await githubApi.get(url, {
    params: { ref: config.branch },
  });

  return response.data;
};

/**
 * Cria ou atualiza um arquivo
 * @param {Object} options - Opções de upload
 * @param {string} options.path - Caminho do arquivo
 * @param {string} options.content - Conteúdo em base64
 * @param {string} options.message - Mensagem do commit
 * @param {string} [options.sha] - SHA do arquivo existente (para atualização)
 * @returns {Promise<Object>} Resposta da API
 */
export const createOrUpdateFile = async ({ path, content, message, sha }) => {
  const config = getRepoConfig();
  const fullPath = `${config.uploadPath}/${path}`;
  const url = `/repos/${config.repo}/contents/${fullPath}`;

  const payload = {
    message,
    content,
    branch: config.branch,
    committer: config.committer,
  };

  if (sha) {
    payload.sha = sha;
  }

  const response = await githubApi.put(url, payload);
  return response.data;
};

/**
 * Deleta um arquivo
 * @param {Object} options - Opções de deleção
 * @param {string} options.path - Caminho do arquivo
 * @param {string} options.sha - SHA do arquivo
 * @param {string} options.message - Mensagem do commit
 * @returns {Promise<void>}
 */
export const deleteFile = async ({ path, sha, message }) => {
  const config = getRepoConfig();
  const fullPath = `${config.basePath}/${path}`;
  const url = `/repos/${config.repo}/contents/${fullPath}`;

  await githubApi.delete(url, {
    data: {
      message,
      sha,
      branch: config.branch,
      committer: config.committer,
    },
  });
};

/**
 * Cria um diretório (via arquivo .gitkeep)
 * @param {string} name - Nome do diretório
 * @returns {Promise<Object>} Resposta da API
 */
export const createDirectory = async (name) => {
  const filePath = `${name}/.gitkeep`;
  const content = Buffer.from('').toString('base64');

  return createOrUpdateFile({
    path: filePath,
    content,
    message: `Criando diretório ${name} com arquivo placeholder`,
  });
};

/**
 * Renomeia um arquivo (copia para novo local e deleta original)
 * @param {string} oldPath - Caminho original
 * @param {string} newPath - Novo caminho
 * @returns {Promise<void>}
 */
export const renameFile = async (oldPath, newPath) => {
  // Obter arquivo original
  const fileInfo = await getFileInfo(oldPath);

  // Criar no novo local
  await createOrUpdateFile({
    path: newPath,
    content: fileInfo.content,
    message: `Renomeando arquivo de ${oldPath} para ${newPath}`,
  });

  // Deletar original
  await deleteFile({
    path: oldPath,
    sha: fileInfo.sha,
    message: `Removendo arquivo antigo após renomeação: ${oldPath}`,
  });
};

export default {
  listDirectories,
  listDirectoryContent,
  getFileInfo,
  createOrUpdateFile,
  deleteFile,
  createDirectory,
  renameFile,
};
