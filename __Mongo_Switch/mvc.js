var express = require('express');
var path = require('path'); //core module 
var databaseUrl = "localhost:27017/DB"; // default env
var bodyParser = require('body-parser');

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');

//configure app
var app = express(); 
var db = new Db('DB', new Server('localhost', 27017));


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
app.get('/databases', function (req, res) {
	console.log("-- recived GET request --"); 
	db.open(function(err, db) {

	  // Use the admin database for the operation
	  var adminDb = db.admin();

	  // List all the available databases
	  adminDb.listDatabases(function(err, dbs) {
	    assert.equal(null, err);
	    assert.ok(dbs.databases.length > 0);
	    console.log(dbs);
	    res.json(dbs); 
	    db.close();
	  });
	});
}); 
	

// Implement a web server to listen to requests 
app.listen(8081, function(){
	console.log('ready on port 8081'); 
}); 


