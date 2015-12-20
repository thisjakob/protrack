;(function () {
    'use strict';

    angular.module('protrack')
        .controller('AuthCtrl', ['Auth', '$state', 'dataService', 'toastr', function (Auth, $state, dataService, toastr) {
            var authCtrl = this;

            authCtrl.authData = false;
            authCtrl.auth = Auth;

            // redirect to tracks if already logged in
            if ( authCtrl.auth.$getAuth() ) {
                $state.go('timer');
            }

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
                        $state.go('timer');
                    })
                    .catch(function (error) {
                        if (error.code === 'NETWORK_ERROR')
                            toastr.error('You need to be connected to the internet to login.', 'You are offline');

                        if (error.code === 'INVALID_EMAIL')
                            toastr.error('The given e-mail address seems to be invalid. Please correct it.', 'Invalid e-mail address');

                        if (error.code === 'INVALID_PASSWORD' || error.code === 'INVALID_USER' || error.code === 'INVALID_CREDENTIALS')
                            toastr.error('The provided credentials are not valid.', 'Invalid credentials');
                    });
            };

            authCtrl.sendPwdReset = function () {
                if (authCtrl.email) {
                    Auth.$resetPassword({
                        email: authCtrl.email
                    }).then(function(){
                            toastr.info('Password reset e-mail was sent to: ' + authCtrl.email, 'Reset e-mail sent');
                        })
                        .catch(function(error){
                            toastr.error('The specified e-mail address is either invalid or does not exist in our database.','Error sending reset e-mail');
                        });
                } else {
                    toastr.error('Please provide your e-mail address.');
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