// api/cardlist.js
import express from 'express';
import asyncHandler from 'express-async-handler';
import { body } from 'express-validator';
import db from '../models/index.js';
import { validate } from '../middleware/validate.js';
import logger from '../utils/logger.js';

const { Card } = db;
const router = express.Router();

// Validação para dados do card
const validateCard = [
  body('titulo').notEmpty().withMessage('Título é obrigatório'),
  body('descricao').optional().isString(),
  body('imageurl').optional().isString(),
  validate,
];

// Listar todos os cards
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const cards = await Card.findAll();
    res.status(200).json(cards);
  })
);

// Buscar um card por ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const card = await Card.findOne({ where: { id } });

    if (!card) {
      return res.status(404).json({ message: 'Card não encontrado' });
    }

    res.status(200).json(card);
  })
);

// Criar um novo card
router.post(
  '/',
  validateCard,
  asyncHandler(async (req, res) => {
    const { titulo, descricao, imageurl } = req.body;
    const newCard = await Card.create({ titulo, descricao, imageurl });
    logger.info(`Card criado: ${newCard.id}`);
    res.status(201).json(newCard);
  })
);

// Atualizar um card existente
router.put(
  '/:id',
  validateCard,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, imageurl } = req.body;
    const card = await Card.findOne({ where: { id } });

    if (!card) {
      return res.status(404).json({ message: 'Card não encontrado' });
    }

    await card.update({
      titulo,
      descricao,
      imageurl,
      data_modificacao: new Date(),
    });

    logger.info(`Card atualizado: ${id}`);
    res.status(200).json(card);
  })
);

// Deletar um card
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const card = await Card.findOne({ where: { id } });

    if (!card) {
      return res.status(404).json({ message: 'Card não encontrado' });
    }

    await card.destroy();
    logger.info(`Card deletado: ${id}`);
    res.status(200).json({ message: 'Card deletado com sucesso' });
  })
);

export default router;
