require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    APP_SECRET: process.env.APP_SECRET,

    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD
}