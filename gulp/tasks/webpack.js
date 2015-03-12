var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webpackConfig       = require('../config').webpack;

gulp.task("webpack", function() {
    return gulp.src('src/scripts/app.js')
        .pipe(webpack( webpackConfig ))
        .pipe(gulp.dest('dist/'));
});