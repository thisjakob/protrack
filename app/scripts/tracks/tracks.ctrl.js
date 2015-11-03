/* global $, moment */
'use strict';

angular.module('protrack')
    .controller('TracksCtrl', ['dataService', '$filter', 'Auth', function (dataService, $filter, Auth) {
        var tracksCtrl = this;
        var auth = Auth.$getAuth();
        var path = 'users/' + auth.uid + '/';

        tracksCtrl.tracksArray = dataService.getData(path + 'tracks', true);
        tracksCtrl.projectsArray = dataService.getData(path + 'projects', true);
        tracksCtrl.projects = dataService.getData(path + 'projects', false);
        tracksCtrl.tagsAll = dataService.getData(path + 'tags', false);
        tracksCtrl.tags = [];

        // create track and save it to compare to show form
        tracksCtrl.createTrackElement = function () {
            $('#addtrack').prop('disabled', true);
            tracksCtrl.newTrack = {
                starttime: moment().format('DD.MM.YYYY HH:mm:ss'),
                project: '',
                desc: '',
                tags: '',
                endtime: '', // with http://vitalets.github.io/combodate/
                record: false
            };
            dataService.addData(path + 'tracks', tracksCtrl.newTrack);
        };

        tracksCtrl.updateTrack = function (data, key) {
            console.log('update track: ' + key);
            dataService.updateData(path + 'tracks', key, data);
            $('#addtrack').prop('disabled', false);
        };

        tracksCtrl.showProject = function(project) {
            var selected = $filter('filter')(tracksCtrl.projectsArray, {$id: project});
            return (project && selected.length) ? selected[0].name : 'Not set';
        };

        tracksCtrl.loadTags = function(project) {
            var tags = [];
            if (tracksCtrl.tags.length === 0) {
                angular.forEach(tracksCtrl.projects[project].tags, function(tagid) {
                    var tag = tracksCtrl.tagsAll[tagid];
                    if (tag !== undefined) {
                        tag.$id = tagid;
                        tags.push(tag);
                    }
                });
            }
            return tags;
        };

        tracksCtrl.showTags = function(project, tags) {
          var selected = [];
          angular.forEach(tracksCtrl.loadTags(project), function(tag) {
            angular.forEach(tags, function(tagproject) {
              if (tag.$id.indexOf(tagproject) >= 0) {
                  if (tag.name !== undefined) {
                      selected.push(tag.name);
                  }
              }
            });
          });
          return selected.length ? selected.join(', ') : 'Not set';
        };

        tracksCtrl.deleteTrack = function (id) {
            console.log('Delete Item: ' + id);
            dataService.delData(path + 'tracks', id);
            $('#addtrack').prop('disabled', false);
        };

        tracksCtrl.writeID = function (id) {
            console.log('Edit Item: ' + id);
        };
    }]);

// .$loaded().then (function(){}) when loaded

// isolierter Scope: Icon in einzelnem Element einer Liste ==> LIN
// git remote für repo auf USB-Stick
