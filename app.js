// require directive to load http module and store returned HTTP instance into http variable
var http = require("http");

//created http instance and call http.createServer() method to create server instance and then we bind it at port 8081 using listen method
http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Working"
   response.end('Working\n');
}).listen(8081);

// Print server running 
console.log('Server running at http://127.0.0.1:8081/');
