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
      otherwise({
        redirectTo: '/dashboard'
      });
    $locationProvider.html5Mode(true).hashPrefix('!');;
  }]);


/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('DashboardCtrl', ['$scope', 'SimpleRestClient',
  function($scope, SimpleRestClient) {
    console.log("Nice...");
    
  }]);

appControllers.controller('ClientCtrl',['$scope', 'SimpleRestClient',
  function($scope, SimpleRestClient) {
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


/* Filters */
/*angular.module('phonecatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});*/

/* Services */
var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Client', ['$resource',
  function($resource){
    return $resource('/api/clients/:id', {id: '@id'}, {
      // query: {method:'GET', params:{}, isArray:false},
      // save: {method:'POST', params:{}, isArray:false}
    });
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

