const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/games', (req, res) => {
  const playerIds = req.body.playerIds;

  if (!playerIds || playerIds.length !== 4) {
    return res.status(400).json({ message: 'Invalid player IDs. You need exactly 4 players for a game.' });
  }

  try {
    const gameResult = gameController.createGame(playerIds);
    res.status(201).json(gameResult);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
