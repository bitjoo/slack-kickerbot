var Promise = require('bluebird');

var db = require('./db');

var Player = function (name) {
	this.slot = 0;
	this.name = name || "";
}

Player.create = function (player) {
	return db.players.create(player);
}

Player.list = function () {
	return db.players.read();
}

Player.clean = function () {
	return db.players.delete();
}

module.exports = Player;
