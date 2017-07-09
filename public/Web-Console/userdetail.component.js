angular.module('userDetail').
  component('userdetail', {
    templateUrl : 'user_detail.html',
    controller :['$scope','$routeParams',function($scope,$routeParams){
      var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});

        $scope.username = $routeParams.username;

      $scope.user = {}

      var payload = {
        username : $routeParams.username
      }

      var pullParams = {
          FunctionName : 'GetCertainUser',
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
              $scope.user = pullResults,
              $scope.userdetails = pullResults.UserAttributes,

            );
            }
          });

          var params = {
            Bucket : 'lockingsystem-userfiles-mobilehub-1141210121',
            Key : $routeParams.username
          };



    }]});
