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
            var starttime = moment('00:00', 'HH:mm');
            var sum = moment('00:00', 'HH:mm');
            angular.forEach(tracks, function(track){
                sum = calcTime.addDiffTime(sum, moment(track.difftime, 'HH:mm'));
            });
            return calcTime.diffTime(starttime, moment(sum, 'DD.MM.YYYY HH:mm'));
        };

        var utilities = {
            sumDuration: sumDuration
        };

        return utilities;

    }]);
})();
