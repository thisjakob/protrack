(function () {
    'use strict';

    angular.module('protrack').factory('showData', ['dataService', function (dataService) {
        // show name of project
        var showProjectname = function (array, project) {
            var selected = $filter('filter')(array, {$id: project});
            return (project && selected.length) ? selected[0].name : 'No project';
        };

        var show = {
            showProjectname: showProjectname
        };

        return show;
    }]);
})();
