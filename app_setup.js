// require express module
var express = require('express');
var path = require('path'); //core module 

//configure app
var app = express(); 

// store all html files in views 
app.use(express.static(__dirname + '/views'));
// store all js and css in Scripts folder
app.use(express.static(__dirname + '/scripts'));

app.get('/', function(req,res){
	res.sendFile('index.html');
	}); 
	
app.get('/about',function(req,res){
  res.sendFile('/about.html');
});

// Implement a web server to listen to requests 
app.listen(8081, function(){
		console.log('ready on port 8081'); 
	}); 


