(function () {
    'use strict';

    angular.module('protrack')
        .controller('ReportsCtrl', ['dataService', 'authData', 'showData', function (dataService, authData, showData) {
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
                    if (range.from !== 'Invalid Date') {
                        reportsCtrl.dateFrom = new Date(range.from);
                    }
                    if (range.to !== 'Invalid Date') {
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
                date = reportsCtrl.dateTo.toString();
                dataService.setData(path + 'settings/daterange/to', date);
            };

            reportsCtrl.getMinDate = function () {
                return reportsCtrl.dateFrom.getMonth() - 2;
            };

            reportsCtrl.getMaxDate = function () {
                return reportsCtrl.dateFrom;
            };
        }])

        .filter('daterange', function () {
            return function (items, from, to) {
                return items.filter(function (item) {
                    return moment(item.starttime, 'DD.MM.YYYY HH:mm').isBetween(from, to);
                });
            };
        })
        .config(function($mdDateLocaleProvider) {
            $mdDateLocaleProvider.firstDayOfWeek = 1;
        });
})();