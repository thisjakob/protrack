/* global Firebase */
'use strict';

angular.module('protrack')
    .controller('MainCtrl', ['dataService', function (dataService) {
        var vm = this;
        vm.addTrackVisible = false;

        vm.tracks = dataService.getData();

        vm.showAddTrack = function() {
            vm.addTrackVisible = true;
            vm.data = '000';
        };
        vm.hideAddTrack = function() {
            vm.addTrackVisible = false;
        };

        vm.save = function() {
            console.log('Datum: ' + vm.date);
            dataService.addData({
                'date' : vm.date,
                'title' : vm.title,
                'tag' : vm.tag,
                'desc' : vm.desc,
                'time' : vm.time
            });
        };

        vm.updateTrack = function(data, key) {
            console.log('update track: ' + key);
            dataService.updateData(key, data);
        };

        vm.deleteItem = function(id){
            console.log('Delete Item: ' + id);
            dataService.delData(id);
        };

        vm.writeID = function(id) {
            console.log('Edit Item: ' + id);
        };
    }]);

// .$loaded().then (function(){}) when loaded

// isolierter Scope: Icon in einzelnem Element einer Liste ==> LIN
// git remote für repo auf USB-Stick
