angular.module('LockingSystem', ['ngRoute','loginService','createUser']).
  run(['$rootScope','loginService','$location', function($rootScope, loginService, $location){
    $rootScope.$on('$routeChangeStart', function(event){
         loginService.isLoggedIn(function(result, err){
           if(result){
             console.log('app.module: Logged in');

           } else {
             console.log('app.module: Not logged in');

             window.location.href ='file:///C:/Users/harta1/Documents/Web-Dev/index.html#/';
           }
         });




    });
  }]);
