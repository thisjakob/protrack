'use strict';

angular.module('protrack').factory('dataService', ['$firebaseArray', '$q', function ($firebaseArray, $q) {
    var firebaseRef= new Firebase('https://boiling-inferno-5742.firebaseio.com');

    var getFirebaseRoot = function(){
        return firebaseRef;
    };

    var getTrackNodes = function(){
        return getFirebaseRoot().child('works'); // TODO change to tracks or projects
    };

    var getData = function(callback){
        var ref = getTrackNodes();
        return $firebaseArray(ref);
    };

    var addData = function(data){
        var ref = getTrackNodes();
        return  ref.push(data);
    };

    var service = {
        addData : addData,
        getData: getData,
        getTrackNodes: getTrackNodes
    };

    return service;

}]);

// remember: '$q' promises : http://www.42id.com/articles/angular-js-and-firebase/

/* data : TODO Datenstruktur bestimmern

 */