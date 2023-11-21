const Deck = require('../models/deck');
const Card = require('../models/card'); 

// Fisher-Yates 
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};


const createDeck = async (req, res) => {
    try {
 
        const cardIds = (await Card.findAll({ limit: 40 })).map((card) => card.id);

      
        const shuffledCardIds = shuffleArray(cardIds);


        const deck = await Deck.create({ cardIds: shuffledCardIds });

        res.status(201).json(deck);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getDeckById = async (req, res) => {
    const { id } = req.params;

    try {

        const deck = await Deck.findByPk(id);

        if (!deck) {
            return res.status(404).json({ message: 'Deck not found' });
        }

        res.json(deck);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDeck = async (req, res) => {
    const { id } = req.params;

    try {

        const deck = await Deck.findByPk(id);
        if (!deck) {
            return res.status(404).json({ message: 'Deck not found' });
        }

        await deck.destroy();

        res.json({ message: 'Deck deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDeck,
    getDeckById,
    deleteDeck,
};
