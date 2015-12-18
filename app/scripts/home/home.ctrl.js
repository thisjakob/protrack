/**
 * Created by this on 08.11.15.
 */
;(function () {
    'use strict';

    angular.module('protrack')
        .controller('HomeCtrl', ['authData', function (authData) {
            var homeCtrl = this;
            homeCtrl.authData = authData;
        }]);
})();