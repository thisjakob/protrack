(function () {
    'use strict';

    angular.module('protrack')
        .controller('SettingsCtrl', ['dataService', function (dataService) {
            var settingsCtrl = this;

            /*settingsCtrl.firebaseUrl = dataService.getUrl();

             settingsCtrl.setUrl = function() {
             dataService.setUrl(settingsCtrl.firebaseUrl);
             };*/
        }]);
})();