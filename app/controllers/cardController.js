const fs = require('fs');
const path = require('path');

const cardPath = path.join(__dirname, '../models/card.json');

class Card {
  constructor(id, name, description, type, number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.number = number;
    this.description = description;
  }
}

const getAllCards = () => {
  const cards = JSON.parse(fs.readFileSync(cardPath, 'utf8'));
  return cards;
};

const getCardById = (cardId) => {
  const cards = getAllCards();
  return cards.find((card) => card.id === cardId);
};

const createCard = (newCard) => {
  const cards = getAllCards();
  const cardInstance = new Card(newCard.id, newCard.name, newCard.type, newCard.number, newCard.description);
  cards.push(cardInstance);
  fs.writeFileSync(cardPath, JSON.stringify(cards, null, 2));
  return cardInstance;
};

const updateCard = (cardId, updatedCard) => {
  const cards = getAllCards();
  const index = cards.findIndex((card) => card.id === cardId);
  if (index !== -1) {
    cards[index] = { ...cards[index], ...updatedCard };
    fs.writeFileSync(cardPath, JSON.stringify(cards, null, 2));
    return cards[index];
  }
  return null;
};

const deleteCard = (cardId) => {
  const cards = getAllCards();
  const updatedCards = cards.filter((card) => card.id !== cardId);
  fs.writeFileSync(cardPath, JSON.stringify(updatedCards, null, 2));
};

module.exports = {
  Card,
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
};
