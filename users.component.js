angular.module('LockingSystem').
    component('users', {
      templateUrl : 'user.html',
      controller:['$scope','loginService',
        function SecureController( $scope, loginService){
              data = {}
              var ctrl = this;

              ctrl.Users = ['a','b','c'];

              var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});

              var pullParams = {
                  FunctionName : 'GetEndUsers',
                  InvocationType : 'RequestResponse',
                  LogType : 'None'
                  };

                  lambda.invoke(pullParams, function(err, data) {
                    if (err) {
                      prompt(err);
                    } else {
                      $scope.$apply(
                      pullResults = JSON.parse(data.Payload),
                      console.log(pullResults.Users),
                      ctrl.Users = pullResults.Users,
                      data.Users = pullResults.Users
                    );
                    }
                  });






                $scope.logout = function(){
                  loginService.logout();
                }
            }



        ]}).

        service('Lambda', function(){

        })
