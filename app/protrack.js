'use strict';

angular.module('protrack', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'firebase', 'ngResource', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/views/main.html',
        controller: 'MainCtrl'
      })
        .when('/about', {
          templateUrl: 'home/views/about.html',
          controller: 'AboutCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  })
;
