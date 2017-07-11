angular.module('userDetail').
  component('userdetail', {
    templateUrl : 'user_detail.html'}).
    controller('userDetailController', ['$scope','$routeParams',function($scope,$routeParams){
          var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});
            var ctrl =this;
            ctrl.username = $routeParams.username;

            ctrl.something = {};

            ctrl.locks = ['a','b','c'];

            ctrl.userlocks = [];



          ctrl.user = {};

          ctrl.lockassignments = {};

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
                  ctrl.user = pullResults,
                  ctrl.userdetails = pullResults.UserAttributes,

                );

                var payload2 = {
                  UserSub : ctrl.userdetails[0].Value


                };

                console.log(payload2);

                var pullParams2 = {
                    FunctionName : 'GetUsersLockAssignments',
                    InvocationType : 'RequestResponse',
                    LogType : 'None',
                    Payload : JSON.stringify(payload2)
                    };

                    lambda.invoke(pullParams2, function(err, data) {
                      if (err) {
                        prompt(err);
                      } else {
                        $scope.$apply(
                        pullResults = JSON.parse(data.Payload),
                        console.log(pullResults),


                          ctrl.userlocks  = pullResults.Items[0].TableName.SS);
                        }
                      }

                      );


                }
              });

              var pullParams1 = {
                  FunctionName : 'GetLocks',
                  InvocationType : 'RequestResponse',
                  LogType : 'None'
                  };

                  lambda.invoke(pullParams1, function(err, data) {
                    if (err) {
                      prompt(err);
                    } else {
                      $scope.$apply(
                      pullResults = JSON.parse(data.Payload),
                      console.log(pullResults),
                      ctrl.locks = pullResults.Items


                    );
                  }
                  });


              ctrl.setLocks= function(tableName){

                for( var i =0; i< ctrl.userlocks.length; i++){
                  if(ctrl.userlocks[i]=== tableName){
                    alert("user already has locked assigned");
                    return;
                  }
                }
                var payload = {
                  UserSub : ctrl.userdetails[0].Value,
                  TableName : [tableName]

                }
                var pullParams = {
                    FunctionName : 'CreateUserLockAssignment',
                    InvocationType : 'RequestResponse',
                    LogType : 'None',
                    Payload : JSON.stringify(payload)
                    };

                    lambda.invoke(pullParams, function(err, data) {
                      if (err) {
                        alert(err);
                      } else {
                        $scope.$apply(ctrl.userlocks.push({TabelName : {
                          S : tableName
                        }}));
                      }
                    });
              }

              ctrl.getCheck= function(lockName){
                console.log(lockName);
                return false;
              }



        }
]);
