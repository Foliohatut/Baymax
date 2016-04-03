

var db = require('mysql');
var connection = db.createConnection({
   host     : 'localhost',
   user     : 'baymax',
   database : 'baymax',
});

connection.connect(function(err) {

});



exports.insertNewValue = function(place, value, callback) {
	var response = new Object();
	connection.query('select count(id) as maara from places where id = ?', [place], function(err, rows, fields) {
		if (rows[0].maara > 0) {
			response.place_exists = true;
		} else {
			response.place_exists = false;
			response.insert_success = false;
		}
		callback(response);
	});
	
};

exports.getPlaces = function(startIndex, limit, callback) {
	var response = new Object();
	connection.query('select id, name from places where id > ? limit ?', [startIndex, limit], function(err, rows, fields) {
		if (!err) {
			response.get_places_query_success = true;
			response.places = rows;
			callback(response);		
		} else {
			response.get_places_query_success = false;
			callback(response);
		}
	});
}

exports.getValues = function(name, limit, callback) {
	var response = new Object();
	if (name !== undefined) {
        response.name_parameter_set = true;
		connection.query('select places.name, valuess.value, valuess.date from valuess left join places on valuess.place = places.id where places.name = ? order by date limit ?', [name, limit], function(err, rows, fields) {
            if (!err) {
            	response.value_select_query_success = true;  
				response.values = rows;
				callback(response);
            } else {
                response.value_select_query_success = false;
				callback(response);
            }
		});
	} else {
        response.name_parameter_set = false;
		callback(response);
    }
}

exports.insertPlace = function(name, callback) {
	if (name !== undefined) {
		response.name_parameters_exists = true;
		connection.query('select count(id) as maara from places where name = ?', [name], function(err, rows, fields) {
			if (!err) {
				response.place_exists_query_success = true;
				if (rows[0].maara > 0) {
					response.place_exists = true;
					callback(response);
				} else {
					response.place_exists = false;
					response.insert_success = false;
					connection.query('insert into places(name) values(?)',[name], function(err, rows2, fields) {
						if (err) {
							response.place_insert_query_success = false;
						} else {
							response.place_insert_query_success = true;
						}
						callback(response);
					});
				}
			} else {
				response.place_exists_query_success = false;
				callback(response);
			}
		});

		
	} else {
		response.name_parameters_exists = false;
		callback(response);
	}
}

exports.getValueDetailName = function(id, callback) {
	var response = {};
	if (id !== undefined) {
		response.id_is_set = true;
		connection.query('select distinct name from value_details where id = ?', [id], function(err, rows, fields) {
			if (!err) {
				response.query_success = true;
				if (rows.length > 0) {
					response.name_exits = true;
					response.name = rows[0].name;
					callback(response);
				} else {
					response.name_exits = false;
				}

			} else {
				response.query_success = false;
				callback(response);
			}
		});
	} else {
		response.id_is_set = false;
		callback(response);
	}
}


// getothervalues

exports.getOtherValues = function(startIndex, limit, callback) {
	var response = {};
	var startIndexCurrent = 0;
	var limitCurrent = 10;
	if (startIndex !== undefined) startIndexCurrent = startIndex;
	if (limit !== undefined) limitCurrent = limit;
	connection.query('select vd.name, ov.value, av.date from other_values ov left join all_values av on ov.valueid = av.id left join value_details vd on av.value_details = vd.id order by av.date limit ?, ?', [startIndexCurrent, limitCurrent], function(err, rows, fields) {
		if (!err) {
			response.query_success = true;
			response.values = rows;
			callback(response);
		} else {
			response.query_success = false;
			callback(response);
		}
	});
}

exports.getOtherValuesByName = function(name, startIndex, limit, callback) {
	var response = {};
	var startIndexCurrent = 0;
	var limitCurrent = 10;
	if (startIndex !== undefined) startIndexCurrent = startIndex;
	if (limit !== undefined) limitCurrent = limit;
	connection.query('select vd.name, ov.value, ov.date from other_values ov left join value_details vd on av.value_details = vd.id where vd.name = ? order by ov.date limit ?, ?', [name, startIndexCurrent, limitCurrent], function(err, rows, fields) {
		if (!err) {
			response.query_success = true;
			response.values = rows;
			callback(response);
		} else {
			response.query_success = false;
			callback(response);
		}
	});
}

exports.getOtherValuesById = function(id, startIndex, limit, callback) {
	var response = {};
	var startIndexCurrent = 0;
	var limitCurrent = 10;
	if (startIndex !== undefined) startIndexCurrent = startIndex;
	if (limit !== undefined) limitCurrent = limit;
	connection.query('select vd.name, ov.value, ov.date from other_values ov left join value_details vd on av.value_details = vd.id where vd.id = ? order by ov.date limit ?, ?', [id, startIndexCurrent, limitCurrent], function(err, rows, fields) {
		if (!err) {
			response.query_success = true;
			response.values = rows;
			callback(response);
		} else {
			response.query_success = false;
			callback(response);
		}
	});
}

exports.insertNewOtherValue = function(id, value, callback) {
	var response = {};
	if (id !== undefined && value !== undefined) {
		response.parameters_correct = true;
		connection.query('select count(id) as amount from value_details where id = ?', [id], function(err, rows, fields) {
			if (!err) {
				if(rows[0].amount > 0) {
					connection.query('insert into other_values(value, value_details) values(?, ?)',  [value, id], function(err, rows, fields) {
						if (!err) {
							response.query_success = true;
							callback(response);
						} else {
							response.query_success = false;
							callback(response);
						}
					});
				}
			} else {
				callback(response);
			}
		});
	} else {
		response.parameters_correct = false;
		callback(response);
	}
}


//




