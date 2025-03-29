const express = require('express');
const { body } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { Project } = require('../models');
const router = express.Router();

// Validação para dados do projeto
const validateProject = [
  body('titulo').notEmpty().withMessage('Título é obrigatório'),
  body('descricao').optional().isString(),
  body('conteudo').optional().isString(),
  body('categoria').optional().isString()
];

// Listar todos os projetos
router.get('/', asyncHandler(async (req, res) => {
  const projects = await Project.findAll();
  res.status(200).json(projects);
}));

// Buscar projeto por ID
router.get('/:id', asyncHandler(async (req, res) => {
  const project = await Project.findOne({ where: { id: req.params.id } });
  if (!project) return res.status(404).json({ message: 'Projeto não encontrado' });
  res.status(200).json(project);
}));

// Criar um novo projeto
router.post('/', validateProject, asyncHandler(async (req, res) => {
  const { titulo, descricao, conteudo, categoria } = req.body;
  const newProject = await Project.create({ titulo, descricao, conteudo, categoria });
  res.status(201).json(newProject);
}));

// Atualizar projeto existente
router.put('/:id', validateProject, asyncHandler(async (req, res) => {
  const { titulo, descricao, conteudo, categoria } = req.body;
  const project = await Project.findOne({ where: { id: req.params.id } });
  if (!project) return res.status(404).json({ message: 'Projeto não encontrado' });
  await project.update({
    titulo,
    descricao,
    conteudo,
    categoria,
    data_modificacao: new Date()
  });
  res.status(200).json(project);
}));

// Deletar projeto
router.delete('/:id', asyncHandler(async (req, res) => {
  const project = await Project.findOne({ where: { id: req.params.id } });
  if (!project) return res.status(404).json({ message: 'Projeto não encontrado' });
  await project.destroy();
  res.status(200).json({ message: 'Projeto deletado com sucesso' });
}));

module.exports = router;
