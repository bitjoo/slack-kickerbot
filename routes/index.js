var express = require('express');
var router = express.Router();

var redirect = require('./redirect');
var handler = require('./handler');

router.get('/', handler.index);
router.get('/health', handler.health);

router.get('/kicker', redirect);

router.get('/kicker/list', handler.list);

router.get('/kicker/add', handler.add);

router.get('/kicker/reset', handler.reset);

module.exports = router;