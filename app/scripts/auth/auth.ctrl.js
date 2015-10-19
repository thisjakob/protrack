'use strict';

angular.module('protrack')
    .controller('AuthCtrl', ['Auth', '$state', function(Auth, $state){
        var authCtrl = this;

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
    }]);