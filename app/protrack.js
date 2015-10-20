'use strict';
;(function () {
    angular.module('protrack', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'firebase', 'ui.router', 'xeditable'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('home', {
                    url: '/timer',
                    templateUrl: 'partials/tracks.html',
                    controller: 'TracksCtrl as tracksCtrl'
/*                    resolve: {
                        auth: function($state, Auth){
                            return Auth.$requireAuth().catch(function(auth){
                                $state.go('login');
                            });
                        }
                    }*/
                })
                .state('projects', {
                    url: '/projects',
                    templateUrl: 'partials/projects.html',
                    controller: 'ProjectsCtrl as projectsCtrl'
                    /*                    resolve: {
                     auth: function($state, Auth){
                     return Auth.$requireAuth().catch(function(auth){
                     $state.go('login');
                     });
                     }
                     }*/
                })
                .state('reports', {
                    url: '/reports',
                    templateUrl: 'partials/reports.html'
                    /*                    resolve: {
                     auth: function($state, Auth){
                     return Auth.$requireAuth().catch(function(auth){
                     $state.go('login');
                     });
                     }
                     }*/
                })
                .state('settings', {
                    url: '/settings',
                    templateUrl: 'partials/settings.html',
                    controller: 'SettingsCtrl as settingsCtrl'
                    /*                    resolve: {
                     auth: function($state, Auth){
                     return Auth.$requireAuth().catch(function(auth){
                     $state.go('login');
                     });
                     }
                     }*/
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'partials/login.html',
                    controller: 'AuthCtrl as authCtrl',
                    /*                    resolve: {
                     requireNoAuth: function($state, Auth){
                     return Auth.$requireAuth().then(function(auth){
                     $state.go('home');
                     }, function(error){
                     return;
                     });
                     }
                     }*/
                });
        })
        .value('FirebaseUrl', { url : 'https://boiling-inferno-5742.firebaseio.com'});
        //.constant('FirebaseUrl', 'https://protrack2.firebaseio.com');
}());
