const Room = require('../models/room');


const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRoomById = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await Room.findByPk(id);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createRoom = async (req, res) => {
    const { name, capacity, players } = req.body;

    try {
        const newRoom = await Room.create({ name, capacity, players });
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateRoom = async (req, res) => {
    const { id } = req.params;
    const { name, capacity, players } = req.body;

    try {
        const room = await Room.findByPk(id);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        room.name = name;
        room.capacity = capacity;
        room.players = players; 
        await room.save();

        res.json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await Room.findByPk(id);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        await room.destroy();

        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
};
