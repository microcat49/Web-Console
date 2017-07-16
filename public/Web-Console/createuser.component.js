angular.module('createUser').
  component('createuser', {
      templateUrl: 'create_user.html'})
      .controller('createUserController', [ 'loginService','$scope','Upload',function(loginService,$scope,Upload ) {
        $scope.user = {};

        var s3 = new AWS.S3 ({
          apiVersion : '2006-03-01',
          params: {Bucket : 'lockingsystem-userfiles-mobilehub-1141210121'}
        });

        var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});





        $scope.submit = function(file){
          console.log(file);
          s3.upload({
            Key: $scope.user.username,
            Body: file,
            ACL : 'public-read'
          },
            function(err, data){
              if(err){
                alert("Unable to up load file");
              } else {

                var payload = {
                  firstname : $scope.user.firstname,
                  lastname : $scope.user.lastname,
                  email : $scope.user.email,
                  username :$scope.user.username,
                  isAdmin :$scope.user.isAdmin,
                };

                var pullParams = {
                    FunctionName : 'CreateUser-createUser-mobilehub-1141210121',
                    InvocationType : 'RequestResponse',
                    LogType : 'None',
                    Payload : JSON.stringify(payload)
                    };


                    lambda.invoke(pullParams, function(err, data) {
                      if (err) {
                        alert(err);
                      } else {
                        window.location.href ='#/secure';
                      }
                      });
                    }
                  });





        };

        var logout = function(){
          loginService.logout();
        };

      }]);
