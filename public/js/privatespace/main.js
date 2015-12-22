'use strict';

/* App Module */

var bioApp = angular.module('BioApp', [
  'ngRoute',
  // 'phonecatAnimations',
  'appControllers',
  // 'phonecatFilters',
  'appServices',
  'ui-notification'
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
      when('/trucks', {
        templateUrl: '/templates/truck/list',
        controller: 'TruckCtrl'
      }).
      when('/trucks/add', {
        templateUrl: '/templates/truck/form',
        controller: 'TruckDetailCtrl'
      }).
      when('/trucks/:itemId', {
        templateUrl: '/templates/truck/form',
        controller: 'TruckDetailCtrl'
      }).
      when('/deliveries', {
        templateUrl: '/templates/delivery/list',
        controller: 'DeliveryCtrl'
      }).
      when('/deliveries/add', {
        templateUrl: '/templates/delivery/form',
        controller: 'DeliveryDetailCtrl'
      }).
      when('/deliveries/:itemId', {
        templateUrl: '/templates/delivery/form',
        controller: 'DeliveryDetailCtrl'
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

/* Trucks */
appControllers.controller('TruckCtrl',['$scope', 'SimpleRestClient', function($scope, SimpleRestClient) {
    var sRestClient = SimpleRestClient('trucks');
    sRestClient.get({}).then(function(ret){
        $scope.Trucks = ret.Trucks;
    })
}]);

appControllers.controller('TruckDetailCtrl',['$scope', '$routeParams', 'SimpleRestClient', function($scope, $routeParams, SimpleRestClient) {
    $scope.action = 'ADD';
    $scope.Truck = {};
    var sRestClient = SimpleRestClient('trucks');

    if($routeParams.itemId){
        $scope.action = 'EDIT';
        sRestClient.get({id: $routeParams.itemId}).then(function(ret){
            $scope.Truck = ret.Truck;
        });
    }

    $scope.save = function(){
        sRestClient.save($scope.Truck).then(function(ret){
            $scope.Truck = ret.Truck;
        });
    }
}]);

/* Delivery */
appControllers.controller('DeliveryCtrl',['$scope', 'SimpleRestClient', function($scope, SimpleRestClient) {
    var sRestClient = SimpleRestClient('deliveries');
    sRestClient.get({}).then(function(ret){
        $scope.Deliveries = ret.Deliveries;
    })
}]);

appControllers.controller('DeliveryDetailCtrl',['$scope', '$routeParams', 'SimpleRestClient', 'Notification', function($scope, $routeParams, SimpleRestClient, Notification) {
    $scope.action = 'ADD';
    $scope.Delivery = {Items: []};
    $scope.itemTemp = getDefaultItemTemp();

    var sRestClient = SimpleRestClient('deliveries');
    var sRestClientItem = SimpleRestClient('items');
    sRestClientItem.get({}).then(function(ret){
        $scope.Items = ret.Items;
    })


    if($routeParams.itemId){
        $scope.action = 'EDIT';
        sRestClient.get({id: $routeParams.itemId}).then(function(ret){
            $scope.Delivery = ret.Delivery;
        });
    }

    function getDefaultItemTemp() {
        return {id:'', DeliveryItems:{}};
    }

    $scope.removeItem = function(index){
        $scope.Delivery.Items.splice(index, 1)
    }

    $scope.addItem = function(params){
        var toAdd = true;
        for (var i = $scope.Delivery.Items.length - 1; i >= 0; i--) {
            if($scope.Delivery.Items[i].id == params.item.id){
                toAdd = false;
            }
        };

        if(toAdd){
            $scope.Delivery.Items.push({
                id: params.item.id,
                name: params.item.name,
                DeliveryItems: params.DeliveryItems
            });

            $scope.itemTemp = getDefaultItemTemp();
        }else{
            Notification.error('The item is already added.')
        }
    }

    $scope.save = function(){
        $scope.Delivery.Items = [{id: 1, DeliveryItems: {
            description: 'description',
            quantity: 10
        }}];

        sRestClient.save($scope.Delivery).then(function(ret){
            $scope.Delivery = ret.Delivery;
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

appServices.factory('SimpleRestResultFilter', ['$q', 'Notification', function($q, Notification){
    return {
        APIReturn: function(params){
            var deferred = $q.defer();
            if(params.status == "success"){
                if(params.message != "") Notification.success(params.message)
            }else{
                Notification.error(params.message)
            }

            deferred.resolve(params.data || {})

            return deferred.promise;
        }
    }
  }]);

appServices.factory('SimpleRestClient', ['$resource', '$q', 'SimpleRestResultFilter', 'Notification',
  function($resource, $q, SimpleRestResultFilter){
    return function(model){
        var obj = $resource('/api/'+ model +'/:id', {id: '@id'}, {
          // query: {method:'GET', params:{}, isArray:false},
          // save: {method:'POST', params:{}, isArray:false}
        });

        return {
            get : function(params){
                var deferred = $q.defer();
                obj.get(
                    params, 
                    function(ret){
                        SimpleRestResultFilter.APIReturn(ret).then(function(data){
                            deferred.resolve(data)
                        })
                    }, 
                    function(response) {
                        console.log("fail: ", response.status)
                        Notification.error(response)
                    }
                )

                return deferred.promise;
            },
            save: function(params){
                var deferred = $q.defer();
                obj.save(
                    params, 
                    function(ret){
                        SimpleRestResultFilter.APIReturn(ret).then(function(data){
                            deferred.resolve(data)
                        })
                    }, 
                    function(response) {
                        console.log("fail: ", response.status)
                        Notification.error(response);
                    }
                )

                return deferred.promise;
            }
        }
    }
  }]);

