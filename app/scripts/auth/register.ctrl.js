;(function () {
    'use strict';

    angular.module('protrack')
        .controller('RegisterCtrl', ['Auth', 'dataService', '$state', 'toastr', function (Auth, dataService, $state, toastr) {
            var regCtrl = this;

            regCtrl.register = function () {
                // register for a new account with username/password
                regCtrl.message = null;
                regCtrl.error = null;

                Auth.$createUser({
                    email: regCtrl.email,
                    password: regCtrl.password
                }).then(function (userData) {
                    regCtrl.message = "User created with uid: " + userData.uid;

                    dataService.setData('/users/' + userData.uid, {
                        firstname: regCtrl.firstName,
                        lastname: regCtrl.lastName,
                        email: regCtrl.email
                    });

                    toastr.success("Registered  " + regCtrl.firstName + " " + regCtrl.lastName + " " + regCtrl.email);

                    $state.go('timer');
                }).catch(function (error) {
                    regCtrl.message = '';
                    if (error.code === 'EMAIL_TAKEN') {
                        regCtrl.error = 'This e-mail address is already in use. Use the reset password function if necessary.';
                    }
                });
            };
        }]);
})();