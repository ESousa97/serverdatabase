// api/cardlist.js
import express from 'express';
import db from '../models/index.js';
const { Card } = db;

const router = express.Router();

// Listar todos os cards
router.get('/', async (req, res) => {
  try {
    const cards = await Card.findAll();
    res.status(200).json(cards);
  } catch (error) {
    console.error('Erro ao listar cards:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
});

// Buscar um card por ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const card = await Card.findOne({ where: { id } });
    if (!card) return res.status(404).json({ message: 'Card não encontrado' });
    res.status(200).json(card);
  } catch (error) {
    console.error('Erro ao buscar card:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
});

// Criar um novo card
router.post('/', async (req, res) => {
  try {
    const { titulo, descricao, imageurl } = req.body;
    const newCard = await Card.create({ titulo, descricao, imageurl });
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Erro ao criar card:', error);
    res.status(500).json({ message: 'Erro ao criar card', error: error.message });
  }
});

// Atualizar um card existente
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, descricao, imageurl } = req.body;
    const card = await Card.findOne({ where: { id } });
    if (!card) return res.status(404).json({ message: 'Card não encontrado' });
    
    await card.update({
      titulo,
      descricao,
      imageurl,
      data_modificacao: new Date() // Atualiza a data de modificação
    });
    
    res.status(200).json(card);
  } catch (error) {
    console.error('Erro ao atualizar card:', error);
    res.status(500).json({ message: 'Erro ao atualizar card', error: error.message });
  }
});

// Deletar um card
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const card = await Card.findOne({ where: { id } });
    if (!card) return res.status(404).json({ message: 'Card não encontrado' });
    
    await card.destroy();
    res.status(200).json({ message: 'Card deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar card:', error);
    res.status(500).json({ message: 'Erro ao deletar card', error: error.message });
  }
});

export default router;
