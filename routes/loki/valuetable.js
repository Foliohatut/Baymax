var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var name = req.param('name');
	req.api.getValues(name, 5, function(response) {
		res.render('valuetable', response);
	});	
});


module.exports = router;