const TOKENS = [
		'XDKtHO4TNNyLGct9kXc5VeQr',
		'0KEBAWnAGSlzGvwwrwg4nZsR'
	];


module.exports = function (req, res, next) {
    if (TOKENS.indexOf(req.body.token) < 0) {
        res.send(403, 'Token.');
    } else {
        next();
    }
};
