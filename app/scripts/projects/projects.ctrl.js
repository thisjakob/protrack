;(function () {
    'use strict';

    angular.module('protrack')
        .controller('ProjectsCtrl', ['dataService', 'authData', function (dataService, authData) {
            var projectsCtrl = this;
            var path = 'users/';

            path = path + authData.uid + '/';

            /**
             * initialize
             */
            projectsCtrl.init = function() {
                projectsCtrl.projectsArray = dataService.getData(path + 'projects', true);
                projectsCtrl.tags = dataService.getData(path + 'tags', false);
                projectsCtrl.tagsArray = dataService.getData(path + 'tags', true);
            };

            /**
             * create project and save in DB
             */
            projectsCtrl.createProject = function () {
                projectsCtrl.newProject = {
                    name: '',
                    tags: ''
                };
                dataService.addData(path + 'projects', projectsCtrl.newProject);
            };

            /**
             * create tag and save in DB
             */
            projectsCtrl.createTag = function () {
                projectsCtrl.newTag = {
                    name: '',
                    desc: '',
                    project: false
                };
                dataService.addData(path + 'tags', projectsCtrl.newTag);
            };

            /**
             * update project in DB
             * @param data
             * @param key
             */
            projectsCtrl.updateProject = function (data, key) {
                console.log('update project: ' + key);
                angular.forEach(data.tags, function(tagid){
                    dataService.updateData(path + 'tags', tagid, {project: true});
                });
                dataService.updateData(path + 'projects', key, data);
            };

            /**
             * update tag in DB
             * @param data
             * @param key
             */
            projectsCtrl.updateTag = function (data, key) {
                console.log('update tag: ' + data.name + ': ' + data.desc + ' with key: ' + key);
                dataService.updateData(path + 'tags', key, data);
            };

            /**
             * load tag name and description for a given tag
             * @param tag
             * @returns {string}
             */
            projectsCtrl.loadTagname = function (tag) {
                return tag.name + ": " + tag.desc;
            };

            /**
             * show tags comma seperated
             * @param tags
             * @returns {string}
             */
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

            /**
             * delete item with id in DB
             * @param item {string}
             * @param id
             */
            projectsCtrl.deleteItem = function (type, id) {
                console.log('Delete ' + type + ': ' + id);
                // TODO nach delete entsprechende Referenzen entfernen

                dataService.delData(path + type + 's', id);
            };
            
            projectsCtrl.init();
        }]);
})();
