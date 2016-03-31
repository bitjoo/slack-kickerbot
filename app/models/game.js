/*!
 * Module dependencies
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlayerSchema = require(__dirname + '/player.js');

/**
 * Game schema
 */

var GameSchema = new Schema({
  players: {type: [PlayerSchema], default: []},
  _playersCount: {type: Number, default: 0}
}, {
	timestamps: true
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

GameSchema.method({
	playersToString: function (separator) {
		return this.players.reduce(function (prev, curr, index) {
			return (index === 0 ? '' : prev) + separator + '@' + curr.name;
		}, this.players[0]) || '';
	},
	addPlayer: function (player) {
		this.players.push(player);
		this._playersCount = this._playersCount += 1;
		return this.saveAsync();
	},
	removePlayer: function (player) {
		var playerFound = this.players.filter(function (p) {
	    	return player.playerId === p.playerId;
		}).pop();
		if (playerFound) {
			this.players.pull(playerFound);
			this._playersCount = this._playersCount -= 1;
		}
		return this.saveAsync().then(function () { return playerFound; });
	}
});

/**
 * Statics
 */

GameSchema.static({
	findIdleGameByPlayer: function (player) {
		return this.model('Game').findOne({})
								 .where('players').elemMatch({playerId: player.playerId})
								 .where('_playersCount').lt(4);
	}
});

/**
 * Register
 */

mongoose.model('Game', GameSchema);

module.exports = GameSchema;
