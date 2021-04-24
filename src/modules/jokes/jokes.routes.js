const { randomJoke, jokeByCategory, searchJoke } = require('./jokes.controllers'); 
const { Router } = require('express');
const router = Router();

router.get('/random', randomJoke);
router.get('/category/:category', jokeByCategory);
router.get('/search', searchJoke);

module.exports = router;