'use strict';

module.exports = function (config) {

    config.set({
        basePath: '..', //!\\ Ignored through gulp-karma //!\\

        files: [ //!\\ Ignored through gulp-karma //!\\
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-cookies/angular-cookies.js',
            'app/bower_components/angular-touch/angular-touch.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-xeditable/dist/js/xeditable.js',
            'app/bower_components/**/angular*.js',
            'app/bower_components/ng-csv/build/ng-csv.js',
            'app/bower_components/moment/moment.js',
            'app/*.js',
            'app/scripts/**/*.js',
            'test/unit/*.js'
        ],
        autoWatch: false,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ]
    });
};

