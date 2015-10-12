/* global Firebase */
'use strict';

angular.module('protrack')
    .controller('MainCtrl', ['dataService', function (dataService) {
        var vm =this;

        function getRandomId() {
            var min = 10000000;
            var max = min * 10 - 1;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        vm.works = dataService.getData();
        vm.save = function() {
            console.log('Datum: ' + vm.date);
            dataService.addData({
                'id' : getRandomId(),
                'date' : vm.date,
                'title' : vm.title,
                'tag' : vm.tag,
                'desc' : vm.desc,
                'time' : vm.time
            });
        };
    }]);

// .$loaded().then (function(){}) when loaded

// isolierter Scope: Icon in einzelnem Element einer Liste ==> LIN
// git remote für repo auf USB-Stick