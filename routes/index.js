var express = require('express')
var app = express()

// Show page instruction
app.get('/', function(req, res, next) {
	res.sendfile('public/index.html');
})

module.exports = app;
