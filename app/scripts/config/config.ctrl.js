;(function () {
    'use strict';

    angular.module('protrack')
        .controller('ConfigCtrl', ['dataService', 'authData', function (dataService, authData) {
            var configCtrl = this;
            var path = 'users/';

            path = path + authData.uid + '/';

            /**
             * initialize
             */
            configCtrl.init = function() {
                configCtrl.projectsArray = dataService.getData(path + 'projects', true);
                configCtrl.tags = dataService.getData(path + 'tags', false);
                configCtrl.tagsArray = dataService.getData(path + 'tags', true);
            };

            /**
             * create project and save in DB
             */
            configCtrl.createProject = function () {
                configCtrl.newProject = {
                    name: '',
                    tags: ''
                };
                dataService.addData(path + 'projects', configCtrl.newProject);
            };

            /**
             * create tag and save in DB
             */
            configCtrl.createTag = function () {
                configCtrl.newTag = {
                    name: '',
                    desc: '',
                    project: false
                };
                dataService.addData(path + 'tags', configCtrl.newTag);
            };

            /**
             * update project in DB
             * @param data
             * @param key
             */
            configCtrl.updateProject = function (data, key) {
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
            configCtrl.updateTag = function (data, key) {
                console.log('update tag: ' + data.name + ': ' + data.desc + ' with key: ' + key);
                dataService.updateData(path + 'tags', key, data);
            };

            /**
             * load tag name and description for a given tag
             * @param tag
             * @returns {string}
             */
            configCtrl.loadTagname = function (tag) {
                return tag.name + ": " + tag.desc;
            };

            /**
             * show tags comma seperated
             * @param tags
             * @returns {string}
             */
            configCtrl.showTags = function (tags) {
                var selected = [];
                angular.forEach(configCtrl.tagsArray, function (tag) {
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
            configCtrl.deleteItem = function (type, id) {
                console.log('Delete ' + type + ': ' + id);
                // TODO nach delete entsprechende Referenzen entfernen

                dataService.delData(path + type + 's', id);
            };
            
            configCtrl.init();
        }]);
})();
