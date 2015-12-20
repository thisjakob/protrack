/**
 * Created by this on 08.11.15.
 */
;(function () {
    'use strict';

    angular.module('protrack')
        .controller('HomeNavCtrl', ['Auth', 'authData', 'dataService',function (Auth, authData, dataService) {
            var homeNavCtrl = this;
            homeNavCtrl.authData = authData;

            // get the users name
            // => displayed next to the logout entry
            if ( authData && authData ) {
                homeNavCtrl.userFirstname = dataService.getData('/users/' + authData.uid + '/firstname', false);
                homeNavCtrl.userLastname = dataService.getData('/users/' + authData.uid + '/lastname', false);
            }

            /**
             * Log the current user out
             */
            homeNavCtrl.logout = function(){
                dataService.destroyAllFBObj();
                Auth.logout();
            };
        }]);
})();