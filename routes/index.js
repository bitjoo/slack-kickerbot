var express = require('express');
var router = express.Router();

var redirect = require('./redirect');
var handler = require('./handler');

router.post('/kicker', redirect);

router.post('/list', handler.list);

router.post('/add', handler.add);

router.post('/reset', handler.reset);

module.exports = router;