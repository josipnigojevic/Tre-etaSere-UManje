const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/rooms', (req, res) => {
  const rooms = roomController.getAllRooms();
  res.json(rooms);
});

router.get('/rooms/:id', (req, res) => {
  const roomId = parseInt(req.params.id);
  const room = roomController.getRoomById(roomId);
  if (room) {
    res.json(room);
  } else {
    res.status(404).json({ message: 'Room not found' });
  }
});

router.post('/rooms', (req, res) => {
  const newRoom = req.body;
  const room = roomController.createRoom(newRoom);
  res.status(201).json(room);
});

router.put('/rooms/:id', (req, res) => {
  const roomId = parseInt(req.params.id);
  const updatedRoom = req.body;
  const room = roomController.updateRoom(roomId, updatedRoom);
  if (room) {
    res.json(room);
  } else {
    res.status(404).json({ message: 'Room not found' });
  }
});

router.delete('/rooms/:id', (req, res) => {
  const roomId = parseInt(req.params.id);
  roomController.deleteRoom(roomId);
  res.json({ message: 'Room deleted successfully' });
});

module.exports = router;
