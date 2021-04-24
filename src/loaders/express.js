const cors = require('cors');
const express = require('express');

const jokesRoutes = require('./../modules/jokes/jokes.routes');

const main = async ({ app }) => {

    console.log(__dirname);
    
    app.use(express.static(`${__dirname}/../public`));
    
    app.use(express.urlencoded({ extended: false }));
    
    app.use(express.json());
    
    app.use(cors());

    app.use('/api/jokes', jokesRoutes);
};

module.exports = main;