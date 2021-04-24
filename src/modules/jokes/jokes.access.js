const axios = require('axios');
const mongoose = require('mongoose');
const JokeSearchSchema = require('./schemas/joke-search.schema');

const getRandomJokes =  async obj => {
    const externalUrl = 'https://api.chucknorris.io/jokes/random';
    
    try {
        const joke = await axios.get(externalUrl);
        return joke.data;
    } catch (error) {
        throw new Error(error);
    }
};

const getJokesByCategory = async obj => {
    const jokeCategory = obj.category;
    const externalUrl = `https://api.chucknorris.io/jokes/random?category=${jokeCategory}`;
    
    try {
        const joke = await axios.get(externalUrl);
        return joke.data;
    } catch (error) {   
        throw new Error(error);
    }
};

const getJokesByFreeText = async obj => {
    const jokeQuery = obj.query;
    const externalUrl = `https://api.chucknorris.io/jokes/search?query=${jokeQuery}`;
    
    try {
        const joke = await axios.get(externalUrl);
        return joke.data;
    } catch (error) {   
        throw new Error(error);
    }
};

const saveJokeSearch = async obj => {

    try {
        const response = await JokeSearchSchema.create(obj);
        return response._id;
    } catch (error) {
        throw new Error(error);
    }
};

const getJokeSearchIdByWord = async obj => {
    const { query } = obj;

    try {
        let response = await JokeSearchSchema.findOne({ query: query }, { _id: 1 });

        if (response) {
            response = response._id;
        }
        
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

const getJokesById = async obj => {
    const { limit, page, jokeSearchId } = obj;
    const stages = [];

    stages.push({
        $match: {
            _id: mongoose.Types.ObjectId(jokeSearchId)
        }
    });

    stages.push({
        $unwind: '$results.data'
    });

    stages.push({
        $skip: limit * (page - 1)
    });

    stages.push({
        $limit: limit
    });

    stages.push({
        $group: {
            _id: '$_id',
            query: { $last: '$query' },
            total: { $last: '$results.total' },
            data: { $push: '$results.data' }
        }
    });

    try {
        const response = await JokeSearchSchema.aggregate(stages);
        return response[0];
    } catch (error) {
        throw new Error(error);
    }
};


module.exports = {    
    getJokesById,
    getRandomJokes,
    saveJokeSearch,
    getJokesByFreeText,
    getJokesByCategory,
    getJokeSearchIdByWord,
}