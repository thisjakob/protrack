;(function () {
    'use strict';

    angular.module('protrack')
    /**
     * format datetime without second
     */
    .filter('datetimenosecond', function () {
        return function (item) {
            var date = moment(item, 'DD.MM.YYYY HH:mm:ss');
            if ( date.isValid() ) {
                return date.format('DD.MM.YYYY HH:mm');
            } else {
                return 'time is not valid';
            }
        };
    })

    /**
     * format duration HH:mm:ss
     */
    .filter('durationsec', function () {
        return function (item) {
            var duration = moment(item, 'HH:mm:ss');
            if (duration.isValid()) {
                return duration.format('HH:mm:ss');
            } else {
                return 'time is not valid';
            }
        };
    })

    /**
     * format duration HH:mm
     */
    .filter('durationmin', function () {
        return function (item) {
            var duration = moment(item, 'HH:mm:ss');
            if (duration.isValid()) {
                return duration.format('HH:mm');
            } else {
                return 'time is not valid';
            }
        };
    })

    /**
     * format datetime to date
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
    })

    /**
     * format datetime to time HH:mm:ss
     */
    .filter('timeonly', function () {
        return function (item) {
            var date = moment(item, 'DD.MM.YYYY HH:mm:ss');
            if ( date.isValid() ) {
                return date.format('HH:mm:ss');
            } else {
                return 'Time is not valid';
            }
        };
    })

    /**
     * format datetime to time HH:mm
     */
    .filter('timeonlymin', function () {
        return function (item) {
            var date = moment(item, 'DD.MM.YYYY HH:mm:ss');
            if ( date.isValid() ) {
                return date.format('HH:mm');
            } else {
                return 'Time is not valid';
            }
        };
    });

})();
