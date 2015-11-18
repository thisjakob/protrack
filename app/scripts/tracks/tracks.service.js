/* global moment */

(function () {
    'use strict';

    angular.module('protrack').factory('calcTime', [function () {

        var diffTime = function (startTime, endTime) {
            var diff = '00:00';
            var start = moment(startTime, 'DD.MM.YYYY HH:mm');
            var end = moment(endTime, 'DD.MM.YYYY HH:mm');

            if (start.isValid() && end.isValid()) {
                diff = moment.utc(end.diff(start)).format("HH:mm");
            } else {
                console.log('endtime or starttime is not valid!');
            }
            return diff;
        };

        var addDiffTime = function (time, diffTime) {
            var endtime = time;
            if (moment(time, 'DD.MM.YYYY HH:mm').isValid() && moment(diffTime, 'HH:mm').isValid()) {
                var newtime = moment(time, 'DD.MM.YYYY HH:mm').add(moment(diffTime, 'HH:mm'));
                endtime = moment(newtime).format('DD.MM.YYYY HH:mm');
            }
            return endtime;
        };


        var time = {
            diffTime: diffTime,
            addDiffTime: addDiffTime
        };

        return time;
    }]);
})();
