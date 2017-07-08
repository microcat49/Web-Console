angular.module('LockingSystem').
        component('login', {
          templateUrl : "login.html",

        }).
        controller('LoginController', [
          '$scope','$rootScope', '$window','loginService','$location', function($scope,$rootScope, $win, loginService,  $location){
              $scope.user ={username: "", password: ""};
              $scope.login = function(){
                AWSCognito.config.region = 'us-east-1';


                var authenticationData = {
                    Username : $scope.user.username,
                    Password : $scope.user.password,
                  };


                  loginService.login(authenticationData);


            }
          }
        ]);
