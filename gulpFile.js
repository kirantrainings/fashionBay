var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('./dist/*.js', {
            read: false
        })
        .pipe(clean());
});
var srcFiles = [
                "./app/*/*.js",
                "./app/app.js"
                ]

gulp.task("compress", function () {
    return gulp.src(srcFiles)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});



gulp.task("default", ["clean", "compress"]);
