var express = require('express');
var router = express.Router();

router.get('/temperature/', function(req, res, next) {
    ///res.end(req.params('name'));
    if (typeof req.query['sensorid'] !== "undefined" && typeof req.query['temp'] !== 'undefined') {
        req.db.query("insert into Sensors(sensorid) select distinct ? from Sensors where ? not in (select sensorid from Sensors)", [req.query['sensorid'], req.query['sensorid']]);
        req.db.query("insert into temperatures (s_id, temp, date) select distinct id,?,NOW() from Sensors where sensorid=?;", [req.query['temp'], req.query['sensorid']]);
        res.end("Anturi jonka id on " + req.query['sensorid'] + " näyttää lämpötilaa " + req.query['temp']);
    } else {
        res.end("Invalid parameters!");
    }
    
});

router.get('/', function(req, res, next) {
    req.db.query('select * from Sensors', function(err, rows, fields) {
        res.json(rows);
    });
    //res.end("Apinaa!!");
});

router.get('get/', function(req, res, next) {
    
});

router.get('set/', function(req, res, next) {

});

module.exports = router;