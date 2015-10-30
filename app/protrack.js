'use strict';
;(function () {
    angular.module('protrack', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'firebase', 'ui.router', 'xeditable'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/timer');
            $stateProvider
                .state('timer', {
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
                .state('reports', {
                    url: '/reports',
                    templateUrl: 'partials/reports.html',
                    controller: 'ReportsCtrl as reportsCtrl'
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
                    controller: 'AuthCtrl as authCtrl'
                    /*                    resolve: {
                     requireNoAuth: function($state, Auth){
                     return Auth.$requireAuth().then(function(auth){
                     $state.go('home');
                     }, function(error){
                     return;
                     });
                     }
                     }*/
                })
                .state('register',{
                    url: '/register',
                    templateUrl: 'partials/register.html',
                    controller: 'RegisterCtrl as regCtrl'
                });
        })
        .value('FirebaseUrl', { url : 'https://protrack.firebaseio.com'});
}());
