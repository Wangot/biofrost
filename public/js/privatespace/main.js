'use strict';

/* App Module */

var bioApp = angular.module('BioApp', [
  'ngRoute',
  // 'phonecatAnimations',
  'appControllers',
  // 'phonecatFilters',
  'appServices'
]);

bioApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/dashboard', {
        templateUrl: '/templates/dashboard',
        controller: 'DashboardCtrl'
      }).
      when('/clients', {
        templateUrl: '/templates/client/list',
        controller: 'ClientCtrl'
      }).
      when('/clients/add', {
        templateUrl: '/templates/client/form',
        controller: 'ClientDetailCtrl'
      }).
      when('/clients/:clientId', {
        templateUrl: '/templates/client/form',
        controller: 'ClientDetailCtrl'
      }).
      when('/employees', {
        templateUrl: '/templates/employee/list',
        controller: 'EmployeeCtrl'
      }).
      when('/employees/add', {
        templateUrl: '/templates/employee/form',
        controller: 'EmployeeDetailCtrl'
      }).
      when('/employees/:employeeId', {
        templateUrl: '/templates/employee/form',
        controller: 'EmployeeDetailCtrl'
      }).
      when('/items', {
        templateUrl: '/templates/item/list',
        controller: 'ItemCtrl'
      }).
      when('/items/add', {
        templateUrl: '/templates/item/form',
        controller: 'ItemDetailCtrl'
      }).
      when('/items/:itemId', {
        templateUrl: '/templates/item/form',
        controller: 'ItemDetailCtrl'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
    $locationProvider.html5Mode(true).hashPrefix('!');;
  }]);


/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('DashboardCtrl', ['$scope', 'SimpleRestClient', function($scope, SimpleRestClient) {
    console.log("Nice...");
    
}]);

/* Clients */
appControllers.controller('ClientCtrl',['$scope', 'SimpleRestClient', function($scope, SimpleRestClient) {
    var sRestClient = SimpleRestClient('clients');
    sRestClient.get({}).then(function(ret){
        $scope.Client = ret.Clients;
    })
}]);

appControllers.controller('ClientDetailCtrl',['$scope', '$routeParams', 'SimpleRestClient', function($scope, $routeParams, SimpleRestClient) {
    $scope.action = 'ADD';
    $scope.Client = {};
    var sRestClient = SimpleRestClient('clients');

    if($routeParams.clientId){
        $scope.action = 'EDIT';
        sRestClient.get({id: $routeParams.clientId}).then(function(ret){
            console.log("retur: ", ret);
            $scope.Client = ret.Client;
        });
    }

    $scope.save = function(){
        sRestClient.save($scope.Client).then(function(ret){
            $scope.Client = ret.Client;
        });
    }
}]);

/* Employees */
appControllers.controller('EmployeeCtrl',['$scope', 'SimpleRestClient', function($scope, SimpleRestClient) {
    var sRestClient = SimpleRestClient('employees');
    sRestClient.get({}).then(function(ret){
        $scope.Employees = ret.Employees;
    })
}]);

appControllers.controller('EmployeeDetailCtrl',['$scope', '$routeParams', 'SimpleRestClient', 'AuthService', function($scope, $routeParams, SimpleRestClient, AuthService) {
    $scope.action = 'ADD';
    $scope.Employee = {Merchant: {id: 1}};
    var sRestClient = SimpleRestClient('employees');

    AuthService.getMerchants().then(function(ret){
        $scope.Merchants = ret;
    })

    if($routeParams.employeeId){
        $scope.action = 'EDIT';
        sRestClient.get({id: $routeParams.employeeId}).then(function(ret){
            console.log("retur: ", ret);
            $scope.Employee = ret.Employee;
        });
    }

    $scope.save = function(){
        sRestClient.save($scope.Employee).then(function(ret){
            $scope.Employee = ret.Employee;
        });
    }
}]);

/* Items */
appControllers.controller('ItemCtrl',['$scope', 'SimpleRestClient', function($scope, SimpleRestClient) {
    var sRestClient = SimpleRestClient('items');
    sRestClient.get({}).then(function(ret){
        $scope.Items = ret.Items;
    })
}]);

appControllers.controller('ItemDetailCtrl',['$scope', '$routeParams', 'SimpleRestClient', function($scope, $routeParams, SimpleRestClient) {
    $scope.action = 'ADD';
    $scope.Item = {};
    var sRestClient = SimpleRestClient('items');

    if($routeParams.itemId){
        $scope.action = 'EDIT';
        sRestClient.get({id: $routeParams.itemId}).then(function(ret){
            $scope.Item = ret.Item;
        });
    }

    $scope.save = function(){
        sRestClient.save($scope.Item).then(function(ret){
            $scope.Item = ret.Item;
        });
    }
}]);


/* Filters */
/*angular.module('phonecatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});*/

/* Services */
var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('AuthService', ['$q', 'SimpleRestClient', 'CacheService', function($q, SimpleRestClient, CacheService) {
    return {
        getMerchants: function(){
            var deferred = $q.defer();
            var merchants = CacheService.get("Merchants");
            if(!merchants){
                var sRestClient = SimpleRestClient('merchants');
                sRestClient.get({}).then(function(ret){
                    CacheService.put("Merchants", ret.Merchants)
                    deferred.resolve(ret.Merchants)
                })
            }else{
                deferred.resolve(merchants)
            }
            return deferred.promise
        }
    }
}]);

appServices.factory('CacheService', ['$cacheFactory', function($cacheFactory) {
    var cache = $cacheFactory('BioFrostCache');
    return cache;
}]);

appServices.factory('SimpleRestResultFilter', ['$q',
  function($q){
    return {
        APIReturn: function(params){
            console.log("======> processing", params)
        }
    }
  }]);

appServices.factory('SimpleRestClient', ['$resource', '$q', 'SimpleRestResultFilter',
  function($resource, $q, SimpleRestResultFilter){
    return function(model){
        var obj = $resource('/api/'+ model +'/:id', {id: '@id'}, {
          // query: {method:'GET', params:{}, isArray:false},
          // save: {method:'POST', params:{}, isArray:false}
        });

        return {
            get : function(params){
                console.log("_+_+_+_+-=-=-", params)
                var deferred = $q.defer();
                obj.get(
                    params, 
                    function(ret){
                        SimpleRestResultFilter.APIReturn(ret)
                        deferred.resolve(ret.data)
                    }, 
                    function(response) {
                        console.log("fail: ", response.status)
                    }
                )

                return deferred.promise;
            },
            save: function(params){
                var deferred = $q.defer();
                obj.save(
                    params, 
                    function(ret){
                        SimpleRestResultFilter.APIReturn(ret)
                        deferred.resolve(ret.data)
                    }, 
                    function(response) {
                        console.log("fail: ", response.status)
                    }
                )

                return deferred.promise;
            }
        }
    }
  }]);

