var Promise = require('bluebird');

var db = {
	games: {
		_: [],
		_bak: [],
		create: Promise.method(function (game) {
			db.games._.push(game);
			return game;
		}),
		read: Promise.method(function () {
			return db.games._.slice();
		}),
		delete: Promise.method(function (game) {
			if (!game) return db.games._ = [];
			var index = db.games._.indexOf(game);
			if (index > -1) {
				db.games._.splice(db.games._, 1);
			}
			return game;
		}),
		archive: Promise.method(function (game) {
			db.players._bak.push(game);
		})
	},
	players: {
		_: [],
		create: Promise.method(function (player) {
			db.players._.push(player);
			player.slot = db.players._.length;
			return player;
		}),
		read: Promise.method(function () {
			return db.players._.slice();
		}),
		delete: Promise.method(function (player) {
			if (!player) return db.players._ = [];
			var index = db.players._.indexOf(player);
			if (index > -1) {
				db.players._.splice(db.players._, 1);
			}
			return player;
		})
	}
}

module.exports = db;