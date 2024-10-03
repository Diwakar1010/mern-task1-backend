const express = require('express');
const { getWord , getSearchedWords,searchWords} = require('../controllers/vocabularyController');
const router = express.Router();


router.get('/words', getSearchedWords);

router.get('/search', searchWords);
// Route to get word
router.get('/:word', getWord);



module.exports = router;
