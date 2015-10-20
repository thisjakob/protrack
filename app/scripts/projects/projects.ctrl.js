'use strict';

angular.module('protrack')
    .controller('ProjectsCtrl', ['dataService', function (dataService) {
        var projectsCtrl = this;
        var type = 'projects';

        projectsCtrl.addProjectVisible = false;

        projectsCtrl.projects = dataService.getData(type);

        projectsCtrl.showAddProject = function() {
            projectsCtrl.addProjectVisible = true;
        };
        projectsCtrl.hideAddProject = function() {
            projectsCtrl.addProjectVisible = false;
        };

        // TODO neues Element zuerst leer erzeugen und dann wird es editable angezeigt bzw. danach update element

        projectsCtrl.save = function() {
            console.log('Datum: ' + projectsCtrl.title);
            dataService.addData(type, {
                'title' : projectsCtrl.title,
                'tag' : projectsCtrl.tag,
                'desc' : projectsCtrl.desc
            });
        };

        projectsCtrl.updateProject = function(data, key) {
            console.log('update project: ' + key);
            dataService.updateData(type, key, data);
        };

        projectsCtrl.deleteItem = function(id){
            console.log('Delete Item: ' + id);
            dataService.delData(type, id);
        };

        projectsCtrl.writeID = function(id) {
            console.log('Edit Item: ' + id);
        };
    }]);
