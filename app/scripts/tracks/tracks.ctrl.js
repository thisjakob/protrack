'use strict';

angular.module('protrack')
    .controller('TracksCtrl', ['dataService', function (dataService) {
        var tracksCtrl = this;
        var type = 'tracks';

        tracksCtrl.addTrackVisible = false;

        tracksCtrl.tracks = dataService.getData(type);

        tracksCtrl.showAddTrack = function() {
            tracksCtrl.addTrackVisible = true;
        };
        tracksCtrl.hideAddTrack = function() {
            tracksCtrl.addTrackVisible = false;
        };

        // TODO neues Element zuerst leer erzeugen und dann wird es editable angezeigt bzw. danach update element

        tracksCtrl.save = function() {
            console.log('Datum: ' + tracksCtrl.date);
            dataService.addData(type, {
                'date' : tracksCtrl.date,
                'title' : tracksCtrl.title,
                'tag' : tracksCtrl.tag,
                'desc' : tracksCtrl.desc,
                'time' : tracksCtrl.time
            });
        };

        tracksCtrl.updateTrack = function(data, key) {
            console.log('update track: ' + key);
            dataService.updateData(type, key, data);
        };

        tracksCtrl.deleteItem = function(id){
            console.log('Delete Item: ' + id);
            dataService.delData(type, id);
        };

        tracksCtrl.writeID = function(id) {
            console.log('Edit Item: ' + id);
        };
    }]);

// .$loaded().then (function(){}) when loaded

// isolierter Scope: Icon in einzelnem Element einer Liste ==> LIN
// git remote für repo auf USB-Stick
