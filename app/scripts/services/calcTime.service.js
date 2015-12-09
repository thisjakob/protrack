/* global moment */

(function () {
    'use strict';

    angular.module('protrack').factory('calcTime', [function () {

        /**
         * calculate differencs between start and end time
         * @param startTime
         * @param endTime
         * @returns {string} hours
         */
        var diffTime = function (startTime, endTime) {
            var hours = '00:00';
            var diff = '';
            var start = moment(startTime, 'HH:mm:ss');
            var end = moment(endTime, 'HH:mm:ss');

            if ( start.isValid() && end.isValid() ) {
                var h = end.diff(start, 'hours', true);
                var m = Math.round(moment.duration(h%1, 'hours').as('minutes'));
                hours = (h-h%1).toString() + ':' + m;
            } else {
                console.log('endtime or starttime is not valid!');
            }

            return hours;
        };

        /**
         * add hours to time
         * @param time
         * @param diffTime hours
         * @returns {*} new time
         */
        var addDiffTime = function (time, diffTime) {
            var start = moment(time, 'HH:mm:ss');
            var duration = moment(diffTime, 'HH:mm:ss');
            var end = time;

            if ( start.isValid() && duration.isValid() ) {
                end = start.add(duration);
            }

            return end;
        };


        var time = {
            diffTime: diffTime,
            addDiffTime: addDiffTime
        };

        return time;
    }]);
})();
