const routeMap = {
    '+1': '/kicker/add',
    'list': '/kicker/list',
    'reset': '/kicker/reset'
}


module.exports = function (req, res) {
	if (req.query.text) {
		res.redirect(307, routeMap[req.query.text]);
	} else {
		throw new Error('The Command "' + req.query.text + '" is unknown.');
	}
};
