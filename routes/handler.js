var Promise = require('bluebird');

var Game = require('../models/Game');
var Player = require('../models/Player');
var ResponseFormatter = require('../helper/ResponseFormatter');

var rf = new ResponseFormatter();

module.exports = {
	add: function addFn (req, res, next) {
		Player.create(new Player(req.query.user_name)).then(function(player) {
			return Player.list();
		}).then(function(players) {
			if (players.length === 4) {
				return Game.create(players).tap(function(){
					return Player.clean();
				}).then(function() {
					return Game.list();
				}).then(function (games) {
					var gameWarning = games.length > 1;
					res.json(rf.format(ResponseFormatter.GAME_CREATED_RESPONSE, {
						players: games[games.length - 1].players,
						isWarning: gameWarning,
						runningGame: gameWarning ? games[games.length - 2] : null
					}));
				});
			} else {
				res.json(rf.format(ResponseFormatter.PLAYER_ADDED_RESPONSE, players));
			}
		}).catch(function(e) {
			next(e)
		});
	},

	list: function listFn (req, res, next) {
	    Player.list().then(function(players) {
	    	res.json(rf.format(ResponseFormatter.PLAYER_LIST_REGISTERED, players));
    	}).catch(function (e) {
    		next(e)
    	});
	},

	reset: function resetFn (req, res, next) {
		Player.clean().then(function(player) {
			res.json(rf.format(ResponseFormatter.PLAYER_LIST_RESET));
		}).catch(function (e) {
			next(e)
		});
	},
	index: function indexFn (req, res, next) {
		res.send("Kickerbot ♥ U");
	},
	health: function healthFn (req, res, next) {
		res.send(200, "1");
	}
}