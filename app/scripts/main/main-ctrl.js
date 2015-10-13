/* global Firebase */
'use strict';

angular.module('protrack')
    .controller('MainCtrl', ['dataService', function (dataService) {
        var vm =this;

        vm.tracks = dataService.getData();

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