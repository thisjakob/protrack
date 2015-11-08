/**
 * Created by this on 08.11.15.
 */
(function () {
    'use strict';

    angular.module('protrack')
        .controller('HomeNavCtrl', ['authData', function (authData) {
            var homeNavCtrl = this;
            homeNavCtrl.authData = authData;
        }]);
})();