// Basic setup
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');    // zemljevid stisnjenih datotek
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var del = require('del');

// Less Task
gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist'));
});

// Script Task
gulp.task('scripts', function () {
    return gulp.src('app/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
        
});

// Clean Task
gulp.task('clean', function(cb){
    return del(['dist/*'], cb);
});

// Image Task
gulp.task('images', function(){
   return gulp.src('app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

// JQuery Task
gulp.task('jquery', function(){
   return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('dist'))
});

// Watch Task
/**
 * Opravilo naj preverja spremembe v izvornih datotekah (APP)
 */
gulp.task('watch', function(){
    gulp.watch('app/less/*.less', gulp.series('less'));
    gulp.watch('app/js/*.js', gulp.series('scripts'));
    gulp.watch('app/img/*', gulp.series('images'));
});

// Default Task
gulp.task('default', gulp.series('clean', 'less', 'scripts', 'images','jquery','watch'));