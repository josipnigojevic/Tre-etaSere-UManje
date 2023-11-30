const express = require('express');
const cardRoutes = require('./routes/cardRoutes');
const playerRoutes = require('./routes/playerRoutes');
const deckRoutes = require('./routes/deckRoutes');
const roomRoutes = require('./routes/roomRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', cardRoutes);
app.use('/api', playerRoutes);
app.use('/api', deckRoutes);
app.use('/api', roomRoutes);
app.use('/api', gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
