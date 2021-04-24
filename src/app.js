require('dotenv').config();

const loaders = require('./loaders');
const express = require('express');
const { SERVER_PORT, SERVER_URL } = process.env;
const app = express();

const startServer = async () => {

    await loaders({ app });

    app.listen(SERVER_PORT, SERVER_URL, () => {
        console.log(`Server running on ${ SERVER_URL }:${ SERVER_PORT }`);
    });
};

startServer();