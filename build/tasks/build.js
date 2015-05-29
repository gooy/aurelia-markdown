var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var del = require('del');
var fs = require('graceful-fs');
var mkdirp = require('mkdirp');
var vinylPaths = require('vinyl-paths');
var ncp = require('ncp').ncp;
var dirs = gulp.pkg.directories;

/**
 * Transpile es6 code into the dist directory as systemjs
 */
gulp.task('build-system', function () {
  return gulp.src(dirs.lib+"/**/*.js")
  .pipe(plumber())
  .pipe(changed(dirs.build, {extension: '.js'}))
  .pipe(sourcemaps.init())
  .pipe(babel(assign({}, compilerOptions, {modules:'system'})))
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest(dirs.build));
});

/**
 * Copies html files to the dist directory
 */
gulp.task('build-html', function () {
  return gulp.src(dirs.lib+"/**/*.html")
  .pipe(changed(dirs.build, {extension: '.html'}))
  .pipe(gulp.dest(dirs.build));
});


/**
 * Clean the dist direcotry
 */
gulp.task('clean-dist', function() {
  return gulp.src([gulp.pkg.directories.build])
  .pipe(vinylPaths(del));
});

/**
 * Clean the dist directory first then build the files.
 */
gulp.task('build', function(done) {
  return runSequence(
    'clean-dist',
    ['build-system','build-html'],
    done
  );
});
