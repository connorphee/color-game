'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HighscoreSchema = new Schema({
  name: {
    type: String,
    required: 'Enter your name!'
  },
  score: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Highscores', HighscoreSchema);
