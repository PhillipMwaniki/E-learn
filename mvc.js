// require express module
var express = require('express');
//var boostrap = require('bootstrap'); 
var path = require('path'); //core module 
// "username:password@example.com/contactlist" 
var databaseUrl = "localhost:27017/DB"; // default env
// not needed, but emulates a MongoDB JavaScript client 
//var collections = ["users", "reports"]
var mongojs = require("mongojs");
var db = mongojs("DB",['contact']); 

//configure app
var app = express(); 

db.on('error', function (err) {
    console.log('database error', err)
})
 
db.on('connect', function () {
    console.log('database connected')
})

// store all html files in views 
app.use(express.static(__dirname + '/views'));
// store all js in Scripts folder
app.use(express.static(__dirname + '/scripts'));

// listen for contactlist get request 
app.get('/contactlist', function(req,res){
	 console.log("recived GET request "); 

	 db.contact.find(function(err,docs){
	 	if(err)
	 		{throw err ; }
	 	console.log("docs request ");
	 	console.log(docs);
	 	res.json(docs); 
	 }); 
}); 
	

// Technology not needed but good practice, especailly when serval people are working on it 
app.get('/', function(req,res){
	res.sendFile('index.html');
}); 
	

// Implement a web server to listen to requests 
app.listen(8081, function(){
	console.log('ready on port 8081'); 
}); 


