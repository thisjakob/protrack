/* global $ */
;(function () {
    'use strict';

    angular.module('protrack')
        .controller('ProjectsCtrl', ['dataService', 'authData', function (dataService, authData) {
            var projectsCtrl = this;
            var path = 'users/';

            path = path + authData.uid + '/';

            projectsCtrl.projectsArray = dataService.getData(path + 'projects', true);
            projectsCtrl.tags = dataService.getData(path + 'tags', false);
            projectsCtrl.tagsArray = dataService.getData(path + 'tags', true);

            projectsCtrl.createProject = function () {
                $('#addproject').prop('disabled', true);
                projectsCtrl.newProject = {
                    name: '',
                    tags: ''
                };
                dataService.addData(path + 'projects', projectsCtrl.newProject);
            };

            projectsCtrl.createTag = function () {
                $('#addtag').prop('disabled', true);
                projectsCtrl.newTag = {
                    name: '',
                    desc: '',
                    project: false
                };
                dataService.addData(path + 'tags', projectsCtrl.newTag);
            };

            projectsCtrl.updateProject = function (data, key) {
                console.log('update project: ' + key);
                angular.forEach(data.tags, function(tagid){
                    dataService.updateData(path + 'tags', tagid, {project: true});
                });
                dataService.updateData(path + 'projects', key, data);
                $('#addproject').prop('disabled', false);
            };

            projectsCtrl.updateTag = function (data, key) {
                console.log('update tag: ' + data.name + ': ' + data.desc + ' with key: ' + key);
                dataService.updateData(path + 'tags', key, data);
                $('#addtag').prop('disabled', false);
            };

            projectsCtrl.loadTagname = function (tag) {
                return tag.name + ": " + tag.desc;
            };

            projectsCtrl.showTags = function (tags) {
                var selected = [];
                angular.forEach(projectsCtrl.tagsArray, function (tag) {
                    angular.forEach(tags, function (tagproject) {
                        if (tag.$id.indexOf(tagproject) >= 0) {
                            selected.push(tag.name);
                        }
                    });
                });
                return selected.length ? selected.sort().join(', ') : 'No tags';
            };

            // TODO nach delete entsprechende Referenzen entfernen
            projectsCtrl.deleteItem = function (item, id) {
                console.log('Delete ' + item + ': ' + id);
                dataService.delData(path + item + 's', id);
                $('#add' + item).prop('disabled', false);
            };
        }]);
})();
