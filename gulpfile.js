'use strict';

const pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  pump = require('pump'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  gutil = require('gulp-util'),
  connect = require('gulp-connect');


/* PUG */
gulp.task('compile-pug', function buildHTML() {
  return gulp
    .src('src/**/*.pug')
    .pipe(plumber((error) => {
      gutil.log(gutil.colors.red(error.message));
      gulp.task('compile-pug').emit('end');
    }))
    .pipe(pug({
      pretty : true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});


/* SASS */
var sassFiles = 'src/assets/sass/main.scss';
var sassDest = 'dist/css/';
var sassOptions = {outputStyle: 'compressed'};

gulp.task('compile-sass', function () {
  return gulp
    .src(sassFiles)
    .pipe(plumber((error) => {
      gutil.log(gutil.colors.red(error.message));
      gulp.task('compile-sass').emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassDest))
    .pipe(connect.reload());
});


/* JAVASCRIPT */
var jsPath = 'src/assets/js/'
var jsFiles = [
  jsPath+'jquery-3.2.1.min.js',
  jsPath+'bootstrap.min.js',
  jsPath+'vendor/slick-slider/slick.min.js',
  jsPath+'app.js'
];
var jsDest = 'dist/js/';

gulp.task('compile-js', function (cb) {
  gulp.src(jsFiles)
  .pipe(plumber((error) => {
    gutil.log(gutil.colors.red(error.message));
    gulp.task('compile-js').emit('end');
  }))
  .pipe(sourcemaps.init())
  .pipe(concat('main.js'))
  .pipe(rename('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(jsDest))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(jsDest))
  .pipe(connect.reload());
});


/* IMAGES */
gulp.task('optimize-images', function () {
    return gulp.src('src/assets/images/**/*')
        .pipe(plumber((error) => {
          gutil.log(gutil.colors.red(error.message));
          gulp.task('optimize-images').emit('end');
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(connect.reload());
});


/* FONTS */
gulp.task('copy-fonts', function() {
   gulp.src('src/assets/fonts/**/*.{ttf,woff,woff2,eof,eot,svg}')
    .pipe(plumber((error) => {
      gutil.log(gutil.colors.red(error.message));
      gulp.task('copy-fonts').emit('end');
    }))
    .pipe(gulp.dest('dist/fonts'))
    .pipe(connect.reload());
});


/* WATCH */
gulp.task('watch', function(){
  gulp.watch('src/**/*.pug', {cwd:'./'}, ['compile-pug']);
  gulp.watch('src/assets/sass/**/*.scss', {cwd:'./'}, ['compile-sass']);
  gulp.watch('src/assets/js/**/*.js', {cwd:'./'}, ['compile-js']);
  gulp.watch('src/assets/images/**/*', {cwd:'./'}, ['optimize-images']);
  gulp.watch('src/assets/fonts/**/*.{ttf,woff,woff2,eof,eot,svg}', {cwd:'./'}, ['copy-fonts']);
});


/* Dev Web Server */
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});


/* DEFAULT */
gulp.task('default', [
  'compile-pug',
  'compile-sass',
  'compile-js',
  'optimize-images',
  'copy-fonts',
  'watch',
  'connect'
]);
