var mongoose = require('mongoose');
var config = require('config');

var Formatter = require('../app/views/helper/SlackResponseFormatter');

var Game = mongoose.model('Game');
var Player = mongoose.model('Player');

module.exports = {
	authToken: function (req, res, next) {
		if (~config.slack.tokens.indexOf(req.body.token)) {
			next();
		} else {
			res.json(Formatter.format(Formatter.SILENT, 'Token is invalid.'));
		}
	},

	authWipeToken: function (req, res, next) {
		if (config.wipe.token === req.body.wipeToken) {
			next();
		} else {
			res.json(Formatter.format(Formatter.SILENT, 'Token is invalid.'));
		}
	},

	loadGame: function (req, res, next) {
		Game.findOne({})
		    .where('_playersCount').lt(4)
			.then(function (game) {
				return game || Game.create({});
			})
			.then(function (game) {
				//save game to request object
				req.game = game;
				next();
			})
			.catch(function (err) {
				next(err);
			});
	},

	authPlayer: function (req, res, next) {
		Game.findIdleGameByPlayer(new Player({playerId: req.body.user_id}))
				.then(function (game) {
					if (game) {
						next();
					} else {
						res.json(Formatter.format(Formatter.SILENT, 'Leider bist Du nicht registriert und darfst diesen Befehl nicht ausführen.'));
					}
				});
	}
}