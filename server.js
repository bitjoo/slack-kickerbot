
/**
 * Module dependencies
 */

var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var Promise = require('bluebird');

Promise.promisifyAll(mongoose);

var config = require('config');

var app = express();
var port = process.env.NODE_PORT || process.env.PORT || 3000;
var host = process.env.NODE_IP || 'localhost';


// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('connected', () => console.log('MongoDB connected: ' + config.db));
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap application settings
require('./config/express')(app);

// Bootstrap routes
require('./config/routes')(app);

app.listen(config.server.port, config.server.host);
console.log('Express app started on port ' + config.server.port + ' (' + process.env.NODE_ENV + ')');
