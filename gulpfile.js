// Packages
const gulp = require("gulp"),
	sass = require('gulp-sass')(require('sass')),
	nodemon = require("gulp-nodemon");

// Compile SCSS files into CSS
gulp.task("sass", () => {
	return (
		gulp
			.src(["./build/scss/*.scss"])
			// Convert .scss into .css
			.pipe(sass())
			// Set the destination folder
			.pipe(gulp.dest("./public/css"))
	);
});

// Watch SCSS files
gulp.task("sass:watch", () => {
	gulp.watch(["./build/scss/*.scss"], gulp.series("sass"));
});

// Transfer JS files to the public folder
gulp.task("javascript", () => {
	return (
		gulp
			.src(["./build/js/*.js"])
			// Set the destination folder
			.pipe(gulp.dest("./public/js"))
	);
});

// Watch Javascript files
gulp.task("javascript:watch", () => {
	gulp.watch(["./build/js/*.js"], gulp.series("javascript"));
});

// Start Server
gulp.task("server", (cb) => {
	var called = false;

	return nodemon({
		script: `index.js`,
	}).on("start", () => {
		if (!called) {
			called = true;
			cb();
		}
	});
});

// Default task
gulp.task("default", gulp.series("javascript", "sass", "server", gulp.parallel("javascript:watch", "sass:watch")));
