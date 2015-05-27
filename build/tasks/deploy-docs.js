var gulp   = require('gulp');
var ghPages = require('gulp-gh-pages');
var runSequence = require('run-sequence');

var dirs = gulp.pkg.directories;

// then runs deploy-gh-pages which publishes the dist folder to gh-pages branch
gulp.task('docs-gh-pages', function() {
  return gulp.src([dirs.doc_output+'/**/*'])
  .pipe(ghPages({push:true}));
});

gulp.task('deploy-docs', function(done) {
  return runSequence('docs','docs-gh-pages',done);
});
