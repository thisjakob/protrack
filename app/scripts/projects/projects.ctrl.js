/* global $ */
'use strict';

angular.module('protrack')
    .controller('ProjectsCtrl', ['dataService', function (dataService) {
        var projectsCtrl = this;
        var path = 'users/iduser1/';

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
                desc: ''
            };
            dataService.addData(path + 'tags', projectsCtrl.newTag);
        };

        projectsCtrl.updateProject = function (data, key) {
            console.log('update project: ' + key);
            dataService.updateData(path + 'projects', key, data);
            $('#addproject').prop('disabled', false);
        };

        projectsCtrl.updateTag = function (data, key) {
            console.log('update tag: ' + key);
            dataService.updateData(path + 'tags', key, data);
            $('#addtag').prop('disabled', false);
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
            return selected.length ? selected.join(', ') : 'Not set';
        };

        projectsCtrl.deleteItem = function (item, id) {
            console.log('Delete ' + item + ': ' + id);
            dataService.delData(path + item + 's', id);
            $('#add' + item).prop('disabled', false);
        };

        projectsCtrl.writeID = function (id) {
            console.log('Edit Item: ' + id);
        };
    }]);

// TODO  projektspezifische Tags und nicht projektspezifische Tags (in keinem Projekt zugeordnet) in der Liste anzeigen