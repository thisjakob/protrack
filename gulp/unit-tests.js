'use strict';

var gulp = require('gulp');
var Server = require('karma').Server;

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep');

gulp.task('test', function(done) {
  var bowerDeps = wiredep({
    directory: 'app/bower_components',
    exclude: ['bootstrap-sass-official'],
    dependencies: true,
    devDependencies: true
  });

  var testFiles = bowerDeps.js.concat([
    'app/scripts/**/*.js',
    'test/unit/**/*.js'
  ]);

  new Server({
    configFile: __dirname + '/../test/karma.conf.js',
    singleRun: true,
    autoWatch: false
  }, function() {
    done();
  }).start();
});

/*var gulp = require('gulp');
var Server = require('karma').Server;
*/
/**
 * Run test once and exit
 */
/*gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});*/