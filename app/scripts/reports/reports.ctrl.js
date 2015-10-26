'use strict';

angular.module('protrack')
    .controller('ReportsCtrl', ['dataService', function (dataService) {
        var reportsCtrl = this;
        var path = 'users/iduser1/';

        reportsCtrl.tracks = dataService.getData(path + 'tracks');
    }]);