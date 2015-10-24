var databaseUrl = "localhost:27017/DB"; // default env
// not needed, but emulates a MongoDB JavaScript client 
//var collections = ["users", "reports"]
var mongojs = require("mongojs");
var db = mongojs("DB",['contact']); 



db.on('error', function (err) {
    console.log('database error', err)
})
 
db.on('connect', function () {
    console.log('database connected')
})

console.log("recived GET request "); 

db.contact.find(function(err,docs){
	 if(err)
	 	{throw err ; }
	 console.log("docs request ");
	 console.log(docs);
	 res.json(docs); 
}); 
