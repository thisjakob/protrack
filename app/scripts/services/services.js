'use strict';

angular.module('protrack').factory('dataService', ['$firebaseArray', '$q', function ($firebaseArray, $q) {
    var url = 'https://boiling-inferno-5742.firebaseio.com';
    var tracks = 'tracks';

    var firebaseRef= new Firebase(url);

    var getFirebaseRoot = function(){
        return firebaseRef;
    };

    var getTrackNodes = function(){
        return getFirebaseRoot().child('tracks');
    };

    var getData = function(callback){
        var ref = getTrackNodes();
        return $firebaseArray(ref);
    };

    var addData = function(data){
        var ref = getTrackNodes();
        return  ref.push(data);
    };

    var delData = function(id) {
        var itemRef = new Firebase(url + '/' + tracks + '/' + id);
        itemRef.remove()
    };

    var service = {
        addData : addData,
        getData: getData,
        delData: delData,
        getTrackNodes: getTrackNodes
    };

    return service;

}]);

// TODO update track
// remember: '$q' promises : http://www.42id.com/articles/angular-js-and-firebase/
// data : TODO Datenstruktur bestimmen
