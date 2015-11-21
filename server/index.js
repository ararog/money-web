var path = require('path');
var fs = require('fs');
var express = require('express');
var webpack = require('webpack');
var config = require('../webpack.config');

var compiler = webpack(config);

var html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');

module.exports = function(options) {

  var app = express();

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get("/*", function(req, res) {
    res.contentType = "text/html; charset=utf8";
    res.end(html)
  });

  app.listen(3000, 'localhost', function(err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Listening at http://localhost:3000');
  });};
