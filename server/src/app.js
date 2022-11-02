const express = require('express');
const cors = require('cors');
const { auth, invoices } = require('./api');
const ErrorHandler = require('./utils/error-handler');

module.exports = async (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));

    app.get('/', (req, res) => {
        res.send('Hello');
    });

    auth(app);
    invoices(app);

    app.use(ErrorHandler);
}

