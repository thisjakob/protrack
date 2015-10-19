'use strict';
;(function () {
    angular.module('protrack', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'firebase', 'ui.router', 'xeditable'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '../partials/tracks.html',
                    controller: 'TracksCtrl as tracksCtrl'
                })
                .state('login', {
                    url: '/login',
                    controller: 'AuthCtrl as authCtrl',
                    templateUrl: '../partials/login.html',
                    resolve: {
                        requireNoAuth: function($state, Auth){
                            return Auth.$requireAuth().then(function(auth){
                                $state.go('home');
                            }, function(error){
                                return;
                            });
                        }
                    }
                })
                .state('projects', {
                    url: '/',
                    templateUrl: '../partials/projects.html'
                })
                .state('reports', {
                    url: '/',
                    templateUrl: '../partials/reports.html'
                })
                .state('settings', {
                    url: '/',
                    templateUrl: '../partials/settings.html'
                });
        })
        .constant('FirebaseUrl', 'https://boiling-inferno-5742.firebaseio.com');
}());
