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
            'app/bower_components/angularfire/dist/angularfire.js',
            'app/bower_components/firebase/firebase.js',
            'app/bower_components/ng-csv/build/ng-csv.js',
            'app/bower_components/moment/moment.js',
            'app/bower_components/angular-moment/angular-moment.js',
            'app/*.js',
            'app/scripts/**/*.js',
            'test/unit/calcTime.service.test.js',
            'test/unit/showData.test.js'
        ],
        autoWatch: false,

        frameworks: ['jasmine'],
        reporters: ['progress', 'html'],
        htmlReporter: {
            outputDir: 'test/report', // where to put the reports
            templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: true, // reports show failures on start
            namedFiles: false, // name files instead of creating sub-directories
            pageTitle: 'Unittest', // page title for reports; browser info by default
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
            reportName: 'unittest', // report summary filename; browser info by default
            // experimental
            preserveDescribeNesting: false, // folded suites stay folded
            foldAll: false // reports start folded (only with preserveDescribeNesting)
        },

        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-html-reporter',
            'mockfirebase'
        ]
    });
};

