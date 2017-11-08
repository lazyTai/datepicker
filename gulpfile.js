var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
var rollup = require("gulp-rollup");
var destFolder = "./dist";
var postcss = require('rollup-plugin-postcss');


/* {
    "presets": ["env"]
  } */

gulp.task("default", function () {
    process.env.NODE_ENV = "release";
    return gulp.src("./src/**/*.js")
        // ----------- rolling up --------------
        .pipe(rollup({
            format: "umd",
            name: "tai_date",
            input: "./src/index.js",
            allowRealFiles: true,
            plugins: [
                postcss({
                    extensions: ['.css'],
                }),
            ]
        }))
        .pipe(rename("date.es2015.js"))
        .pipe(gulp.dest(destFolder)) // --> writing rolledup
        // ----------- babelizing --------------
        .pipe(babel())
        .pipe(rename("date.js"))
        .pipe(gulp.dest(destFolder)) // --> writing babelized
        // ----------- minifying --------------
        .pipe(uglify())
        .pipe(rename("date.min.js"))
        .pipe(gulp.dest(destFolder)); // --> writing uglified
});

gulp.task("watch", function () {
    gulp.watch("./src/**/*.js", ["default"]);
    // Other watchers
});