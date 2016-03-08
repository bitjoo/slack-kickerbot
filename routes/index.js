var express = require('express');
var router = express.Router();

var redirect = require('./redirect');
var handler = require('./handler');

router.get('/', handler.index);
router.get('/health', handler.health);

router.post('/kicker', redirect);

router.post('/kicker/list', handler.list);

router.post('/kicker/add', handler.add);

router.post('/kicker/reset', handler.reset);

module.exports = router;