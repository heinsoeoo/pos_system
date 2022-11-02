const express = require('express');
const { PORT }  = require('./config');
const expressApp = require('./app');
const { dbTest, dbSync } = require('./database/connection');

const StartServer = async() => {
    const app = express();

    await expressApp(app);

    app.listen(PORT, () => {
        dbTest();
        dbSync();
        console.log(`server is listening to port: ${PORT}`);
    })
}

StartServer();