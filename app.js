require( './db' );

var express = require('express');
var app = express();
var routes = require('./routes');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use('/', routes);

['public'].forEach(function (dir) {
  app.use('/' + dir, express.static('./' + dir));
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
