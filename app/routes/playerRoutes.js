const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/players', (req, res) => {
  const players = playerController.getAllPlayers();
  res.json(players);
});

router.get('/players/:id', (req, res) => {
  const playerId = parseInt(req.params.id);
  const player = playerController.getPlayerById(playerId);
  if (player) {
    res.json(player);
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});

router.post('/players', (req, res) => {
  const newPlayer = req.body;
  const player = playerController.createPlayer(newPlayer);
  res.status(201).json(player);
});

router.put('/players/:id', (req, res) => {
  const playerId = parseInt(req.params.id);
  const updatedPlayer = req.body;
  const player = playerController.updatePlayer(playerId, updatedPlayer);
  if (player) {
    res.json(player);
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});

router.delete('/players/:id', (req, res) => {
  const playerId = parseInt(req.params.id);
  playerController.deletePlayer(playerId);
  res.json({ message: 'Player deleted successfully' });
});

module.exports = router;
