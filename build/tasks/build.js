var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var copy = require('gulp-copy');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var fs = require('graceful-fs');
var fse = require('fs-extra');
var sourcemaps = require('gulp-sourcemaps');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var glob = require('glob');
var del = require('del');
var vinylPaths = require('vinyl-paths');

var dirs = gulp.pkg.directories;

/**
 * Transpile es6 code into the dist directory
 */
gulp.task('build-system', function () {
  return gulp.src(dirs.lib+"/app/**/*.js")
  .pipe(plumber())
  .pipe(changed(dirs.build, {extension: '.js'}))
  .pipe(sourcemaps.init())
  .pipe(babel(assign({}, compilerOptions, {modules:'system'})))
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest(dirs.build+"/app"));
});

/**
 * Copies html files to the dist directory
 */
gulp.task('build-html', function () {
  return gulp.src(dirs.lib+"/app/**/*.html")
  .pipe(changed(dirs.build, {extension: '.html'}))
  .pipe(gulp.dest(dirs.build+"/app"));
});

/**
 * Copies files from the root directory to the dist directory
 */
gulp.task('build-root', function (done) {
  fse.copySync("config.js",dirs.build+"/config.js");
  fse.copySync(dirs.lib+"/index.html",dirs.build+"/index.html");
  done();
});

/**
 * Copies various assets from the source directory to the dist directory
 */
gulp.task('build-assets', function (done) {
  fse.copySync(dirs.lib+"/fonts",dirs.build+"/fonts");
  fse.copySync(dirs.lib+"/api",dirs.build+"/api");
  fse.copySync(dirs.lib+"/locales",dirs.build+"/locales");
  done();
});

/**
 * Copies only the needed files from jspm_packages into the deploy directory
 */
gulp.task('build-jspm-packages', function () {
  var patterns = [
    "jspm_packages/github/webcomponents/webcomponentsjs@0.6.1/HTMLImports.min.js",
    "jspm_packages/github/aurelia/html-template-element@0.2.0/HTMLTemplateElement.js",
    "jspm_packages/github/aurelia/html-template-element@0.2.0/HTMLTemplateElement.min.js",
    //"jspm_packages/npm/font-awesome@4.3.0/css/**/*",
    //"jspm_packages/npm/font-awesome@4.3.0/fonts/**/*",
    "jspm_packages/*"
  ];

  var promises = [];
  for(var i = 0, l = patterns.length; i < l; i++){
    var pattern = patterns[i];
    var promise =  new Promise(function(resolve){
      glob(pattern, {}, function (er, files){
        for(var i2 = 0, l2 = files.length; i2 < l2; i2++){
          var file = files[i2];
          fse.copy(file, dirs.build+"/"+file,resolve);
        }
      });
    });
    promises.push(promise);
  }
  return Promise.all(promises);
});

/**
 * Clean the dist direcotry
 */
gulp.task('clean-dist', function() {
  return gulp.src([dirs.build])
  .pipe(vinylPaths(del));
});

/**
 * Clean the dist directory first then build the files.
 */
gulp.task('build', function(done) {
  return runSequence(
    'clean-dist',
    'unbundle',
    ['build-system','build-html','build-root','build-assets','build-images'],
    ['less','less_bootstrap'],
    done
  );
});

/**
 * Clean the dist directory first then build the optimized files for production.
 */
gulp.task('build-prod', function(done) {
  return runSequence(
    'clean-dist',
    'unbundle',
    ['build-system','build-html','build-assets'],
    ['build-images-prod'],
    ['less-prod','less_bootstrap-prod'],
    'bundle',
    'bundle-app',
    'uglify-dist',
    'build-root',
    'build-jspm-packages',
    done
  );
});
