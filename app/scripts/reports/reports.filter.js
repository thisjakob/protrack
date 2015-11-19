(function () {
    'use strict';

    angular.module('protrack')
        .filter('daterange', function () {
            return function (items, from, to) {
                return items.filter(function (item) {
                    /*var res = to.setHours(to.getHours() + 24);
                    var d = moment(to.toLocaleString());*/
                    return moment(item.starttime, 'DD.MM.YYYY HH:mm').isBetween(from, to);
                });
            };
        });
})();
