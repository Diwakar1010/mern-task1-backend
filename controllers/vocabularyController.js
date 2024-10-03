const axios = require('axios');
const Word = require('../models/Word');

const oxfordApi = axios.create({
  baseURL: 'https://od-api-sandbox.oxforddictionaries.com/api/v2',
  headers: {
    app_id: "bc5ba979",
    app_key: "0fe89ac90a66bbd4c7f96ebe33dec2d8",
  },
});

exports.getWord = async (req, res) => {
  
  try {
    const { word } = req.params;

    // Check if the word is cached in the database
    const cachedWord = await Word.findOne({ word });
    if (cachedWord) {
      return res.json(cachedWord);
    }
    
    // Fetch from Oxford API
    const oxfordResponse = await oxfordApi.get(`/entries/en-us/${word}`)
    // .then((res)=>{console.log("res", res)}).catch((err)=>{console.log("wrrr",err,"errrrrr")});
    const result = oxfordResponse.data.results[0];
    const definition = result.lexicalEntries[0].entries[0].senses[0].definitions[0];
    const phonetic = result.lexicalEntries[0].entries[0].pronunciations[0].phoneticSpelling;

    
    // Cache the word in MongoDB
    const newWord = new Word({
      word,
      meaning: definition,
      phonetic,
    });
    await newWord.save();

    res.json(newWord);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch word ghg' });
  }
};

exports.searchWords = async (req, res) => {
  try {
    const { searchQuery } = req.query; // Extract the search query

    // Perform a case-insensitive search using a regular expression
    const words = await Word.find({
      word: { $regex: searchQuery, $options: 'i' }, // 'i' for case-insensitive
    });

    // Return matching words
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search words' });
  }
};



exports.getSearchedWords = async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve words' });
  }
};