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
          }).when('/createLock', {
            template: '<createlock></createlock>'
          }).
          when('/userDetail/:username', {
            template: '<userdetail></userdetail>'
          }).when('/viewLocks', {
            template: '<viewlocks></viewlocks>'
          }).
          when('/lockDetail/:lockname', {
            template: '<lockdetail></lockdetail>'
          }).otherwise('/')
        }]);
