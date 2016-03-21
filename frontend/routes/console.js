var express = require('express');
var router = express.Router();
var consoleViewModel = require('../javascript/consoleviewmodel.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('console', consoleViewModel);
});

module.exports = router;
