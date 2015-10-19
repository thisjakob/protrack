angular.module('protrack')
    .factory('Auth', [$firebaseAuth, FirebaseUrl, function($firebaseAuth, FirebaseUrl){
        var ref = new Firebase(FirebaseUrl);
        var auth = $firebaseAuth(ref);

        return auth;
    }]);