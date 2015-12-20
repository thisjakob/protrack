/**
 * Created by this on 08.11.15.
 */
;(function () {
    'use strict';

    angular.module('protrack')
        .controller('HomeNavCtrl', ['Auth', 'authData', 'dataService',function (Auth, authData, dataService) {
            var homeNavCtrl = this;
            homeNavCtrl.authData = authData;

            /**
             * Log the current user out
             */
            homeNavCtrl.logout = function(){
                dataService.destroyAllFBObj();
                Auth.logout();
            };
        }]);
})();