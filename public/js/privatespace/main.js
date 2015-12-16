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
        templateUrl: '/templates/client-list',
        controller: 'ClientCtrl'
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

appControllers.controller('ClientCtrl',['$scope', 'Client',
  function($scope, Client) {
    console.log("Nice... Client", Client);
    /*Client.save({
        id: 2,
        name: 'Eman'
    })*/
    /*Client.get({id: 1}, function(result){
        $scope.client = result.data.Client;
        $scope.client.name = "abno"
        Client.save($scope.client)
    });*/

    /*var sRestClient = SimpleRestClient('clients');
    sRestClient.get({id: 1}).then(function(ret){
        console.log("retur: ", ret);
        $scope.Client = ret;
    })*/

    /*Client.get({}, function(ret){
        $scope.Clients = ret.data.Clients
    });

    $scope.testSave = function(){
        $scope.client.save();
    }*/
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
                var deferred = $q.defer();
                obj.get(
                    params, 
                    function(ret){
                        SimpleRestResultFilter.APIReturn(ret)
                        deferred.resolve(ret.data)
                    }, 
                    function(response) {
                        console.log("=====<<<<>>>", response.status)
                    }
                )

                return deferred.promise;
            }
        }
    }
  }]);

