
(function () {
    'use strict';

    angular.module('protrack')
        .controller('ReportsCtrl', ['dataService', 'Auth', function (dataService, Auth) {
            var reportsCtrl = this;
            var auth = Auth.$getAuth();
            var path = 'users/' + auth.uid + '/';

            reportsCtrl.tracksArray = dataService.getData(path + 'tracks', true);
        }]);
})();