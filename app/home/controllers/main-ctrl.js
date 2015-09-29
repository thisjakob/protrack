/* global Firebase */
'use strict';

var app = angular.module('testfirebase', ['firebase']);

app.constant('FIREBASE_URI', 'https://boiling-inferno-5742.firebaseio.com/works');

app.factory('WorkService', ['$firebaseArray', function ($firebaseArray, FIREBASE_URI) {
    console.log('Factory WorkService:');
    var ref = new Firebase('https://boiling-inferno-5742.firebaseio.com/works');
    return $firebaseArray(ref);
}]);
app.controller('MainCtrl', ['$scope', 'WorkService', function($scope, WorkService) {
        console.log('Controller MainCtrl');
        $scope.works = WorkService;
    }]);



/*angular.module('testfirebase')
    .controller('MainCtrl', ['$scope', '$firebase', function ($scope, $firebase) {
  	    // now we can use $firebase to synchronize data between clients and the server!
  	    var ref = new Firebase('https://boiling-inferno-5742.firebaseio.com/works');
        //var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
        ref.on('value', function(snapshot) {
            console.log("Works: " );
            console.log(snapshot.val());
            $scope.works = snapshot.val();
        }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
        });

        $scope.works = [];
        var w = [
                {
                    "desc" : "write spec",
                    "time" : 3,
                    "tag" : "V.00090.11000.02",
                    "date" : "24.09.2015"
                },
                {
                    "desc" : "test spec",
                    "time" : 2,
                    "tag" : "U.00413.10000.01",
                    "date" : "25.09.2015"
                },
                {
                    "desc" : "test integration",
                    "time" : 3,
                    "tag" : "V.00090.12000.02",
                    "date" : "28.09.2015"
                },
                {
                    "desc" : "write spec",
                    "time" : 5,
                    "tag" : "V.00090.11000.02",
                    "date" : "29.09.2015"
                }
            ];
        console.log("W:");
        console.log(w);
    }]);
*/