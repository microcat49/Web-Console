angular.module('lockDetail').
  component('lockdetail', {
    templateUrl : 'lock_detail.html'}).
    controller('lockDetailController', ['$scope','$routeParams',function($scope,$routeParams){
          var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});
            var ctrl =this;

            ctrl.lockname = $routeParams.lockname;

            ctrl.lock = {};


            var payload = {
              LockName : ctrl.lockname
            }

            var pullParams = {
                FunctionName : 'GetLockDetails',
                InvocationType : 'RequestResponse',
                LogType : 'None',
                Payload : JSON.stringify(payload)
                };

                lambda.invoke(pullParams, function(err, data) {
                  if (err) {
                    prompt(err);
                  } else {
                    $scope.$apply(
                    pullResults = JSON.parse(data.Payload),
                    console.log(pullResults),
                    ctrl.lock = pullResults.Items,
                  );
                  }
                }
                  );
          }]);
