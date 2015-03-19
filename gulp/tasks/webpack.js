var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webpackConfig       = require('../config').webpack;
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');


// uglifiy

gulp.task("webpack", function() {
    return gulp.src('src/scripts/app.js')
        .pipe(webpack( webpackConfig ))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('.tmp/'))
        .pipe(gulp.dest('dist/'));
});