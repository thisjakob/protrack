;(function () {
    'use strict';
    angular.module('protrack')
        .controller('ReportsCtrl', ['dataService', 'authData', '$filter', 'showData', 'reportUtilities', 'toastr', function (dataService, authData, $filter, showData, reportUtilities, toastr) {
            var reportsCtrl = this;
            var path = 'users/' + authData.uid + '/';

            /**
             * do some stuff when the view is loaded
             */
            reportsCtrl.init = function() {
                reportsCtrl.tagsArray = dataService.getData(path + 'tags', true);
                reportsCtrl.tracksArray = dataService.getData(path + 'tracks', true);
                reportsCtrl.projectsArray = dataService.getData(path + 'projects', true);

                // read data range
                reportsCtrl.dateFrom = new Date();
                reportsCtrl.dateTo = new Date();
                dataService.getValue(path + 'settings/daterange/', function (snapshot) {
                    var range = snapshot.val();
                    if (range !== null) {
                        if (range.from !== undefined) {
                            reportsCtrl.dateFrom = new Date(range.from);
                        }
                        if (range.to !== undefined) {
                            reportsCtrl.dateTo = new Date(range.to);
                        }
                    }
                });

                // add additional data to all tracks objects as soon as they are loaded
                reportsCtrl.tagsArray.$loaded().then(function(){
                    reportsCtrl.tracksArray.$loaded().then(function(tracks){
                        angular.forEach(tracks, function(track){
                            track.starttimestamp = moment(track.starttime, 'DD.MM.YYYY HH:mm:ss').format('X');
                            expandTrack(track);
                        });
                    });
                });
            };

            /**
             * Expand each object in the tracks array by
             * resolving the project and all tags within.
             * Also sort the array initially
             */
            var expandTrack = function(track){
                // resolve tag name for tag id
                var tags = [], tagNames = [];
                angular.forEach(track.tags, function(tagId){
                    var tagObj = $filter('filter')(reportsCtrl.tagsArray, {$id:tagId}, true)[0];
                    if (tagObj !== undefined) {
                        tagNames.push(tagObj.name);
                        tags.push(tagObj);
                    } else {
                        console.log("Tag id " + tagId + " not defined!");
                    }
                });
                track.tags = tags;
                track.tagNames = tagNames;
            };

            /**
             * Resolve the project name from id
             * @param project id
             * @returns String
             */
            reportsCtrl.showProjectName = function (project) {
                return showData.showDataName(reportsCtrl.projectsArray, project);
            };

            /**
             * Save start and end date to DB
             */
            reportsCtrl.saveDate = function () {
                var date = reportsCtrl.dateFrom.toString();
                dataService.setData(path + 'settings/daterange/from', date);
                if (reportsCtrl.dateTo.getHours() === 0) {
                    reportsCtrl.dateTo.setHours(reportsCtrl.dateTo.getHours() + 23);
                    reportsCtrl.dateTo.setMinutes(reportsCtrl.dateTo.getMinutes() + 59);
                }
                date = reportsCtrl.dateTo.toString();
                dataService.setData(path + 'settings/daterange/to', date);
                if (reportsCtrl.dateFrom > reportsCtrl.dateTo) {
                    toastr.warning("End date (" + onlyDate(reportsCtrl.dateTo) + ") is before start date (" + onlyDate(reportsCtrl.dateFrom) + ")!");
                }
            };

            /**
             * get summary of duration of all tracks
             * @param tracks
             * @returns {string}
             */
            reportsCtrl.sumDur = function (tracks) {
                return reportUtilities.sumDuration(tracks);
            };

            /**
             * push each track as array in a array
             * @param tracks
             * @returns {Array} array of array of track-data
             */
            reportsCtrl.writeCsv = function (tracks) {
                var csv = [];
                angular.forEach (tracks, function (track) {
                    var item = [];
                    item.push("'" + track.desc.replace(/'/,"\'") + "'");
                    item.push("'" + showData.showDataName(reportsCtrl.projectsArray, track.project) + "'");
                    var tags = '';
                    angular.forEach(track.tags, function(tag) {
                        tags = tags + showData.showDataName(reportsCtrl.tagsArray, tag);
                    });
                    item.push("'" + tags.replace(/'/,"\'") + "'");
                    item.push("'" + track.starttime + "'");
                    item.push("'" + track.endtime + "'");
                    item.push("'" + track.difftime + "'");
                    csv.push(item);
                });
                return csv;
            };

            /**
             * build filename with actual datetime
             * @returns {string}
             */
            reportsCtrl.getFilename = function() {
                var from = reportsCtrl.dateFrom.getFullYear().toString() + '_'+ reportsCtrl.dateFrom.getMonth() + '_'+ reportsCtrl.dateFrom.getDate();
                var to = reportsCtrl.dateTo.getFullYear().toString() + '_'+ reportsCtrl.dateTo.getMonth() + '_'+ reportsCtrl.dateTo.getDate();
                return 'protrack-' + from + '-' + to + '.csv';
            };

            /**
             * show only date string of a Date object
             * @param date      Date object
             * @returns {string}
             */
            var onlyDate = function (date) {
                return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
            };

            reportsCtrl.init();
        }]);
})();