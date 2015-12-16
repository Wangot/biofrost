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

appControllers.controller('DashboardCtrl', ['$scope',
  function($scope) {
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

    Client.get({}, function(ret){
        $scope.Clients = ret.data.Clients
    });

    $scope.testSave = function(){
        $scope.client.save();
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

/*appServices.factory('Client', ['$resource',
  function($resource){
    return $resource('/api/clients/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);*/

