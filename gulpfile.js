'use strict';

const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webserver = require('gulp-webserver');
const uglify = require('gulp-uglify');
const pump = require('pump');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const gulp = require('gulp');


/* PUG */
gulp.task('pug', function buildHTML() {
  return gulp
  .src('src/**/*.pug')
  .pipe(pug({
    pretty : true
  }))
  .pipe(gulp.dest('dist/'));
});


/* SASS */
var sassFiles = 'src/assets/sass/main.scss';
var sassDest = 'dist/css/';
var sassOptions = {outputStyle: 'compressed'};

gulp.task('sass', function () {
  return gulp
    .src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassDest));
});


/* JAVASCRIPT */
var jsPath = 'src/assets/js/'
var jsFiles = [
  jsPath+'jquery-3.2.1.min.js',
  jsPath+'bootstrap.min.js',
  jsPath+'app.js'
];
var jsDest = 'dist/js/';

gulp.task('js', function (cb) {
  pump([
        gulp.src(jsFiles),
        sourcemaps.init(),
        concat('main.js'),
        gulp.dest(jsDest),
        rename('main.min.js'),
        uglify(),
        sourcemaps.write('.'),
        gulp.dest(jsDest)
    ],
    cb
  );
});


/* IMAGES */
gulp.task('optimizeImages', function () {
    return gulp.src('src/assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});


/* FONTS */
gulp.task('copyFonts', function() {
   gulp.src('src/assets/fonts/**/*.{ttf,woff,woff2,eof,eot,svg}')
   .pipe(gulp.dest('dist/fonts'));
});


/* WATCH */
gulp.task('watch', function(){
  gulp.watch('src/**/*.pug', {cwd:'./'}, ['pug']);
  gulp.watch('src/assets/sass/**/*.scss', {cwd:'./'}, ['sass']);
  gulp.watch('src/assets/js/**/*.js', {cwd:'./'}, ['js']);
  gulp.watch('src/assets/images/**/*', {cwd:'./'}, ['optimizeImages']);
  gulp.watch('src/assets/fonts/**/*.{ttf,woff,woff2,eof,eot,svg}', {cwd:'./'}, ['copyFonts']);
});


/* Dev Web Server */
gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      open: true,
      fallback : '/dist/index.html'
    }));
});


/* DEFAULT */
gulp.task('default', [
  'pug',
  'sass',
  'js',
  'optimizeImages',
  'copyFonts',
  'watch',
  'webserver'
]);
