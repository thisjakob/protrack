/* global Firebase */
(function () {
    'use strict';

    angular.module('protrack')
        .factory('Auth', ['$firebaseAuth', 'FirebaseUrl', function ($firebaseAuth, FirebaseUrl) {
            var ref = new Firebase(FirebaseUrl.url);
            var auth = $firebaseAuth(ref);

            return auth;
        }]);
})();