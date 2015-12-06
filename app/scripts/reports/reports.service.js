/* global moment */

(function () {
    'use strict';

    angular.module('protrack').factory('reportUtilities', ['calcTime', function (calcTime) {

        /**
         * sum of duration of the tracks
         * @param tracks
         * @returns {string} sum of durations 'HHH:mm:ss'
         */
        var sumDuration = function (tracks) {
            var starttime = moment('00:00:00', 'HH:mm:ss');
            var sum = moment('00:00:00', 'HH:mm:ss');
            angular.forEach(tracks, function(track){
                sum = calcTime.addDiffTime(sum, moment(track.difftime, 'HH:mm:ss'));
            });
            return calcTime.diffTime(starttime, moment(sum, 'HH:mm:ss'));
        };

        var utilities = {
            sumDuration: sumDuration
        };

        return utilities;

    }]);
})();
