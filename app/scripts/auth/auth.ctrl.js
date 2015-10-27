'use strict';

angular.module('protrack')
    .controller('AuthCtrl', ['Auth','$state', function(Auth, $scope, $state){
        var authCtrl = this;

        authCtrl.auth = Auth;

        // any time auth status updates, add the user data to scope
        authCtrl.auth.$onAuth(function(authData) {
            authCtrl.authData = authData;
        });

        authCtrl.login = function(){
            // login with username/password
        };

        authCtrl.logout = function(){
            // logout username/password
        };

        authCtrl.register = function(){
            // register for a new account with username/password
        };

        // create a user
        authCtrl.createUser = function() {
            authCtrl.message = null;
            authCtrl.error = null;

            Auth.$createUser({
                email: authCtrl.email,
                password: authCtrl.password
            }).then(function(userData) {
                authCtrl.message = "User created with uid: " + userData.uid;
            }).catch(function(error) {
                authCtrl.error = error;
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

        /*
        authCtrl.user = {
            email: '',
            password: ''
        };

        authCtrl.login = function (){
            Auth.$authWithPassword(authCtrl.user).then(function (auth){
                $state.go('home');
            }, function (error){
                authCtrl.error = error;
            });
        };
        */
    }]);