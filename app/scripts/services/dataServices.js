/* global Firebase */
(function () {
    'use strict';

    angular.module('protrack').factory('dataService', ['$firebaseArray', '$firebaseObject', 'FBURL', function ($firebaseArray, $firebaseObject, FBURL) {
        var firebaseRef = new Firebase(FBURL);

        var getUrl = function () {
            return FBURL;
        };

        var getFirebaseRoot = function () {
            return firebaseRef;
        };

        var getNodes = function (path) {
            return getFirebaseRoot().child(path);
        };

        /**
         * TODO
         * @param path
         * @param array boolean true = array
         * @returns {*}
         */
        var getData = function (path, array) {
            var ref = getNodes(path);
            if (array) {
                console.log('dataService get data as array from ' + path);
                return $firebaseArray(ref);
            } else {
                console.log('dataService get data as object from ' + path);
                return $firebaseObject(ref);
            }
        };

        var getValue = function (path, func) {
            var ref = getNodes(path);
            ref.on("value", func);
        };

        /**
         * TODO
         * @param path
         * @param data
         * @returns {*}
         */
        var setData = function (path, data) {
            console.log('dataService set data: ' + path + ' : ' + data);
            var ref = getNodes(path);
            return ref.set(data);
        };

        /**
         * TODO
         * @param path
         * @param data
         * @returns {*}
         */
        var addData = function (path, data) {
            console.log('dataService add data: ' + path + ' : ' + data);
            var ref = getNodes(path);
            return ref.push(data);
        };

        var delData = function (path, id) {
            console.log('dataService remove data: ' + path + '/' + id);
            var itemRef = new Firebase(FBURL + '/' + path + '/' + id);
            itemRef.remove();
        };

        var updateData = function (path, id, data) {
            console.log('dataService update data: ' + path + '/' + id + ' with ' + data);
            var itemRef = new Firebase(FBURL + '/' + path + '/' + id);
            itemRef.update(data);
        };

        var service = {
            getUrl: getUrl,
            getValue: getValue,
            setData: setData,
            addData: addData,
            getData: getData,
            delData: delData,
            updateData: updateData,
            getNodes: getNodes
        };

        return service;

    }]);
})();

// remember: '$q' promises : http://www.42id.com/articles/angular-js-and-firebase/
