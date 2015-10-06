'use strict';

angular.module('protrack', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'firebase', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {

      $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'partials/main.html',
              controller: 'MainCtrl'
          })
          .state('about', {
            url: '/',
            templateUrl: 'partials/about.html'
          });
        $urlRouterProvider.otherwise('/');
  });
