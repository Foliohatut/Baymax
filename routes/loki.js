var express = require('express');
var router = express.Router();
var lokiViewModel = require('../javascript/lokiviewmodel')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('loki', lokiViewModel);
});

module.exports = router;
