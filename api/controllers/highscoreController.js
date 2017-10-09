'use strict';


var mongoose = require('mongoose'),
  Highscore = mongoose.model('Highscores');

exports.list_all_highscores = function(req, res) {
  Highscore.find({}, function(err, highscore) {
    if (err)
      res.send(err);
    res.json(highscore);
  });
};




exports.create_a_highscore = function(req, res) {
  var new_highscore = new Highscore(req.body);
  new_highscore.save(function(err, highscore) {
    if (err)
      res.send(err);
    res.json(highscore);
  });
};


exports.read_a_highscore = function(req, res) {
  Highscore.findById(req.params.highscoreId, function(err, highscore) {
    if (err)
      res.send(err);
    res.json(highscore);
  });
};


exports.update_a_highscore = function(req, res) {
  Highscore.findOneAndUpdate({_id: req.params.highscoreId}, req.body, {new: true}, function(err, highscore) {
    if (err)
      res.send(err);
    res.json(highscore);
  });
};


exports.delete_a_highscore = function(req, res) {


  Highscore.remove({
    _id: req.params.highscoreId
  }, function(err, highscore) {
    if (err)
      res.send(err);
    res.json({ message: 'highscore successfully deleted' });
  });
};
