
/**
 * Module dependencies.
 */

function getMongoDBPath (options) {
  var path = 'mongodb://';
  if (options) {
    if (options.username && options.password) {
      path += options.username + ':' + options.password + '@';
    }

    path += options.host;

    if (options.port) {
      path += ':' + options.port;
    }

    path += '/' + options.database;
  }

  return path;
}

var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var test = require('./env/test');
var production = require('./env/production');

var defaults = {
  root: path.normalize(__dirname + '/..'),
  db: getMongoDBPath({
    username: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
    password: process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
    host: process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost',
    port: process.env.OPENSHIFT_MONGODB_DB_PORT,
    database: process.env.OPENSHIFT_APP_NAME || 'kickerbot'
  })
};


/**
 * Expose
 */

module.exports = {
  development: extend(development, defaults),
  test: extend(test, defaults),
  production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];
