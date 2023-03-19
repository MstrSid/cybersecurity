// eslint-disable-next-line no-undef
const gulp        = require('gulp');
// eslint-disable-next-line no-undef
const browserSync = require('browser-sync');
// eslint-disable-next-line no-undef
const sass        = require('gulp-sass')(require('sass'));
// eslint-disable-next-line no-undef
const cleanCSS = require('gulp-clean-css');
// eslint-disable-next-line no-undef
const autoprefixer = require('gulp-autoprefixer');
// eslint-disable-next-line no-undef
const rename = require('gulp-rename');
// eslint-disable-next-line no-undef
const imagemin = require('gulp-imagemin');
// eslint-disable-next-line no-undef
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {

	browserSync({
		server: {
			baseDir: 'dist'
		}
	});

	gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function() {
	return gulp.src('src/scss/**/*.+(scss|sass)')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({suffix: '.min', prefix: ''}))
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('mailer', function () {
	return gulp.src('src/mailer/*/**')
		.pipe(gulp.dest('dist/mailer'));
});

gulp.task('watch', function() {
	gulp.watch('src/scss/**/*.+(scss|sass|css)', gulp.parallel('styles'));
	gulp.watch('src/*.html').on('change', gulp.parallel('html'));
	gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'));
	gulp.watch('src/fonts/**/*').on('all', gulp.parallel('fonts'));
	gulp.watch('src/icons/**/*').on('all', gulp.parallel('icons'));
	gulp.watch('src/img/**/*').on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
	return gulp.src('src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function () {
	return gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});

gulp.task('fonts', function () {
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
		.pipe(browserSync.stream());
});

gulp.task('icons', function () {
	return gulp.src('src/icons/**/*')
		.pipe(gulp.dest('dist/icons'))
		.pipe(browserSync.stream());
});

gulp.task('images', function () {
	return gulp.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'html', 'images', 'mailer'));