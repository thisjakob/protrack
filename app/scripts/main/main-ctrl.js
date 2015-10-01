/* global Firebase */
'use strict';

angular.module('protrack')
  .controller('MainCtrl', function ($scope, $firebaseArray) {
  	// now we can use $firebase to synchronize data between clients and the server!
    var ref = new Firebase('https://boiling-inferno-5742.firebaseio.com/works');
    $scope.works = $firebaseArray(ref);
  });
