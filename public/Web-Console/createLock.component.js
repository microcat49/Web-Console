angular.module('createLock').
  component('createlock', {
      templateUrl: 'create_lock.html'}).
      controller('createLockController', ['$scope', function($scope){

        var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});

        $scope.lock = {};

        $scope.submit = function(){

          var payload = {
            Name : $scope.lock.name,
            Description : $scope.lock.description
          }
          var pullParams = {
              FunctionName : 'Functions-getGroups-mobilehub-1141210121',
              InvocationType : 'RequestResponse',
              LogType : 'None',
              Payload : JSON.stringify(payload)
              };


              lambda.invoke(pullParams, function(err, data) {
                if (err) {
                  alert(err);
                } else {

                  window.location.href ='#/viewLocks';
                }
                });
        };
      }
      ]);
