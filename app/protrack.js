'use strict';
(function () {
    angular.module('protrack', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'firebase', 'ui.router', 'xeditable', 'toastr', 'ngMaterial', 'ngCsv'])

        .constant('FBURL', 'https://protrack.firebaseio.com')

        .run(['$rootScope', '$state', function($rootScope, $state) {
            // redirect unauthenticated users to the login page
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
                // We can catch the error thrown when the $requireAuth promise is rejected
                // and redirect the user back to the home page
                if (error === 'AUTH_REQUIRED') {
                    $state.go('login');
                }
            });
        }])

        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url : '/',
                    views : {
                        'nav' : {
                            templateUrl: 'partials/home.nav.html',
                            controller: 'HomeNavCtrl as homeNavCtrl'
                        },
                        'toolbar' : {
                            templateUrl: 'partials/toolbar.html',
                            controller: 'ToolbarCtrl as toolbarCtrl'
                        },
                        'content' : {
                            templateUrl : 'partials/home.html',
                            controller : 'HomeCtrl as homeCtrl'
                        }
                    },
                    resolve: {
                        'pageName' : [function(){return 'Home'}],
                        'authData': ['Auth', function(Auth) {
                            return Auth.$waitForAuth();
                        }]
                    }
                })
                .state('timer', {
                    url: '/timer',
                    views : {
                        'nav' : {
                            templateUrl: 'partials/home.nav.html',
                            controller: 'HomeNavCtrl as homeNavCtrl'
                        },
                        'toolbar' : {
                            templateUrl: 'partials/toolbar.html',
                            controller: 'ToolbarCtrl as toolbarCtrl'
                        },
                        'content' : {
                            templateUrl: 'partials/tracks.html',
                            controller: 'TracksCtrl as tracksCtrl'
                        }
                    },

                    resolve: {
                        'pageName' : [function(){return 'Timer'}],
                        'authData': ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }],
                        'allTracks' : ['dataService', 'authData', function(dataService, authData) {
                            var path = 'users/' + authData.uid + '/';
                            return dataService.getData(path + 'tracks', true);
                        }],
                        'allProjects' : ['dataService', 'authData', function(dataService, authData) {
                            var path = 'users/' + authData.uid + '/';
                            return dataService.getData(path + 'projects', true).$loaded();
                        }],
                        'allTags' : ['dataService', 'authData', function(dataService, authData) {
                            var path = 'users/' + authData.uid + '/';
                            return dataService.getData(path + 'tags', true).$loaded();
                        }],
                        'runningTimer' : ['dataService', 'authData', function(dataService, authData) {
                            var path = 'users/' + authData.uid + '/';
                            return dataService.getData(path + 'currentTimer', false);
                        }]
                    }
                })
                .state('reports', {
                    url: '/reports',
                    views : {
                        'nav' : {
                            templateUrl: 'partials/home.nav.html',
                            controller: 'HomeNavCtrl as homeNavCtrl'
                        },
                        'toolbar' : {
                            templateUrl: 'partials/toolbar.html',
                            controller: 'ToolbarCtrl as toolbarCtrl'
                        },
                        'content' : {
                            templateUrl: 'partials/reports.html',
                            controller: 'ReportsCtrl as reportsCtrl'
                        }
                    },
                    resolve: {
                        'pageName' : [function(){return 'Reports'}],
                        'authData': ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                })
                .state('config', {
                    url: '/config',
                    views : {
                        'nav' : {
                            templateUrl: 'partials/home.nav.html',
                            controller: 'HomeNavCtrl as homeNavCtrl'
                        },
                        'toolbar' : {
                            templateUrl: 'partials/toolbar.html',
                            controller: 'ToolbarCtrl as toolbarCtrl'
                        },
                        'content' : {
                            templateUrl: 'partials/config.html',
                            controller: 'ConfigCtrl as configCtrl'
                        }
                    },
                    resolve: {
                        'pageName' : [function(){return 'Configuration'}],
                        'authData': ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                })
                .state('login', {
                    url: '/login',
                    views : {
                        'nav' : {
                            templateUrl: 'partials/home.nav.html',
                            controller: 'HomeNavCtrl as homeNavCtrl'
                        },
                        'toolbar' : {
                            templateUrl: 'partials/toolbar.html',
                            controller: 'ToolbarCtrl as toolbarCtrl'
                        },
                        'content' : {
                            templateUrl: 'partials/login.html',
                            controller: 'AuthCtrl as authCtrl'
                        }
                    },
                    resolve: {
                        'pageName' : [function(){return 'Login'}],
                        'authData': ['Auth', function(Auth) {
                            return Auth.$waitForAuth();
                        }]
                    }
                })
                .state('register',{
                    url: '/register',
                    views : {
                        'nav' : {
                            templateUrl: 'partials/home.nav.html',
                            controller: 'HomeNavCtrl as homeNavCtrl'
                        },
                        'toolbar' : {
                            templateUrl: 'partials/toolbar.html',
                            controller: 'ToolbarCtrl as toolbarCtrl'
                        },
                        'content' : {
                            templateUrl: 'partials/register.html',
                            controller: 'RegisterCtrl as regCtrl'
                        }
                    },
                    resolve: {
                        'pageName' : [function(){return 'Register'}],
                        'authData': ['Auth', function(Auth) {
                            return Auth.$waitForAuth();
                        }]
                    }
                });
        })

        .config(function($mdDateLocaleProvider) {
            $mdDateLocaleProvider.firstDayOfWeek = 1;
        });
}());
