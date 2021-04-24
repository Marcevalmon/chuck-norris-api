const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;

const main = async ({ app }) => {

    const connectToDatabase = () => {
        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Connected to database');
        });
    }

    mongoose.connection.on('disconnected', () => {
        setTimeout(connectToDatabase, 5000);
    });

    connectToDatabase();
};

module.exports = main;