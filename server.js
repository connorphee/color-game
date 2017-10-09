var cors = require('cors');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Highscore = require('./api/models/highscoreModel.js'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Highscoredb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


var routes = require('./api/routes/highscoreRoutes.js'); //importing route
routes(app); //register the route


app.listen(port);

console.log('highscore database server started on port: ' + port);
