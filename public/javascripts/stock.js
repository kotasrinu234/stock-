var app = angular.module('stockapp', []);
app.controller('stockcontroller', function($scope,$http){
  $scope.stocks = []
  $scope.newstock = function(stock){
    console.log($scope.stock)
    $http({
    	method : 'POST',
    	url : 'poststock',
    	data : $scope.stock
    	  }).then(function success(response){
            window.location.href = ("/home")
            $scope.stocks.push(response.data);
            //window.location.href = '/home';
    	  	$scope.stock={}
    	  	alert('success')
    }, function error(response){
    	alert('error');
})
}
})
app.controller('listController', function($scope,$http){
    $scope.getData = function(){
        $http({
            method : 'GET',
            url : '/getstock'
        }).then(function success(response){
          $scope.stock1 = response.data;
        }, function error(response){
          alert('error')
        })
    }
$scope.editStock = function(stock){
    console.log(stock);
    $http({
    method:'put',
    url :'editStock/'+stock._id,
    data :stock
}).then(function success(response){
    

    alert("success")
    window.location.href = ("/home")

},function error(response){
    alert("error")

})

}
$scope.deletestock = function(stock){
    console.log(stock)
    $http({
        method:'DELETE',
        url :'deletestock/'+stock._id
    }).then(function success(response){

        alert("success")
        window.location.href = ("/home")
        //var index = $scope.stocks.indexOf(stock);
        $scope.stocks.splice(index,1);
    },function error(response){
        alert("error")
    })
}
$scope.condemendStock = function(stock){
    console.log(stock);
    $http({
    method:'put',
    url :'condemendStock/'+stock._id,
    data :stock
}).then(function success(response){


    alert("condemend successfully")
    window.location.href = ("/home")

},function error(response){
    alert("error")

})

}
$scope.transferData = function(stock){
$http({
    method:'put',
    url :'transferStock/'+stock._id,
    data :stock
}).then(function success(response){

    alert("Transfered successfully")

},function error(response){
    alert("error")

})
}
})
app.controller('condemendController', function($scope,$http){
    $scope.getcondemendData = function(){
        $http({
            method : 'GET',
            url : '/getcondemendstock'
        }).then(function success(response){
          $scope.condemendStock = response.data;
        }, function error(response){
          alert('error')
        })
    }
})
app.controller('recievedController', function($scope,$http){
    $scope.getrecievedData = function(){
        $http({
            method : 'GET',
            url : '/recievedData'
        }).then(function success(response){
          $scope.recievedStock = response.data;
        }, function error(response){
          alert('error')
        })
    }
})

