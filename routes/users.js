var express = require('express')
var app = express()

var start = new Date()

function response(req, res, objects){

	res.json({
		"hits": {
			"status": (res.status(200))?"200":"400",
			"pages": parseInt(objects.length),
			"max_score": new Date - start,
			"hits": objects
	   	}
	})
}

function connection(req,res,objects,query){

	req.getConnection(function(error, conn) {
		conn.query(query,objects,function(err, rows, fields) {

			if (err) {
				response(req,res, rows)
			} else {
				response(req, res, rows)
			}
		})
	})
}

function search(){
	return {
		selectAll: function(req, res){
			var page = {offset:parseInt(req.params.page)}
			var count = (page.offset === 2)?page.offset:(page.offset*parseInt(10))
			return connection(req,res,null, 'SELECT * FROM users ORDER BY id DESC limit 10 OFFSET '+page.offset)
		},
		select: function(req, res){
			var user = {id: req.params.id}
			return connection(req,res,null, 'SELECT * FROM users WHERE id = '+user.id+' ORDER BY id DESC limit 1')
		},
		create: function(req, res){
			var user = {
				id: req.params.id,
				name: req.body.name,
				age: req.body.age,
				email: req.body.email
			}
			return connection(req,res,user, 'INSERT INTO users SET ?')
		},
		update: function(req, res){
			var user = {
				id: req.params.id,
				name: req.body.name,
				age: req.body.age,
				email: req.body.email
			}
			return connection(req,res,user,'UPDATE users SET ? WHERE id = '+user.id)
		},
		delete: function(req, res){
			var user = {id: req.params.id}
			return connection(req,res,user, 'DELETE FROM users WHERE id = '+user.id)
		}
	}
}

// Show list all users for pagination
app.get('/rows/(:page)', function(req, res, next) {
	search().selectAll(req, res)
})

// Show unique user pasand ID
app.get('/row/(:id)', function(req, res, next) {
	search().select(req, res)
})

// Create a new user
app.post('/create', function(req, res, next){	
	search().create(req, res)
})

// Update user passend ID
app.put('/update/(:id)', function(req, res, next){	
	search().update(req, res)
})

// Delete user passend ID
app.delete('/delete/(:id)', function(req, res, next){
	search().delete(req, res)
})

// Not set pagination don't work
app.get('*', function(req, res, next) {
	response(req, res, {
		"notification":"You need pass parameter",
		"api":{
			".GET":"/rows/(:page)",
			"GET":"/row/(:id)",
			"POST":"/create",
			"PUT":"/update/(:id)",
			"DELETE":"/delete/(:id)"
		}
	})
})

module.exports = app