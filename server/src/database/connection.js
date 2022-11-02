const Sequelize = require('sequelize');
const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = require('../config');

const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
});

async function dbTest() {
    try {
        await db.authenticate();
        console.log('Database connection has been established successfully!');
    } catch (err) {
        console.error('Unable to connect the database ', err);
    }
}

async function dbSync() {
    await db.sync();
    console.log('Synced DB');
}

module.exports = {
    db: db,
    dbTest: dbTest,
    dbSync: dbSync
}