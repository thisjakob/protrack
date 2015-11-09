(function () {
    'use strict';

    angular.module('protrack')
        .controller('AuthCtrl', ['Auth', '$state', 'dataService', function (Auth, $state, dataService) {
            var authCtrl = this;

            authCtrl.authData = false;
            authCtrl.message = null;
            authCtrl.auth = Auth;

            // any time auth status updates, add the user data to scope
            authCtrl.auth.$onAuth(function (authData) {
                if (authData) {
                    authCtrl.authData = authData;
                    dataService.getData('users/' + authData.uid + '/firstname').$loaded(function (data) {
                        authCtrl.firstname = data.$value;
                    });
                }
            });

            authCtrl.login = function () {
                authCtrl.auth.$authWithPassword({
                    email: authCtrl.email,
                    password: authCtrl.password
                })
                    .then(function (authData) {
                        authCtrl.email = '';
                        authCtrl.password = '';
                        authCtrl.message = 'You are logged in as ' + authData.uid;
                        $state.go('timer');
                    })
                    .catch(function (error) {
                        authCtrl.error = error;
                    });
            };

            authCtrl.sendPwdReset = function () {
                if (authCtrl.email) {
                    Auth.$resetPassword({
                        email: authCtrl.email
                    }, function (error) {
                        if (error === null) {
                            authCtrl.message = 'Password reset e-mail was sent to: ' + authCtrl.email;
                        } else {
                            authCtrl.message = 'Error sending password reset email:' + error;
                        }
                    });
                } else {
                    authCtrl.message = 'Please provide your e-mail address.';
                }
            };

            // remove a user
            authCtrl.removeUser = function () {
                authCtrl.message = null;
                authCtrl.error = null;

                Auth.$removeUser({
                    email: authCtrl.email,
                    password: authCtrl.password
                }).then(function () {
                    authCtrl.message = "User removed";
                }).catch(function (error) {
                    authCtrl.error = error;
                });
            };
        }]);
})();