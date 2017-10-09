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
exports.get_highest_score = function(req, res) {
  Highscore.find({}, function(err, highscore) {
    if (err){
      res.send(err);
    }
    let highest = highscore[0]
    for(let i=1; i < highscore.length; i++){
      if(highscore[i].score > highest.score){
        highest = highscore[i];
      }
    }
    res.json(highest);
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
