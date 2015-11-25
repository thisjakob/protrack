/* global moment */

(function () {
    'use strict';

    angular.module('protrack').factory('calcTime', [function () {

        var diffTime = function (startTime, endTime) {
            var hours = '00:00:00';
            var diff = '';
            var start = moment(startTime, 'DD.MM.YYYY HH:mm:ss');
            var end = moment(endTime, 'DD.MM.YYYY HH:mm:ss');

            if ( start.isValid() && end.isValid() ) {
                diff = moment.utc(end.diff(start)).format("DDHH:mm:ss");
                hours = ((Number(diff.substr(0, 2)) - 1) * 24 + Number(diff.substr(2, 2))).toString() + diff.substr(4);
            } else {
                console.log('endtime or starttime is not valid!');
            }

            return hours;
        };

        var addDiffTime = function (time, diffTime) {
            var start = moment(time, 'DD.MM.YYYY HH:mm');
            var duration = moment(diffTime, 'HH:mm');
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
