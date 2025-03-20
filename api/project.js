// /api/project.js
const express = require('express');
const router = express.Router();
const { Project } = require('../models');

// Listar todos os projetos
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Erro ao listar projetos:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
});

// Buscar um projeto por ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findOne({ where: { id } });
    if (!project) return res.status(404).json({ message: 'Projeto não encontrado' });
    res.status(200).json(project);
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
});

// Criar um novo projeto
router.post('/', async (req, res) => {
  try {
    const { titulo, descricao, conteudo, categoria } = req.body;
    const newProject = await Project.create({ titulo, descricao, conteudo, categoria });
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    res.status(500).json({ message: 'Erro ao criar projeto', error: error.message });
  }
});

// Atualizar um projeto existente
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, descricao, conteudo, categoria } = req.body;
    const project = await Project.findOne({ where: { id } });
    if (!project) return res.status(404).json({ message: 'Projeto não encontrado' });
    
    await project.update({
      titulo,
      descricao,
      conteudo,
      categoria,
      data_modificacao: new Date() // Atualiza a data de modificação
    });
    res.status(200).json(project);
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    res.status(500).json({ message: 'Erro ao atualizar projeto', error: error.message });
  }
});

// Deletar um projeto
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findOne({ where: { id } });
    if (!project) return res.status(404).json({ message: 'Projeto não encontrado' });
    
    await project.destroy();
    res.status(200).json({ message: 'Projeto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    res.status(500).json({ message: 'Erro ao deletar projeto', error: error.message });
  }
});

module.exports = router;
