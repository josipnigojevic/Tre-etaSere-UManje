const sequelize = require('./app/database'); 
const users = require('./app/models/user'); 
const cards = require('./app/models/card');
const rooms = require('./app/models/room');
const deck = require('./app/models/deck');

async function syncDatabase() {
    try {
        
        await sequelize.sync({ force: true });
        await users.sync({force:true});
        await cards.sync({force:true});
        await rooms.sync({force:true});
        await deck.sync({force:true});

        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    } finally {
        
        await sequelize.close();
    }
}


syncDatabase();
