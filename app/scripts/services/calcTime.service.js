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
                diff = moment.utc(end.diff(start)).format("DD HH:mm:ss");
                hours = ((Number(diff.substr(0, 2)) - 1) * 24 + Number(diff.substr(2, 2))).toString() + diff.substr(4);
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
                //end = moment(newtime).format('HH:mm:ss');
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
