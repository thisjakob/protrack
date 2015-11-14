/* global moment */

(function () {
    'use strict';

    angular.module('protrack').factory('calcTime', [function () {

        var diffTime = function (startTime, endTime) {
            var difftime = '00:00';
            if (moment(startTime, "DD.MM.YYYY HH:mm").isValid() && moment(endTime, "DD.MM.YYYY HH:mm").isValid()) {
                // difftime = endtime - starttime
                var diff = moment.utc(moment(endTime,"DD.MM.YYYY HH:mm").diff(moment(startTime,"DD.MM.YYYY HH:mm"))).format("HH:mm");
                difftime = diff;
            } else {
                console.log('endtime or starttime is not valid!');
            }
            return difftime;
        };

        var addDiffTime = function (time, diffTime) {
            var endtime = time;
            if (moment(time).isValid() && moment(diffTime, 'HH:mm').isValid()) {
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
