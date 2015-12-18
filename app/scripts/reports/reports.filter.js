;(function () {
    'use strict';

    angular.module('protrack')
        /**
         * filter between 'from' and 'to'
         */
        .filter('daterange', function () {
            return function (items, from, to) {
                return items.filter(function (item) {
                    return moment(item.starttime, 'DD.MM.YYYY HH:mm').isBetween(from, to);
                });
            };
        })

        /**
         * filter as weekday
         */
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

        /**
         * filter as date only
         */
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
