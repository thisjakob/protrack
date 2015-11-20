(function () {
    'use strict';

    angular.module('protrack')
        .filter('daterange', function () {
            return function (items, from, to) {
                return items.filter(function (item) {
                    return moment(item.starttime, 'DD.MM.YYYY HH:mm').isBetween(from, to);
                });
            };
        });
})();
