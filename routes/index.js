var express = require('express');
var router = express.Router();
var indexViewModel = require('../javascript/etusivuviewmodel')

/* GET home page. */
router.get('/', function(req, res, next) {
    
  res.render('etusivu', indexViewModel);
});

module.exports = router;
