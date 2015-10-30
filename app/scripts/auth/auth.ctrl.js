'use strict';

angular.module('protrack')
    .controller('AuthCtrl', ['Auth','$state', function(Auth, $state){
        var authCtrl = this;

        authCtrl.message = 'Message: ';
        authCtrl.auth = Auth;

        // any time auth status updates, add the user data to scope
        authCtrl.auth.$onAuth(function(authData) {
            authCtrl.authData = authData;
        });


        authCtrl.login = function(){
            authCtrl.auth.$authWithPassword({
                email:authCtrl.email,
                password:authCtrl.password
            })
            .then(function(authData){
                authCtrl.email = '';
                authCtrl.password = '';
                authCtrl.message = 'You are logged in as ' + authData.uid;
            })
            .catch(function(error){
                authCtrl.error = error;
            });
        };

        authCtrl.logout = function(){
            authCtrl.auth.$unauth()
        };

        authCtrl.sendPwdReset = function(){
            Auth.$resetPassword({
                email:authCtrl.email
            }, function(error){
                if ( error === null ) {
                    authCtrl.message = 'Password reset e-mail was sent to: ' + authCtrl.email;
                } else {
                    authCtrl.message = 'Error sending password reset email:' + error;
                }
            });
        };

        // remove a user
        authCtrl.removeUser = function() {
            authCtrl.message = null;
            authCtrl.error = null;

            Auth.$removeUser({
                email: authCtrl.email,
                password: authCtrl.password
            }).then(function() {
                authCtrl.message = "User removed";
            }).catch(function(error) {
                authCtrl.error = error;
            });
        };
    }]);