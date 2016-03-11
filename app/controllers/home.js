
/*!
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Promise = require('bluebird');

var Game = mongoose.model('Game');
var Player = mongoose.model('Player');


exports.index = function (req, res) {
  res.render('home/index', {
    title: 'Slack Kickerbot'
  });
};

exports.ping = function (req, res) {
	res.send('1');
};

exports.wipe = function (req, res) {

	Promise.join(Game.remove({}), Player.remove({}))
		   .then(function () {
		   		console.log("Wiped!");
		   		res.send("Wiped!");
		   });
}
