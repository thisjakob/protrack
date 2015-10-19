'use strict';
;(function () {
    angular.module('protrack', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'firebase', 'ui.router', 'xeditable'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '../partials/tracks.html',
                    controller: 'MainCtrl as vm'
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
