var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {

	// create contacklist route 
 $http.get('/contactlist').success(function(response) {
    console.log("recived data requested");
     $scope.contactlist = response;
  });


});