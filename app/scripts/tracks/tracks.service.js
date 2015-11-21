/* global moment */

(function () {
    'use strict';

    angular.module('protrack').factory('calcTime', [function () {

        var diffTime = function (startTime, endTime) {
            var diff = '00:00';
            var start = moment(startTime, 'DD.MM.YYYY HH:mm');
            var end = moment(endTime, 'DD.MM.YYYY HH:mm');

            if ( start.isValid() && end.isValid() ) {
                diff = moment.utc(end.diff(start)).format("HH:mm");
            } else {
                console.log('endtime or starttime is not valid!');
            }

            return diff;
        };

        var addDiffTime = function (time, diffTime) {
            var start = moment(time, 'DD.MM.YYYY HH:mm');
            var diff = moment(difftime, 'HH:mm');
            var end = time;

            if ( start.isValid() && duration.isValid() ) {
                var newtime = start.add(duration);
                end = moment(newtime).format('DD.MM.YYYY HH:mm');
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
