const jokeServices = require('./jokes.services');

const randomJoke = async (req, res) => {

    try {
        const { joke } = await jokeServices.getRandomJokes();
        return res.status(200).send({
            data: joke
        });
    } catch (error) {
        console.log('ERROR: algo paso');
        console.log(error);
        return res.status(500).send({
            error
        });
    }
};

const jokeByCategory = async (req, res) => {
    const data = {
        params: req.params
    };

    try {
        const { joke } = await jokeServices.getJokesByCategory(data);

        return res.status(200).send({
            data: joke
        });
    } catch (error) {
        console.log('ERROR: algo paso');
        console.log(error);
        return res.status(500).send({
            error
        });
    }
};

const searchJoke = async (req, res) => {

    const data = {
        query: req.query
    };

    try {
        const { jokes } = await jokeServices.searchJokeByWord(data);

        return res.status(200).send({
            data: jokes
        });
    } catch (error) {
        console.log('ERROR: algo paso');
        console.log(error);
        return res.status(500).send({
            error
        });
    }
};

module.exports = {
    randomJoke,
    jokeByCategory,
    searchJoke,
}