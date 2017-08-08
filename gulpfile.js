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

gulp.task('compile-sass', function (cb) {
    pump([
        gulp.src(sassFiles),
        sourcemaps.init(),
        sass(sassOptions).on('error', sass.logError),
        sourcemaps.write('.'),
        gulp.dest(sassDest),
        connect.reload()
      ],
      cb
    );
});


/* JAVASCRIPT */
var jsPath = 'src/assets/js/'
var jsFiles = [
  jsPath+'jquery-3.2.1.min.js',
  jsPath+'bootstrap.min.js',
  jsPath+'vendor/slick-slider/slick.min.js',
  jsPath+'vendor/elevatezoom/jquery.elevateZoom-3.0.8.min.js',
  jsPath+'app.js'
];
var jsDest = 'dist/js/';

gulp.task('compile-js', function (cb) {
  pump([
        gulp.src(jsFiles),
        sourcemaps.init(),
        concat('main.js'),
        rename('main.min.js'),
        uglify(),
        gulp.dest(jsDest),
        sourcemaps.write('.'),
        gulp.dest(jsDest),
        connect.reload()
    ],
    cb
  );
});


/* IMAGES */
var imageminPlugins = [
  imagemin.gifsicle({interlaced: true}),
  imagemin.jpegtran({progressive: true}),
  imagemin.optipng({optimizationLevel: 5}),
  imagemin.svgo({plugins: [{removeViewBox: true}]})
];

gulp.task('optimize-images', function () {
    return gulp.src('src/assets/images/**/*')
        .pipe(plumber((error) => {
          gutil.log(gutil.colors.red(error.message));
          gulp.task('optimize-images').emit('end');
        }))
        .pipe(imagemin(imageminPlugins))
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
