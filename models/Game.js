var Promise = require('bluebird');

var db = require('./db');

//30 minutes max
const MAX_PLAYTIME = 30;

var Game = function (players) {
	this.players = players || [];
	this.created = Date.now();
}

//create new game with players
Game.create = function (players) {
	return db.games.create(new Game(players));
}

Game.list = function () {
	return db.games.read();
}

//clean all games which are older than 30 minutes
Game.clean = function () {
	return Promise.map(db.games.read(), function (game) {
		if (Date.now() - game.created > (MAX_PLAYTIME * 60000)) {
			return db.games.archive(game).then(function () {
				return db.games.delete(game);
			});
        } 
        return Promise.resolve();
	})
}

module.exports = Game;