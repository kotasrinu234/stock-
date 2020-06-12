var app = angular.module('myApp', []);
app.controller('myController', function($scope,$http,$window){
  $scope.login = function(signin){
    $http({
    	method : 'POST',
    	url : 'postlogin',
    	data : $scope.signin
    }).then(function success(response){
        window.location.href = ("/home");
    }, function error(response){
    	alert('error');
    })
  }
  
});