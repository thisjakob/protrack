'use strict';

angular.module('protrack').factory('dataService', ['$firebaseArray', '$q', 'FirebaseUrl', function ($firebaseArray, $q, FirebaseUrl) {
    var url = FirebaseUrl;
    var tracks = 'tracks';

    var firebaseRef= new Firebase(url);

    var getFirebaseRoot = function(){
        return firebaseRef;
    };

    var getTrackNodes = function(){
        return getFirebaseRoot().child('tracks');
    };

    var getData = function(callback){
      //console.log("dataService get data!");
        var ref = getTrackNodes();
        return $firebaseArray(ref);
    };

    var addData = function(data){
        //console.log("dataService add data!");
        var ref = getTrackNodes();
        return  ref.push(data);
    };

    var delData = function(id) {
        //console.log("dataService remove data: " + id);
        var itemRef = new Firebase(url + '/' + tracks + '/' + id);
        itemRef.remove();
    };

    var updateData = function(id, data) {
        //console.log("dataService update data: " + id);
      var itemRef = new Firebase(url + '/' + tracks + '/' + id);
      itemRef.update(data);
    };

    var service = {
        addData : addData,
        getData : getData,
        delData : delData,
        updateData : updateData,
        getTrackNodes: getTrackNodes
    };

    return service;

}]);

// remember: '$q' promises : http://www.42id.com/articles/angular-js-and-firebase/
// data : TODO Datenstruktur bestimmen
