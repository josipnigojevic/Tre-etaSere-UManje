const Card = require('../models/card');


const getAllCards = async (req, res) => {
    try {
        const cards = await Card.findAll();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCardById = async (req, res) => {
    const { id } = req.params;

    try {
        const card = await Card.findByPk(id);

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCard = async (req, res) => {
    const { title, description, category } = req.body;

    try {
        const newCard = await Card.create({ title, description, category });
        res.status(201).json(newCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCard = async (req, res) => {
    const { id } = req.params;
    const { title, description, category } = req.body;

    try {
        const card = await Card.findByPk(id);

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        card.title = title;
        card.description = description;
        card.category = category;
        await card.save();

        res.json(card);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCard = async (req, res) => {
    const { id } = req.params;

    try {
        const card = await Card.findByPk(id);

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        await card.destroy();

        res.json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard,
};
