const expressLoader = require('./express'); 
const mongooseLoader = require('./mongoose'); 

const main = async ({ app }) => {
    await expressLoader({ app });
    console.log('Express - Initialized');

    await mongooseLoader({});
    console.log('MongoDB - Initialized');
};

module.exports = main;