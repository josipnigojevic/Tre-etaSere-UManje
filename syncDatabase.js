// syncDatabase.js

const sequelize = require('./app/database'); // Adjust the path if needed
const users = require('./app/models/user'); // Adjust the path if needed
const cards = require('./app/models/card');

async function syncDatabase() {
    try {
        // Sync the models with the database
        await sequelize.sync({ force: true });
        await users.sync({force:true});
        await cards.sync({force:true});

        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    } finally {
        // Close the database connection
        await sequelize.close();
    }
}

// Run the syncDatabase function
syncDatabase();
