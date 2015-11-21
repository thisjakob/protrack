(function () {
    'use strict';

    angular.module('protrack')
        .filter('datetimenosecond', function () {
            return function (item) {
                if (moment(item, 'DD.MM.YYYY HH:mm:ss').isValid()) {
                    return moment(item, 'DD.MM.YYYY HH:mm:ss').format('DD.MM.YYYY HH:mm');
                } else {
                    return 'time is not valid';
                }
            };
        });
})();
