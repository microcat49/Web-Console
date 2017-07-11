angular.module('loginService',[]).
      factory('loginService',
            function(){
              var logedIn;
              AuthFunctions = {}





              return {
              login : function(authenticationData, callback){

                var poolData = {
                  UserPoolId : 'us-east-1_qt7mLyOau', // Your user pool id here
                  ClientId : '61adjd9bjsjj67md42e8pb24nf' // Your client id here
                };
                var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
                var userData = {
                  Username : authenticationData.Username,
                  Pool : userPool
                };
                var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData)
                var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

                cognitoUser.authenticateUser(authenticationDetails, {
                  onSuccess: function (result) {
                    console.log('access token + ' + result.getAccessToken().getJwtToken());

                    //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                    AWS.config.region = 'us-east-1';

                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                      IdentityPoolId : 'us-east-1:0756a062-03c6-4d63-a6b9-f5bfaef6848c', // your identity pool id here
                      Logins : {
                    // Change the key below according to the specific region your user pool is in.
                      'cognito-idp.us-east-1.amazonaws.com/us-east-1_qt7mLyOau' : result.getIdToken().getJwtToken()
                      }
                    });

            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();

                  console.log("login.service: login succesful");
                    var sts = new AWS.STS();
                    var params = {

                    };
                    sts.getCallerIdentity(params, function(err, data){
                      if(err){
                        callback(null, "Error");
                      } else {
                        callback("Succes", null);
                      }
                    });


                  },

                  onFailure: function(err) {
                    alert(err);
                  },
                  newPasswordRequired: function(userAttributes, requiredAttributes){
                    delete userAttributes.email_verigied;

                    var newPassword = prompt("Please enter a new password");

                    cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
                  }

                });
              },
              logout:  function(){


                var poolData = {
                  UserPoolId : 'us-east-1_qt7mLyOau', // Your user pool id here
                  ClientId : '61adjd9bjsjj67md42e8pb24nf' // Your client id here
                };
                var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

                var cognitoUser = userPool.getCurrentUser();
                cognitoUser.signOut();
                console.log("login.service: User pressed sign out");
                window.location.href ='#/';
              },
              isLoggedIn : function(callback){

                AWS.config.region = 'us-east-1';
                var poolData = {
                  UserPoolId : 'us-east-1_qt7mLyOau', // Your user pool id here
                  ClientId : '61adjd9bjsjj67md42e8pb24nf' // Your client id here
                };
                var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

                var cognitoUser = userPool.getCurrentUser();

                if (cognitoUser != null) {
                  cognitoUser.getSession(function(err, result) {
                    if (result) {
                      console.log('You are now logged in.');

                // Add the User's Id Token to the Cognito credentials login map.
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: 'us-east-1:0756a062-03c6-4d63-a6b9-f5bfaef6848c',
                        Logins: {
                          'cognito-idp.us-east-1.amazonaws.com/us-east-1_qt7mLyOau': result.getIdToken().getJwtToken()
                          }
                        });

                        callback("logged in", null);
                      } else {
                        console.log('login.serive: Refresh: Unable to get user session');
                          callback(null, "not logged in");
                      }
                    });
                  } else {
                      callback(null, "not logged in");
                  }



              }
            }


            });
