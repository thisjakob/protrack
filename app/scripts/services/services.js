/* global Firebase */
'use strict';

angular.module('protrack').factory('dataService', ['$firebaseArray', '$q', 'FirebaseUrl', function ($firebaseArray, $q, FirebaseUrl) {
    var firebaseUrl = FirebaseUrl.url;

    //var firebaseRef= new Firebase(firebaseUrl);

    var getUrl = function() {
        return firebaseUrl;
    };

    var setUrl = function(url) {
        firebaseUrl = url;
        FirebaseUrl.url = url;
    };

    var getFirebaseRoot = function(){
        return new Firebase(firebaseUrl);
    };

    var getNodes = function(type){
        return getFirebaseRoot().child(type);
    };

    var getData = function(type){
      //console.log("dataService get data!");
        var ref = getNodes(type);
        return $firebaseArray(ref);
    };

    var addData = function(type, data){
        //console.log("dataService add data!");
        var ref = getNodes(type);
        return  ref.push(data);
    };

    var delData = function(type, id) {
        //console.log("dataService remove data: " + id);
        var itemRef = new Firebase(firebaseUrl + '/' + type + '/' + id);
        itemRef.remove();
    };

    var updateData = function(type, id, data) {
        //console.log("dataService update data: " + id);
      var itemRef = new Firebase(firebaseUrl + '/' + type + '/' + id);
      itemRef.update(data);
    };

    var service = {
        getUrl: getUrl,
        setUrl: setUrl,
        addData : addData,
        getData : getData,
        delData : delData,
        updateData : updateData,
        getNodes: getNodes
    };

    return service;

}]);

// remember: '$q' promises : http://www.42id.com/articles/angular-js-and-firebase/
// data : TODO Datenstruktur bestimmen
