(function () {
    'use strict';

    angular.module('protrack')
        .controller('SettingsCtrl', [function () {
            var settingsCtrl = this;

            settingsCtrl.setLoginName = function(name) {
                localStorage.setItem("name", name);
            };

            settingsCtrl.getLoginName = function() {
                return localStorage.getItem("name");;
            };
        }]);
})();