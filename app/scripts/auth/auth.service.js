/* global Firebase */

(function () {
    'use strict';


    angular.module('protrack')
        .factory('Auth', ['$firebaseAuth', 'FBURL', function ($firebaseAuth, FBURL) {
            var ref = new Firebase(FBURL);
            var auth = $firebaseAuth(ref);

            auth.logout = function(){
                auth.$unauth();
            };

            return auth;
        }]);
})();
