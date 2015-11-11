(function () {
    'use strict';

    angular.module('protrack').factory('showData', ['$filter', function ($filter) {
        // show name of project
        var showDataName = function (array, id) {
            var selected = $filter('filter')(array, {$id: id});
            return (id && selected.length) ? selected[0].name : 'No item';
        };

        var show = {
            showDataName: showDataName
        };

        return show;
    }]);
})();
