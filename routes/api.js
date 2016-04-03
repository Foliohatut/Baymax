var express = require('express');
var router = express.Router();

//var api = require('../javascript/api/api');

/*
router.get('/temperature/', function(req, res, next) {
    ///res.end(req.params('name'));
    if (typeof req.query['sensorid'] !== "undefined" && typeof req.query['temp'] !== 'undefined') {
        req.db.query("insert into Sensors(sensorid) select distinct ? from Sensors where ? not in (select sensorid from Sensors)", [req.query['sensorid'], req.query['sensorid']]);
        req.db.query("insert into temperatures (s_id, temp, date) select distinct id,?,NOW() from Sensors where sensorid=?;", [req.query['temp'], req.query['sensorid']]);
        res.end("Anturi jonka id on " + req.query['sensorid'] + " näyttää lämpötilaa " + req.query['temp']);
    } else {
        res.end("Invalid parameters!");
    }
    
});*/


router.get('/postvalues/', function(req, res, next) {
	var place = req.param('place');
	var value = req.param('value');
	req.api.insertNewValue(place, value, function(response) {
		res.json(response);
	});
	//res.end(api.insertNewValue(place, value));	
});

router.get('/insertplace/', function(req, res, next) {
	var name = req.param('name');
	req.api.insertPlace(name, function(response) {
		res.json(response);
	});
});

router.get('/getplaces/', function(req, res, next) {
	var startIndex = 0;
	var limit = 10;
	if (req.param('startIndex') !== undefined) startIndex = req.param('startIndex');
	if (req.param('limit') !== undefined) limit = req.param('limit');
	req.api.getPlaces(startIndex, limit, function(response) {
		res.json(response);
	});
});

router.get('/getvalues', function(req, res, next) {
	var limit = 10;
	var name = req.param('name');
	req.api.getValues(name, limit, function(response) {
		res.json(response);
	});
});

/*
router.get('/', function(req, res, next) {
	res.end("Tämä on api");
    //res.end("Apinaa!!");
});*/

router.get('get/', function(req, res, next) {
    
});

router.get('set/', function(req, res, next) {

});

router.use(function(req, res, next) {
	res.end("<img src='/images/404.jpg'>");
  //var err = new Error('Not Found');
  //err.status = 404;
  //next(err);
});

module.exports = router;