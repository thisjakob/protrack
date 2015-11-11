(function () {
    'use strict';

    angular.module('protrack')
        .controller('ReportsCtrl', ['dataService', 'authData', 'showData', function (dataService, authData, showData) {
            var reportsCtrl = this;
            var path = 'users/' + authData.uid + '/';

            reportsCtrl.tagsArray = dataService.getData(path + 'tags', true);
            reportsCtrl.tracksArray = dataService.getData(path + 'tracks', true);
            reportsCtrl.projectsArray = dataService.getData(path + 'projects', true);

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

        }]);
})();