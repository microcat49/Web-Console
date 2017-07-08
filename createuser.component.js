angular.module('createUser').
  component('createuser', {
      templateUrl: 'create_user.html'})
      .controller('createUserController', [ 'loginService','$scope','Upload',function(loginService,$scope,Upload ) {

        var s3 = new AWS.S3 ({
          apiVersion : '2006-03-01',
          params: {Bucket : 'lockingsystem-userfiles-mobilehub-1141210121'}
        });

        $scope.upload = function(file){
          s3.upload({
            Key: 'TestUser',
            Body: file,
            ACL : 'public-read'
          },
            function(err, data){
              if(err){
                alert("Unable to up load file");
              } else {
                alert("Uploaded the file");
              }
            });

        };

        $scope.log = '';



        var logout = function(){
          loginService.logout();
        };

      }]);
