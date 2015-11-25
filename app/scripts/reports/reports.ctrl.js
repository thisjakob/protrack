(function () {
    'use strict';
    // TODO export to csv
    // TODO Filter for Project und Tag
    // TODO search Description
    angular.module('protrack')
        .controller('ReportsCtrl', ['dataService', 'authData', 'showData', 'reportUtilities', function (dataService, authData, showData, reportUtilities) {
            var reportsCtrl = this;
            var path = 'users/' + authData.uid + '/';

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

            reportsCtrl.showProjectName = function (project) {
                return showData.showDataName(reportsCtrl.projectsArray, project);
            };

            reportsCtrl.showTagsName = function (tags) {
                var selected = [];
                angular.forEach(tags, function (tag) {
                    var name = showData.showDataName(reportsCtrl.tagsArray, tag);
                    if (name !== undefined) {
                        selected.push(name);
                    }
                });
                return selected.length ? selected.sort().join(', ') : 'No tag';
            };

            reportsCtrl.saveDate = function () {
                var date = reportsCtrl.dateFrom.toString();
                dataService.setData(path + 'settings/daterange/from', date);
                if (reportsCtrl.dateTo.getHours() === 0) {
                    reportsCtrl.dateTo.setHours(reportsCtrl.dateTo.getHours() + 23);
                    reportsCtrl.dateTo.setMinutes(reportsCtrl.dateTo.getMinutes() + 59);
                }
                date = reportsCtrl.dateTo.toString();
                dataService.setData(path + 'settings/daterange/to', date);
            };

            reportsCtrl.sumDur = function (tracks) {
                var sum = reportUtilities.sumDuration(tracks);
                return sum.substr(0, sum.length - 3);
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
        }]);
})();