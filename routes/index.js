var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.db.connect(function(err) {
        if (err) {
            //res.end("abcdefghijklmnopqrstuvxyz");
            req.db.query('select * from testi', function(err, rows) {
               if (err) {
                   console.log("Query failed");
               } else {
                   console.log("Query success");
                   //res.json(rows);
                   res.json(rows);
               }
            });

        } else {

        }
    });
    
  //res.render('etusivu', { title: 'Baymax -- etusivu' });
});

module.exports = router;
