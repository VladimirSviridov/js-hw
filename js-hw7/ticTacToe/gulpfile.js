const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

function buildJs() {
  return gulp.src('./src/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/'));
}
 
gulp.watch('./src/*.js', buildJs);

exports.default = buildJs;