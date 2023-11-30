const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deckController');

router.get('/decks', (req, res) => {
  const decks = deckController.getAllDecks();
  res.json(decks);
});

router.get('/decks/:id', (req, res) => {
  const deckId = parseInt(req.params.id);
  const deck = deckController.getDeckById(deckId);
  if (deck) {
    res.json(deck);
  } else {
    res.status(404).json({ message: 'Deck not found' });
  }
});

router.post('/decks', (req, res) => {
  const newDeck = req.body;
  const deck = deckController.createDeck(newDeck);
  res.status(201).json(deck);
});

router.put('/decks/:id', (req, res) => {
  const deckId = parseInt(req.params.id);
  const updatedDeck = req.body;
  const deck = deckController.updateDeck(deckId, updatedDeck);
  if (deck) {
    res.json(deck);
  } else {
    res.status(404).json({ message: 'Deck not found' });
  }
});

router.delete('/decks/:id', (req, res) => {
  const deckId = parseInt(req.params.id);
  deckController.deleteDeck(deckId);
  res.json({ message: 'Deck deleted successfully' });
});

module.exports = router;
