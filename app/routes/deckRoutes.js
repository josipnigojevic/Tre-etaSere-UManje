const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deckController');


router.post('/', deckController.createDeck);
router.get('/:id', deckController.getDeckById);
router.delete('/:id', deckController.deleteDeck);

module.exports = router;
