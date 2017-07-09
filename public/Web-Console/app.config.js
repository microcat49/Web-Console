angular.module('LockingSystem').
    config(['$locationProvider',  '$routeProvider',

        function config($locationProvider, $routeProvider){
          $routeProvider.
          when('/secure', {
            template: '<users></users>'
          }).when('/createUser', {
            template: '<createuser></createuser>'
          }).
          when('/', {
            template: '<login></login>'
          }).
          when('/userDetail/:username', {
            template: '<userdetail></userdetail>'
          }).otherwise('/')
        }]);
