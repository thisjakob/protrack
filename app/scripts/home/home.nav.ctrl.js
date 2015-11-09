/**
 * Created by this on 08.11.15.
 */
(function () {
    'use strict';

    angular.module('protrack')
        .controller('HomeNavCtrl', ['Auth', 'authData', function (Auth, authData) {
            var homeNavCtrl = this;
            homeNavCtrl.authData = authData;
            homeNavCtrl.logout = Auth.logout;
        }]);
})();