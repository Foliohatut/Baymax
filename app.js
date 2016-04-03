var http = require('http');
var https = require('https');
var express = require('express');
var api = require('./javascript/api/api');
var app = express();
var server = http.createServer(app);
//var servers = https.createServer()
var ws = require('./javascript/websocket/wsserver')(server, api);

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// Route configurations
var routes = require('./routes/index');
var users = require('./routes/users');
var ohjaus = require('./routes/ohjaus');
var loki = require('./routes/loki');
//<<<<<<< HEAD:frontend/app.js
var console = require('./routes/console');
var apiroute = require('./routes/api');

var valueTable = require('./routes/loki/valuetable');

//=======
//var console = require('./routes/loki');
//>>>>>>> parent of de4ddc6... Each site has its own viemodel "class" now and one base layoutviemodel.:app.js

/*expressWs.on('request', function(request) {
	console.log("heii");
});*/


// Make db accessible to router
app.use(function(req,res,next){
	req.api = api;
	next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/ohjaus', ohjaus);
app.use('/loki', loki);
app.use('/console', console);
app.use('/api', apiroute);

app.use('/valuetable', valueTable);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	res.end("<img src='/images/404.jpg'>");
  //var err = new Error('Not Found');
  //err.status = 404;
  //next(err);
});

// error handlers

// development error handler
// will print stacktrace
/*
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/


//wss.on('connection', require("./routes/onconnectionwebsocket"));

//app.listen(80);
server.listen(80);

module.exports = app;
