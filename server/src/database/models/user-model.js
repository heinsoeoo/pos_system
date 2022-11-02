const Sequelize = require('sequelize');

module.exports = (db) => {
    const user = db.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });

    return user;
}