angular.module('viewLocks').
    component('viewlocks', {
      templateUrl : 'view_locks.html',
      controller:['$scope','loginService',
        function SecureController( $scope, loginService){
          var ctrl = this;

          ctrl.Locks = ['a','b','c'];

          var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});

          var pullParams = {
              FunctionName : 'GetAllLocks',
              InvocationType : 'RequestResponse',
              LogType : 'None'
              };

              lambda.invoke(pullParams, function(err, data) {
                if (err) {
                  prompt(err);
                } else {
                  $scope.$apply(
                  pullResults = JSON.parse(data.Payload),
                  console.log(pullResults.Items),
                  ctrl.Locks = pullResults.Items,

                );
                }
              });

        }]});
