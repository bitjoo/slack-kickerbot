var ResponseFormatError = require('../errors/ResponseFormatError');

function listPlayers (players) {
	var result = '';
	players.forEach(function (player) {
		result += '@' + player.name + '\n';
	});
	result = result.substring(0, result.length - 1)
	return result === '' ? "--- Keine Spieler ---" : result;
}


var ResponseFormatter = function () {

}

ResponseFormatter.prototype.format = function (responseFormatFn, data) {
	if (typeof responseFormatFn !== 'function') throw new ResponseFormatError("No format function for response set.");
	return responseFormatFn(data);
}

ResponseFormatter.PLAYER_ADDED_RESPONSE = function (data) {
	return {
		'response_type': 'in_channel',
		'text': 'Folgende Spieler sind nun für das nächste Spiel *registriert*:',
		'attachements': [{
			'text': listPlayers(data)
		}]
	}
}

ResponseFormatter.PLAYER_LIST_REGISTERED = function (data) {
	return {
		'response_type': 'ephemeral',
		'text': 'Folgende Spieler sind für das nächste Spiel *registriert*:',
		'attachements': [{
			'text': listPlayers(data)
		}]
	}
}

ResponseFormatter.PLAYER_LIST_RESET = function (data) {
	return {
		'response_type': 'in_channel',
		'text': '*Spiel abgebrochen!*',
		'attachements': [{
			'text': 'Für ein neues Spiel bitte mit "/kickern +1" registrieren.',
			'color': '#D20606'
		}]
	}
}

ResponseFormatter.GAME_CREATED_RESPONSE = function (data) {
	var result = {
		'response_type': 'in_channel',
		'text': 'GOGOGO! Folgende Spieler begeben sich bitte zum Kickertisch:',
		'attachements': [{
			'text': listPlayers(data.players),
			'color': data.isGameWarning ? '#FF7F00' : '#05B305'
		}]
	};

	if (data.isGameWarning) {
		result.attachements.push({
			'text': '*Achtung!* Der Kicker könnte noch besetzt sein.\n' +
					'Das letzte Spiel startete vor ' + Math.floor((Date.now() - data.runningGame.created) / 60000) + ' Minute(n).',
			'color': '#FF7F00'
		});
	}

	return result;
}

module.exports = ResponseFormatter;