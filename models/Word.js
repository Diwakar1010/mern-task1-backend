const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true, unique:true },
  meaning: { type: String, required: true },
  phonetic: { type: String },
  examples: [{ type: String }],
  dateAdded: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Word', wordSchema);
