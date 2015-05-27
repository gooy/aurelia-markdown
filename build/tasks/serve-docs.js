var gulp = require('gulp');
var server = require('gulp-express');

/**
 * Serve the deploy directory for deploy testing
 */
gulp.task('serve-docs',['docs'], function() {
  server.run(['server-docs.js']);
});
