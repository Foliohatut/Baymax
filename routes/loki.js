var express = require('express');
var router = express.Router();
var lokiViewModel = require('../javascript/lokiviewmodel.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('loki', lokiViewModel);
});

router.get('/chart', function(req, res, next) {
	  req.query['type']
});

module.exports = router;
