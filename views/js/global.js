var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
	console.log("controller connected");

function refresh(){ 
// create contacklist route 
$http.get('/contactlist').success(function(response) {
    console.log("recived data requested");
     $scope.contactlist = response;
     $scope.contact = "";
  });
}

// Call refresh to init cantacklist 
refresh(); 

// add Doc to table 
$scope.addContact = function() {
	console.log($scope.contact);
    $http.post('/contactlist', $scope.contact).success(function(response) {
    	console.log(response);
    	refresh(); 
  		});
	};

// remove Doc from table
$scope.remove = function(id) {
	console.log("request id");
  console.log(id);
  $http.delete('/contactlist/' + id).success(function(response) {
    refresh();
  });
};

// put response into the input boxes 
$scope.edit = function(id) {
  console.log(id);
  $http.get('/contactlist/'+id).success(function(response) {
    $scope.contact = response;
  });
}; 


$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}



});// Controller 