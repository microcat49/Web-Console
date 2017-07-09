angular.module('LockingSystem', ['ngRoute','loginService','createUser','userDetail']).
  run(['$rootScope','loginService','$location', function($rootScope, loginService, $location){
    $rootScope.$on('$routeChangeStart', function(event){
         loginService.isLoggedIn(function(result, err){
           if(result){
             console.log('app.module: Logged in');

           } else {
             console.log('app.module: Not logged in');

             window.location.href ='#/';
           }
         });




    });
  }]);
