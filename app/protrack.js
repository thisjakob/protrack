'use strict';
(function () {
    angular.module('protrack', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'firebase', 'ui.router', 'xeditable'])

        .run(['$rootScope', '$state', function($rootScope, $state) {
            // redirect unauthenticted users to the login page
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
                // We can catch the error thrown when the $requireAuth promise is rejected
                // and redirect the user back to the home page
                if (error === 'AUTH_REQUIRED') {
                    $state.go('login');
                }
            });
        }])

        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/timer');
            $stateProvider
                .state('timer', {
                    url: '/timer',
                    templateUrl: 'partials/tracks.html',
                    controller: 'TracksCtrl as tracksCtrl',
                    resolve: {
                        'authData': ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                })
                .state('reports', {
                    url: '/reports',
                    templateUrl: 'partials/reports.html',
                    controller: 'ReportsCtrl as reportsCtrl',
                    resolve: {
                        'authData': ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                })
                .state('projects', {
                    url: '/projects',
                    templateUrl: 'partials/projects.html',
                    controller: 'ProjectsCtrl as projectsCtrl',
                    resolve: {
                        'authData': ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                })
                .state('settings', {
                    url: '/settings',
                    templateUrl: 'partials/settings.html',
                    controller: 'SettingsCtrl as settingsCtrl',
                    resolve: {
                        'authData': ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'partials/login.html',
                    controller: 'AuthCtrl as authCtrl',
                    resolve: {
                        'authData': ['Auth', function(Auth) {
                            return Auth.$waitForAuth();
                        }]
                    }
                })
                .state('register',{
                    url: '/register',
                    templateUrl: 'partials/register.html',
                    controller: 'RegisterCtrl as regCtrl',
                    resolve: {
                        'authData': ['Auth', function(Auth) {
                            return Auth.$waitForAuth();
                        }]
                    }
                });
        })
        .value('FirebaseUrl', { url : 'https://protrack.firebaseio.com'});
}());
