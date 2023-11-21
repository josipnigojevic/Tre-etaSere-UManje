const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./database'); 
const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');
const roomRoutes = require('./routes/roomRoutes');
const deckRoutes = require('./routes/deckRoutes');

app.use(express.json());


sequelize.sync().then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Error syncing database:', err);
});

// Routes
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use('/rooms', roomRoutes);
app.use('/decks', deckRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});