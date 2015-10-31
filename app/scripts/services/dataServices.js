/* global Firebase */
'use strict';

angular.module('protrack').factory('dataService', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', function ($firebaseArray, $firebaseObject, FirebaseUrl) {
    var firebaseUrl = FirebaseUrl.url;
    var firebaseRef= new Firebase(firebaseUrl);

    var getUrl = function() {
        return firebaseUrl;
    };

    var setUrl = function(url) {
        /*firebaseUrl = url;
        FirebaseUrl.url = url;*/
    };

    var getFirebaseRoot = function(){
        return firebaseRef;
    };

    var getNodes = function(path){
        return getFirebaseRoot().child(path);
    };

    var getData = function(path, array){
        var ref = getNodes(path);
        if (array) {
            console.log('dataService get data as array from ' + path);
            return $firebaseArray(ref);
        } else {
            console.log('dataService get data as object from ' + path);
            return $firebaseObject(ref);
        }
    };

    var getDataArray = function(path){
        console.log('dataService get data as array from ' + path);
        var ref = getNodes(path);
        return $firebaseArray(ref);
    };

    var setData = function(path, data){
        console.log('dataService add data: ' + path + ' / ' + data);
        var ref = getNodes(path);
        return ref.set(data);
    };

    var addData = function(path, data){
        console.log('dataService add data: ' + path + ' / ' + data);
        var ref = getNodes(path);
        return ref.push(data);
    };

    var delData = function(path, id) {
        console.log('dataService remove data: ' + path + '/' + id);
        var itemRef = new Firebase(firebaseUrl + '/' + path + '/' + id);
        itemRef.remove();
    };

    var updateData = function(path, id, data) {
        console.log('dataService update data: ' + path + '/' + id + ' with ' + data);
      var itemRef = new Firebase(firebaseUrl + '/' + path + '/' + id);
      itemRef.update(data);
    };

    var service = {
        getUrl: getUrl,
        setUrl: setUrl,
        setData : setData,
        addData : addData,
        getData : getData,
        getDataArray : getDataArray,
        delData : delData,
        updateData : updateData,
        getNodes: getNodes
    };

    return service;

}]);

// remember: '$q' promises : http://www.42id.com/articles/angular-js-and-firebase/
// data : TODO Datenstruktur bestimmen
