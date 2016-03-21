var express = require('express');
var router = express.Router();
//var copy = require('../javascript/copyright.js');
var etusivuViewModel = require('../javascript/etusivuviewmodel.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    /*req.db.connect(function(err) {
        if (err) {
            //res.end("abcdefghijklmnopqrstuvxyz");
            req.db.query('select * from testi', function(err, rows) {
               if (err) {
                   console.log("Query failed");
               } else {
                   console.log("Query success");
                   res.json(rows);
                   //res.end(rows[0]);
               }
            });

        } else {
            res.end("Connection failde");
        }
    });*/
  res.render('etusivu', etusivuViewModel);
});

module.exports = router;
