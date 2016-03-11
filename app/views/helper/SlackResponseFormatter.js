var SlackResponseFormatter = function () {

}

SlackResponseFormatter.SILENT = 'silent';
SlackResponseFormatter.LOUD = 'loud';

SlackResponseFormatter.format = function (type, text, attachments) {
	return {
		'response_type': type === 'silent' ? 'ephemeral' : 'in_channel',
		'text': text,
		'attachments': attachments || []
	}
}

module.exports = SlackResponseFormatter;