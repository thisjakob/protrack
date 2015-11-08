(function () {
    'use strict';

    angular.module('protrack')
        .controller('ReportsCtrl', ['dataService', 'authData', function (dataService, authData) {
            var reportsCtrl = this;
            var path = 'users/' + authData.uid + '/';

            reportsCtrl.tracksArray = dataService.getData(path + 'tracks', true);
        }]);
})();