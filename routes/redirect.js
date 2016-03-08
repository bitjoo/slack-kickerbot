const routeMap = {
    '+1': '/kicker/add',
    'list': '/kicker/list',
    'reset': '/kicker/reset'
}


module.exports = function (req, res) {
	if (req.body.text) {
		res.redirect(307, routeMap[req.body.text]);
	} else {
		throw new Error('The Command "' + req.body.text + '" is unknown.');
	}
};
