const Sequelize = require('sequelize');

module.exports = (db) => {
    const invoice = db.define('invoices', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: Sequelize.STRING,
            allowNull: false
        },
        customer_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sale_person: {
            type: Sequelize.STRING,
            allowNull: false
        },
        notes: {
            type: Sequelize.STRING,
            allowNull: true
        },
        products: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        paid: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return invoice;
}