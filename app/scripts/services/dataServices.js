/* global Firebase */
;(function () {
    'use strict';

    angular.module('protrack').factory('dataService', ['$firebaseArray', '$firebaseObject', 'FBURL', function ($firebaseArray, $firebaseObject, FBURL) {
        var firebaseRef = new Firebase(FBURL);
        var openFBObjs = [];

        /**
         * destroy all firebase objects
         * to be called before logout
         * if objects are not destroyed, logout will throw tons of errors to the console.
         * @returns
         */
        var destroyAllFBObj = function(){
            for(var i = 0; i < openFBObjs.length; i++){
                openFBObjs[i].$destroy();
            }
        };

        /**
         * get Url of firebase DB
         * @returns {FBURL|String}
         */
        var getUrl = function () {
            return FBURL;
        };

        /**
         * get firebase DB
         * @returns {Firebase}
         */
        var getFirebaseRoot = function () {
            return firebaseRef;
        };

        /**
         * get nodes of firebase DB
         * @param path
         * @returns {*}
         */
        var getNodes = function (path) {
            return getFirebaseRoot().child(path);
        };

        /**
         * get data of path in firebase DB
         * @param path
         * @param isArray boolean [true = array; false = object]
         * @returns firebase array or object
         */
        var getData = function (path, isArray) {
            var ref = getNodes(path);
            var fbObj;

            if (isArray) {
                console.log('dataService get data as array from ' + path);
                fbObj = $firebaseArray(ref);
                openFBObjs.push(fbObj);
                return fbObj;
            } else {
                console.log('dataService get data as object from ' + path);
                fbObj = $firebaseArray(ref);
                openFBObjs.push(fbObj);
                return fbObj;
            }
        };

        /**
         * get value at path in firebase DB
         * @param path
         * @param callback func
         */
        var getValue = function (path, func) {
            var ref = getNodes(path);
            ref.on("value", func);
        };

        /**
         * set data at path in firebase DB, overwrite data with new
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
         * add new data in firebase DB
         * @param path
         * @param data
         * @returns {*}
         */
        var addData = function (path, data) {
            console.log('dataService add data: ' + path + ' : ' + data);
            var ref = getNodes(path);
            return ref.push(data);
        };

        /**
         * update only new data at path in firebase DB
         * @param path
         * @param id
         * @param data
         */
        var updateData = function (path, id, data) {
            console.log('dataService update data: ' + path + '/' + id + ' with ' + data);
            var itemRef = new Firebase(FBURL + '/' + path + '/' + id);
            itemRef.update(data);
        };

        /**
         * delete data at path in firebase DB
         * @param path
         * @param id
         */
        var delData = function (path, id) {
            console.log('dataService remove data: ' + path + '/' + id);
            var itemRef = new Firebase(FBURL + '/' + path + '/' + id);
            itemRef.remove();
        };

        var service = {
            getUrl: getUrl,
            getValue: getValue,
            setData: setData,
            addData: addData,
            getData: getData,
            delData: delData,
            updateData: updateData,
            getNodes: getNodes,
            destroyAllFBObj: destroyAllFBObj
        };

        return service;
    }]);
})();