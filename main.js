var express = require('express');
var http = require('http');
//var auth = require('basic-auth')

var app = express();

app.listen(80);

var rootPath = "/root/Dropbox/baymax-www/";

app.get("/", function(req, res) {
    //res.sendFile("/root/Dropbox/baymax-www/html/index.html");
});

app.get("/baymax/", function(req, res) {
    res.end("kappappar");
});

app.get("/baymax/ohjaus", function(req, res) {
    
});

app.get("/baymax/loki", function(req, res) {
    
});

app.get("/baymax/console", function(req, res) {
    
});

app.use('/', express.static(rootPath + 'html'));
app.use('/script', express.static(rootPath + 'script'));
app.use('/style', express.static(rootPath + 'style'));
app.use('/images', express.static(rootPath + 'images'));
