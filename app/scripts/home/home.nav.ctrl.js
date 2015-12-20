/**
 * Created by this on 08.11.15.
 */
;(function () {
    'use strict';

    angular.module('protrack')
        .controller('HomeNavCtrl', ['Auth', 'authData', 'dataService',function (Auth, authData, dataService) {
            var homeNavCtrl = this;

            homeNavCtrl.userFirstname = dataService.getData('/users/' + authData.uid + '/firstname', false);
            homeNavCtrl.userLastname = dataService.getData('/users/' + authData.uid + '/lastname', false);
            homeNavCtrl.authData = authData;
            homeNavCtrl.logout = Auth.logout;
        }]);
})();