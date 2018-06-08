var express = require('express')
var bodyParser = require('body-parser')
var myConnection  = require('express-myconnection')
var mysql = require('mysql')

var app = express()
/**
 * Set store database credentials in a separate config.js file
 * Load the file/module and its values
 */ 
var config = require('./config.json')
var db = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
}

app.use(myConnection(mysql, db, 'pool'))

/**
 * import routes/index.js
 * import routes/users.js
 */ 
var index = require('./routes/index')
var users = require('./routes/users')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', index)
app.use('/users', users)

app.listen(3000, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3000 or http://localhost:3000')
})
