const fs = require('fs');
const path = require('path');
const { Room } = require('./roomController');
const { Player } = require('./playerController');
const shuffleArray = require('../utils/shuffleArray'); // You need to implement a shuffle function

const cardFilePath = path.join(__dirname, '../models/card.json');
const playerFilePath = path.join(__dirname, '../models/player.json');

const loadAllCards = () => {
  try {
    const cardsData = fs.readFileSync(cardFilePath, 'utf8');
    return JSON.parse(cardsData);
  } catch (error) {
    console.error('Error loading cards:', error);
    throw new Error('Failed to load cards');
  }
};

const loadAllPlayers = () => {
  try {
    const playersData = fs.readFileSync(playerFilePath, 'utf8');
    return JSON.parse(playersData);
  } catch (error) {
    console.error('Error loading players:', error);
    throw new Error('Failed to load players');
  }
};

const createGame = (playerIds) => {
  // Create a new room
  const newRoom = new Room(/* You can generate a unique ID for the room here */);

  // Get all cards
  const allCards = loadAllCards();

  // Shuffle the cards
  const shuffledCards = shuffleArray(allCards);

  // Get players by IDs from the request
  const selectedPlayers = loadAllPlayers().filter(player => playerIds.includes(player.id));

  // Assign players to the room
  newRoom.users = selectedPlayers.map(player => player.id);

  // Update player hands based on the game logic
  const updatedPlayers = selectedPlayers.map((player, index) => {
    const startingHand = shuffledCards.slice(index * 10, (index + 1) * 10);
    const currentHand = startingHand.slice(); // Copy the starting hand initially
    return {
      ...player,
      startingHand,
      currentHand,
    };
  });

  // Save updated player data back to the player.json file
  const allPlayers = loadAllPlayers();
  const finalPlayers = allPlayers.map(player =>
    updatedPlayers.find(updatedPlayer => updatedPlayer.id === player.id) || player
  );
  fs.writeFileSync(playerFilePath, JSON.stringify(finalPlayers, null, 2));

  // Return the room and updated player details
  return {
    room: newRoom,
    players: updatedPlayers.map(player => ({
      id: player.id,
      name: player.name,
      startingHand: player.startingHand,
      currentHand: player.currentHand,
    })),
  };
};

module.exports = {
  createGame,
};
