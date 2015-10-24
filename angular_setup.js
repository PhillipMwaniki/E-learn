var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
 $scope.contactlist = [
        {name:'Jani',email:'Norway@email.com',number:'1'},
        {name:'Hege',email:'Sweden@email.com',number:'2'},
        {name:'Kai',email:'Denmark@email.com',number:'3'}
    ];
});