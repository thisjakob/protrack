'use strict';

angular.module('protrack', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'firebase', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {

      $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'partials/main.html',
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
        $urlRouterProvider.otherwise('/');
  });
