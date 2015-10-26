/* global $, moment */
'use strict';

angular.module('protrack')
    .controller('TracksCtrl', ['dataService', '$filter', function (dataService, $filter) {
        var tracksCtrl = this;
        var path = 'users/iduser1/';
        tracksCtrl.tracks = dataService.getData(path + 'tracks');
        tracksCtrl.projects = dataService.getData(path + 'projects');
        tracksCtrl.tags = dataService.getData(path + 'tags');

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
            var selected = $filter('filter')(tracksCtrl.projects, {$id: project});
            return (project && selected.length) ? selected[0].name : 'Not set';
        };

        tracksCtrl.showTags = function(tags) {
          var selected = [];
          angular.forEach(tracksCtrl.tags, function(tag) {
            angular.forEach(tags, function(tagproject) {
              if (tag.$id.indexOf(tagproject) >= 0) {
                selected.push(tag.name);
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
