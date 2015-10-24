var mongobd = require('mongodb');
var bson = require('bson'); 

// Connection 
var server = new mongodb.Server('127.0.0.1','8081',{}); 
var client = new mongodb.Db('DB_name',server,{w:1});// permisson 

// callback error check 
client.open(function(error){
		if(error){throw error; }
		// Create mongodb collection 
		client.collection('mongodb_crud_demo',function(error,collection){
			if(error){throw error; }
			console.log("Connection ok, ready to perform operation");
			//CREATE/INSERT OPERATION
			collection.insert({
				"name":"andrew",
				"commit":"mongodb setup"
				},{safe:true},function(error,document){
					if(error){throw error; }
					console.log(document);
				});
			//Finding Operation
			collection.find({"name":"andrew"}).toArray(
				function(error,results){
					if(error){throw error; } 
					console.log(results); 
				});
		}
}
