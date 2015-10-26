var express = require('express');
var path = require('path'); //core module 
var databaseUrl = "localhost:27017/DB"; // default env

var mongojs = require("mongojs");
var db = mongojs("DB",['contact']); 
var bodyParser = require('body-parser');

//configure app
var app = express(); 

db.on('error', function (err) {
    console.log('database error', err)
}); 
 
db.on('connect', function () {
    console.log('database connected')
}); 

// store all html files in views 
app.use(express.static(__dirname + '/views'));
// parses recived json input 
app.use(bodyParser.json());
// store all js in Scripts folder
app.use(express.static(__dirname + '/scripts'));

// Technology not needed but good practice, especailly when serval people are working on it 
app.get('/', function (req, res) {
	res.sendFile('index.html');
}); 

// listen for contactlist get request, aka transfers the contacklist in mongo to client
app.get('/contactlist', function (req, res) {
	 console.log("-- recived GET request --"); 

	 db.contact.find(function(err, docs){
	 	if(err)
	 		{throw err ; }
	 	console.log("-- contactlist docs --");
	 	console.log(docs);
	 	res.json(docs); 
	 	console.log("-- result: "+docs.length+" docs found");
	 }); 
}); 

// listen for post request for body from global controller 
app.post('/contactlist', function (req, res) {
	console.log(" insert request ");
	console.log(req.body);
	db.contact.insert(req.body, function(err, docs) {
		if(err) {throw err ; }
		res.json(docs);
		console.log("-- inserted --");
  });
});

// delete request
app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(" delete request ");
	db.contact.remove({_id: mongojs.ObjectId(id)},
		function (err, doc) {
			if(err) {throw err ; }
			res.json(doc);
			console.log("deleted id: "+id);

	});

});

// Respond to the edit get request 
app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log("edit request for id: "+id);
	db.contact.findOne({_id: mongojs.ObjectId(id)},
		function (err, doc) {
			if(err) {throw err ; }
			res.json(doc);
			console.log("loaded id: "+id);
	});
});

app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log("update recived for id: "+id);
	db.contact.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
			new: true}, function (err, doc) {
				if(err) {throw err ; }
				res.json(doc);
				console.log(req.body.name+"\n updated");
    		}
	);
});
	

// Implement a web server to listen to requests 
app.listen(8081, function(){
	console.log('ready on port 8081'); 
}); 


