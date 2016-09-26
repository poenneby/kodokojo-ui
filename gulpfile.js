var fs = require('fs')
var gulp = require('gulp')
var changed = require('gulp-changed')
var license = require('gulp-header-license')

var files = [
  './webpack*.js',
  './server*.js',
  './src/**/*.js',
  './src/**/*.less',
  './src/**/*.scss',
  './config/**/*.js',
  './api/**/*.js'
]

var year = (new Date()).getFullYear()

gulp.task('license', function () {
  return gulp.src(files, { base: './' })
    .pipe(changed('./**/*'))
    .pipe(license(fs.readFileSync('LICENSE-HEADER', 'utf8'), { year }))
    .pipe(gulp.dest(function (file) {
      return file.base
    }))
})
