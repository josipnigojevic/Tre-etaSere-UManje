const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/cards', (req, res) => {
  const cards = cardController.getAllCards();
  res.json(cards);
});

router.get('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cardController.getCardById(cardId);
  if (card) {
    res.json(card);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});

router.post('/cards', (req, res) => {
  const newCard = req.body;
  const card = cardController.createCard(newCard);
  res.status(201).json(card);
});

router.put('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const updatedCard = req.body;
  const card = cardController.updateCard(cardId, updatedCard);
  if (card) {
    res.json(card);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});

router.delete('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  cardController.deleteCard(cardId);
  res.json({ message: 'Card deleted successfully' });
});

module.exports = router;
