const jokesAccess = require('./jokes.access');

const getRandomJokes = async data => {
    try {
        const joke = await jokesAccess.getRandomJokes();
        return { joke };
    } catch (error) {
        throw new Error(error);
    }
};

const getJokesByCategory = async data => {
    const obj = {
        category: data.category
    };

    try {
        const joke = await jokesAccess.getJokesByCategory(obj);
        return { joke };
    } catch (error) {
        throw new Error(error);
    }
};

const searchJokeByWord = async data => {

    const { query = '', limit = 10, page = 1 } = data.query;

    try {
        let jokeSearchId = await jokesAccess.getJokeSearchIdByWord({ query });

        if (!jokeSearchId) {

            const jokes = await jokesAccess.getJokesByFreeText({ query });
            const resultsData = {
                query,
                results: {
                    total: jokes.total,
                    data: jokes.result,
                }
            };

            jokeSearchId = await jokesAccess.saveJokeSearch(resultsData);
        }

        const obj = {
            jokeSearchId,
            limit: parseInt(limit),
            page: parseInt(page)
        };

        const jokes = await jokesAccess.getJokesById(obj);

        return { jokes };
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getRandomJokes,
    getJokesByCategory,
    searchJokeByWord,
}