'use strict';
(function () {
    angular.module('protrack', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'firebase', 'ui.router', 'xeditable', 'toastr', 'mdl', 'ngMaterial'])

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
                        'content' : {
                            templateUrl : 'partials/home.html',
                            controller : 'HomeCtrl as homeCtrl'
                        }
                    },
                    resolve: {
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
                        'content' : {
                            templateUrl: 'partials/tracks.html',
                            controller: 'TracksCtrl as tracksCtrl'
                        }
                    },

                    resolve: {
                        'authData': ['Auth', function(Auth) {
                            return Auth.$requireAuth();
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
                        'content' : {
                            templateUrl: 'partials/reports.html',
                            controller: 'ReportsCtrl as reportsCtrl'
                        }
                    },
                    resolve: {
                        'authData': ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                })
                .state('projects', {
                    url: '/projects',
                    views : {
                        'nav' : {
                            templateUrl: 'partials/home.nav.html',
                            controller: 'HomeNavCtrl as homeNavCtrl'
                        },
                        'content' : {
                            templateUrl: 'partials/projects.html',
                            controller: 'ProjectsCtrl as projectsCtrl'
                        }
                    },
                    resolve: {
                        'authData': ['Auth', function(Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                })
                .state('settings', {
                    url: '/settings',
                    views : {
                        'nav' : {
                            templateUrl: 'partials/home.nav.html',
                            controller: 'HomeNavCtrl as homeNavCtrl'
                        },
                        'content' : {
                            templateUrl: 'partials/settings.html',
                            controller: 'SettingsCtrl as settingsCtrl'
                        }
                    },
                    resolve: {
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
                        'content' : {
                            templateUrl: 'partials/login.html',
                            controller: 'AuthCtrl as authCtrl'
                        }
                    },
                    resolve: {
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
                        'content' : {
                            templateUrl: 'partials/register.html',
                            controller: 'RegisterCtrl as regCtrl',
                        }
                    },
                    resolve: {
                        'authData': ['Auth', function(Auth) {
                            return Auth.$waitForAuth();
                        }]
                    }
                });
        })
        .value('FirebaseUrl', { url : 'https://protrack.firebaseio.com'})
        .config(function($mdDateLocaleProvider) {
            $mdDateLocaleProvider.firstDayOfWeek = 1;
        });
}());
