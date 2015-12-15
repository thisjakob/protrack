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
            var duration = '00:00:00', h, m, s;
            var diff = '';
            var start = moment(startTime, 'HH:mm:ss');
            var end = moment(endTime, 'HH:mm:ss');

            if ( start.isValid() && end.isValid() ) {
                s = end.diff(start, 'seconds', true);
                h = parseInt(s/3600).toString();
                h = (h.length == 1) ? '0' + h : h;
                m = parseInt( (s-h*3600)/60).toString();
                m = (m.length == 1) ? '0' + m : m;
                s = Math.round( (s-h*3600-m*60) % 60).toString();
                s = (s.length == 1) ? '0' + s : s;

                duration = h + ':' + m + ':' + s;
            }

            return duration;
        };

        /**
         * calculate differencs between start and end time
         * @param startTime
         * @param endTime
         * @returns {string} hours
         */
        var diffTimeHours = function (startTime, endTime) {
            return diffTime(startTime, endTime).match(/[0-9]{1,2}:[0-9]{1,2}/)[0];
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
            diffTimeHours: diffTimeHours,
            addDiffTime: addDiffTime
        };

        return time;
    }]);
})();
