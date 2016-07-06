var less    = require('gulp-less');
var cssnano = require('gulp-cssnano');
var path    = require('path');
var gulp    = require('gulp');

console.log('path ; ', path.join(__dirname, 'src', 'stylesheets'));
gulp.task('less', function () {
  return gulp.src('./src/stylesheets/*.less')
    .pipe(less({
      paths: ['.', path.join(__dirname, 'src', 'stylesheets', 'includes')]
    }).on('error', function (err) {
      console.log(err);
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['less']);
// gulp.watch('./src/stylesheets/*.less', ['less']);
