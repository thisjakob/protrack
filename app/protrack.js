'use strict';
;(function () {
    angular.module('protrack', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'firebase', 'ui.router', 'xeditable'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'partials/tracks.html',
                    controller: 'TracksCtrl as tracksCtrl'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'partials/login.html',
                    controller: 'AuthCtrl as authCtrl',
 /*                   resolve: {
                        requireNoAuth: function($state, Auth){
                            return Auth.$requireAuth().then(function(auth){
                                $state.go('home');
                            }, function(error){
                                return;
                            });
                        }
                    }*/
                })
                .state('projects', {
                    url: '/',
                    templateUrl: 'partials/projects.html'
                })
                .state('reports', {
                    url: '/',
                    templateUrl: 'partials/reports.html'
                })
                .state('settings', {
                    url: '/',
                    templateUrl: 'partials/settings.html'
                });
        })
        //.constant('FirebaseUrl', 'https://boiling-inferno-5742.firebaseio.com');
        .constant('FirebaseUrl', 'https://protrack2.firebaseio.com');
}());
