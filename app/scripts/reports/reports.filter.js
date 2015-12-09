(function () {
    'use strict';

    angular.module('protrack')
        .filter('daterange', function () {
            return function (items, from, to) {
                return items.filter(function (item) {
                    return moment(item.starttime, 'DD.MM.YYYY HH:mm').isBetween(from, to);
                });
            };
        })
        
        .filter('weekday', function () {
            return function (item) {
                var date = moment(item, 'DD.MM.YYYY HH:mm:ss');
                if ( date.isValid() ) {
                    return date.format('ddd');
                } else {
                    return '';
                }
            };
        })

        .filter('dateonly', function () {
            return function (item) {
                var date = moment(item, 'DD.MM.YYYY HH:mm:ss');
                if ( date.isValid() ) {
                    return date.format('DD.MM.YYYY');
                } else {
                    return 'Date is not valid';
                }
            };
        });
})();
