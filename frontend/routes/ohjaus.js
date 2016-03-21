var express = require('express');
var router = express.Router();
var ohjausViewModel = require('../javascript/ohjausviewmodel.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('ohjaus', ohjausViewModel);
});

module.exports = router;
