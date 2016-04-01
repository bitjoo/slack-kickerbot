
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

/**
 *  Middlewares
 */
var middleware = require('./middlewares');

/**
 *  Controllers
 */
var home = require('home');
var kicker = require('kicker');

/**
 * Expose
 */

module.exports = function (app) {

  app.get('/', home.index);

  app.get('/health', home.ping);

  app.post('/wipe', middleware.authWipeToken, home.wipe);

  app.post('/kicker', middleware.authToken, kicker.redirect);

  app.post('/kicker/list', middleware.authToken, middleware.loadGame, kicker.list);

  app.post('/kicker/add', middleware.authToken, middleware.loadGame, kicker.add);

  app.post('/kicker/remove', middleware.authToken, middleware.loadGame, middleware.authPlayer, kicker.remove);

  app.post('/kicker/reset', middleware.authToken, middleware.loadGame, middleware.authPlayer, kicker.reset);

  app.post('/kicker/help', middleware.authToken, kicker.help);

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);
    // error page
    //res.status(500).render('500', { error: err.stack });
    res.status(500).send('500. Internal server error.');
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).send('404. Not found.');
    /*res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });*/
  });
};
