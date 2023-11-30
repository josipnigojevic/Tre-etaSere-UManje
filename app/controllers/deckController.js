const fs = require('fs');
const path = require('path');
const { Card } = require('./cardController');

const deckPath = path.join(__dirname, '../models/deck.json');

class Deck {
  constructor(id, cards) {
    this.id = id;
    this.cards = cards || [];
  }
}

const getAllDecks = () => {
  const decks = JSON.parse(fs.readFileSync(deckPath, 'utf8'));
  return decks;
};

const getDeckById = (deckId) => {
  const decks = getAllDecks();
  return decks.find((deck) => deck.id === deckId);
};

const createDeck = (newDeck) => {
  const decks = getAllDecks();
  const deckInstance = new Deck(newDeck.id, newDeck.cards);
  decks.push(deckInstance);
  fs.writeFileSync(deckPath, JSON.stringify(decks, null, 2));
  return deckInstance;
};

const updateDeck = (deckId, updatedDeck) => {
  const decks = getAllDecks();
  const index = decks.findIndex((deck) => deck.id === deckId);
  if (index !== -1) {
    decks[index] = { ...decks[index], ...updatedDeck };
    fs.writeFileSync(deckPath, JSON.stringify(decks, null, 2));
    return decks[index];
  }
  return null;
};

const deleteDeck = (deckId) => {
  const decks = getAllDecks();
  const updatedDecks = decks.filter((deck) => deck.id !== deckId);
  fs.writeFileSync(deckPath, JSON.stringify(updatedDecks, null, 2));
};

module.exports = {
  Deck,
  getAllDecks,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck,
};
