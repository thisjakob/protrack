/* global Firebase */
'use strict';

var app = angular.module('protrack', ['firebase']);

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
