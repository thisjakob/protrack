/* global Firebase */
'use strict';

angular.module('protrack')
    .factory('FirebaseService', ['$firebaseArray', function ($firebaseArray) {
      console.log('Factory WorkService:');
      var ref = new Firebase('https://boiling-inferno-5742.firebaseio.com/works');
      return $firebaseArray(ref);
    }])

    .controller('MainCtrl', ['FirebaseService', function (FirebaseService) {
        var vm =this;

        function getRandomId() {
            return Math.floor((Math.random()*6)+1);
        }
        vm.works = FirebaseService;
        vm.save = function() {
            console.log('Datum: ' + vm.date);
            var ref = new Firebase('https://boiling-inferno-5742.firebaseio.com/works');
            ref.push({
                'id' : getRandomId(),
                'date' : vm.date,
                'title' : vm.title,
                'tag' : vm.tag,
                'desc' : vm.desc,
                'time' : vm.time
            });
        };
    }]);
/*    .service('RndId', function() {
            var length = 8;
            var timestamp = +new Date();

            var _getRandomInt = function( min, max ) {
                return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
            };

            var generate = function() {
                var ts = timestamp.toString();
                var parts = ts.split( '' ).reverse();
                var id = '';

                for( var i = 0; i < length; ++i ) {
                    var index = _getRandomInt( 0, parts.length - 1 );
                    id += parts[index];
                }

                return id;
            };
        return generate();
    });*/

// .$loaded().then (function(){}) when loaded

// isolierter Scope: Icon in einzelnem Element einer Liste ==> LIN
// git remote für repo auf USB-Stick