var app = angular.module('myApp', []);

app.controller('customersCtrl', function($scope, $http) {
	console.log("controller connected");

function refresh(){ 
// create contacklist route 
$http.get('/databases').success(function(response) {
    console.log("recived data requested");
    $scope.databases = response; 
  });
}

// Call refresh to init cantacklist 
refresh(); 

});// Controller 