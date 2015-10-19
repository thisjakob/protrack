/* global Firebase */
'use strict';

angular.module('protrack')
    .controller('TracksCtrl', ['dataService', function (dataService) {
        var tracksCtrl = this;
        tracksCtrl.addTrackVisible = false;

        tracksCtrl.tracks = dataService.getData();

        tracksCtrl.showAddTrack = function() {
            tracksCtrl.addTrackVisible = true;
        };
        tracksCtrl.hideAddTrack = function() {
            tracksCtrl.addTrackVisible = false;
        };

        tracksCtrl.save = function() {
            console.log('Datum: ' + tracksCtrl.date);
            dataService.addData({
                'date' : tracksCtrl.date,
                'title' : tracksCtrl.title,
                'tag' : tracksCtrl.tag,
                'desc' : tracksCtrl.desc,
                'time' : tracksCtrl.time
            });
        };

        tracksCtrl.updateTrack = function(data, key) {
            console.log('update track: ' + key);
            dataService.updateData(key, data);
        };

        tracksCtrl.deleteItem = function(id){
            console.log('Delete Item: ' + id);
            dataService.delData(id);
        };

        tracksCtrl.writeID = function(id) {
            console.log('Edit Item: ' + id);
        };
    }]);

// .$loaded().then (function(){}) when loaded

// isolierter Scope: Icon in einzelnem Element einer Liste ==> LIN
// git remote für repo auf USB-Stick
