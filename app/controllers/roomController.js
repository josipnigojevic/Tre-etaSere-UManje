const fs = require('fs');
const path = require('path');
const { Player } = require('./playerController');

const roomPath = path.join(__dirname, '../models/room.json');

class Room {
  constructor(id, users) {
    this.id = id;
    this.users = users || [];
  }
}

const getAllRooms = () => {
  const rooms = JSON.parse(fs.readFileSync(roomPath, 'utf8'));
  return rooms;
};

const getRoomById = (roomId) => {
  const rooms = getAllRooms();
  return rooms.find((room) => room.id === roomId);
};

const createRoom = (newRoom) => {
  const rooms = getAllRooms();
  const roomInstance = new Room(newRoom.id, newRoom.users);
  rooms.push(roomInstance);
  fs.writeFileSync(roomPath, JSON.stringify(rooms, null, 2));
  return roomInstance;
};

const updateRoom = (roomId, updatedRoom) => {
  const rooms = getAllRooms();
  const index = rooms.findIndex((room) => room.id === roomId);
  if (index !== -1) {
    rooms[index] = { ...rooms[index], ...updatedRoom };
    fs.writeFileSync(roomPath, JSON.stringify(rooms, null, 2));
    return rooms[index];
  }
  return null;
};

const deleteRoom = (roomId) => {
  const rooms = getAllRooms();
  const updatedRooms = rooms.filter((room) => room.id !== roomId);
  fs.writeFileSync(roomPath, JSON.stringify(updatedRooms, null, 2));
};

module.exports = {
  Room,
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
