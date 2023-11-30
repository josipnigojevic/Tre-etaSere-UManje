const fs = require('fs');
const path = require('path');

const playerPath = path.join(__dirname, '../models/player.json');

class Player {
  constructor(id, name, startingHand, currentHand) {
    this.id = id;
    this.name = name;
    this.startingHand = startingHand || [];
    this.currentHand = currentHand || [];
  }
}

const getAllPlayers = () => {
  const players = JSON.parse(fs.readFileSync(playerPath, 'utf8'));
  return players;
};

const getPlayerById = (playerId) => {
  const players = getAllPlayers();
  return players.find((player) => player.id === playerId);
};

const createPlayer = (newPlayer) => {
  const players = getAllPlayers();
  const playerInstance = new Player(
    newPlayer.id,
    newPlayer.name,
    newPlayer.startingHand,
    newPlayer.currentHand
  );
  players.push(playerInstance);
  fs.writeFileSync(playerPath, JSON.stringify(players, null, 2));
  return playerInstance;
};

const updatePlayer = (playerId, updatedPlayer) => {
  const players = getAllPlayers();
  const index = players.findIndex((player) => player.id === playerId);
  if (index !== -1) {
    players[index] = { ...players[index], ...updatedPlayer };
    fs.writeFileSync(playerPath, JSON.stringify(players, null, 2));
    return players[index];
  }
  return null;
};

const deletePlayer = (playerId) => {
  const players = getAllPlayers();
  const updatedPlayers = players.filter((player) => player.id !== playerId);
  fs.writeFileSync(playerPath, JSON.stringify(updatedPlayers, null, 2));
};

module.exports = {
  Player,
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
