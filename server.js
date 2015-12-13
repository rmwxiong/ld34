var express = require('express');
var path = require('path');
var app = express();

var publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath))
  .get('/', function(req, res) {
    res.sendFile('index.html', {
      root: publicPath
    });
  }).listen(process.env.PORT || 8080, function(err) {
    if (err) { console.log(err); }
    console.log('Listening at localhost:8080');
  });
