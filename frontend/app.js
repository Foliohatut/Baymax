var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Db access
var db = require('mysql');
var connection = db.createConnection({
   host     : 'localhost',
   user     : 'baymax',
   database : 'baymax'
});


// Route configurations
var routes = require('./routes/index');
//var users = require('./routes/users');
var ohjaus = require('./routes/ohjaus');
var loki = require('./routes/loki');
var console = require('./routes/console');
var api = require('./routes/api');

var app = express();
var expressWs = require('express-ws')(app);

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
      if (msg[0] == 48) {
          ws.send(msg[0]);
      }
    
  });
  console.log('socket');
});


// Make db accessible to router
app.use(function(req,res,next){
    req.db = connection;
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
//app.use('/users', users);
app.use('/ohjaus', ohjaus);
app.use('/loki', loki);
app.use('/console', console);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
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



//wss.on('connection', require("./routes/onconnectionwebsocket"));

app.listen(80);

module.exports = app;
