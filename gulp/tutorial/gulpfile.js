var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('hello', function() {
	console.log('Hello David');
});

gulp.task('sass', function() {
	gulp.src('app/scss/styles.scss')
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['sass'], function() {
	gulp.watch('app/scss/styles.scss', ['sass']);
});