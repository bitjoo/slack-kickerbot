
/*!
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Formatter = require('../views/helper/SlackResponseFormatter');

var Game = mongoose.model('Game');
var Player = mongoose.model('Player');


const routeMap = {
    '+1': '/kicker/add',
    '-1': '/kicker/remove',
    'list': '/kicker/list',
    'reset': '/kicker/reset'
    //'help': '/kicker/help'
}

exports.redirect = function (req, res) {
	var routePath = routeMap[req.body.text];
  	if (routePath) {
		res.redirect(307, routePath);
	} else {
		res.json(Formatter.format(Formatter.SILENT, 'Der Befehl "' + req.body.text + '" ist mir unbekannt.'));
	}
}

exports.list = function (req, res) {
	var game = req.game,
		playersString = game.playersToString('\n'),
		responseText = playersString.length ? 'Folgende Spieler sind schon auf der Warteliste:' : '-- Keine Spieler auf der Warteliste --',
		responseAttachements = playersString.length ? [{'text': playersString}] : [];

	res.json(Formatter.format(Formatter.SILENT, responseText, responseAttachements));
}

exports.add = function (req, res, next) {
	var game = req.game,
		newPlayer = new Player({name: req.body.user_name, playerId: req.body.user_id});

	Game.findIdleGameByPlayer(newPlayer)
		.then(function (gameWithPlayer) {
			if (gameWithPlayer) {
				res.json(Formatter.format(Formatter.SILENT, 'Du stehst schon auf der Warteliste.'));
			} else {
				//Add Player to player list
				return game.addPlayer(newPlayer)
						.then(function (game) {
							var newPlayer = game.players[game.players.length - 1],
								promiseColl = [];
								
							// add the new Player to the promiseCollection
							promiseColl.push(newPlayer);

							if (game._playersCount === 4) {
								// if there are 4 players, add current game to promiseCollection
								promiseColl.push(game);
								console.log()
								promiseColl.push(
									//find game which is updated the last 30 Minutes but is not the current one.
									Game.find({})
									    .where('updatedAt').gte(new Date(Date.now() - 1800000))
									    .where('_id').ne(game._id)
							    );
							}

							return promiseColl;
						})
						.spread(function (newPlayer, game, games) {
							var responseText = '',
								responseAttachements = [],
								isWarning = games && games.length > 0;

							if (game) {
								console.log(JSON.stringify(game));
								responseText += 'GOGOGO! Folgende Spieler begeben sich bitte zum Kickertisch:';
								responseAttachements.push({'text': game.playersToString('\n'), color: isWarning ? '#FF7F00' : '#05B305'});
							} else {
								responseText += 'Ich habe ' + newPlayer.name + ' auf die Warteliste gesetzt.';
							}

							if (isWarning) {
								responseAttachements.push({'text': 'Achtung! Es könnte noch ein Spiel laufen!', color: '#FF7F00'});
					   		}

					   		res.json(Formatter.format(Formatter.LOUD, responseText, responseAttachements));
						})
						
			}
		})
		.catch(function (err) {
			next(err);
		});
}

exports.remove = function (req, res, next) {
	var game = req.game;
	    player = new Player({playerId: req.body.user_id});

	game.removePlayer(player)
		.then(function (player) {
			res.json(Formatter.format(Formatter.LOUD, 'Ich habe ' + player.name + ' von der Warteliste entfernt.'));
		})    
		.catch(function(err) {
			next(err);
		});
}

exports.reset = function (req, res, next) {
	var game = req.game,
		playersString = game.playersToString('\n');
	game.players = [];
	game._playersCount = 0;
	game.saveAsync()
		.then(function (game) {
			var responseText = 'Ich habe folgende Spieler von der Warteliste entfernt:',
				responseAttachements = [{'text': playersString}];
			res.json(Formatter.format(Formatter.LOUD, responseText, responseAttachements));
		})
		.catch(function (err) {
			next(err);
		});
}