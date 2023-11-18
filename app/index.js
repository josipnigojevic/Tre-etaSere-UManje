const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./database'); // Import sequelize instance
const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');


app.use(express.json());

// Sync the models with the database
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Error syncing database:', err);
});

// Routes
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});