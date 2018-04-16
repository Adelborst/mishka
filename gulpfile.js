"use strict";

// Path variables
var path = {
  sourcePath: "./source",
  buildPath: "./build",
  scssPath: "/scss",
  cssPath: "/css",
  scssPattern: "/**/*.scss",
  pugPattern: "/**/!(_)*.pug",
  htmlPattern: "/**/*.html"
};

// Packages
var gulp = require("gulp"),
  sass = require("gulp-sass"),
  csscomb = require("gulp-csscomb"),
  pug = require("gulp-pug"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create();

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    startPath: path.buildPath,
    notify: false
  });
});

gulp.task("sass", function () {
  return gulp.src(path.sourcePath + path.scssPath + path.scssPattern)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.sourcePath + path.cssPath))
    .pipe(browserSync.stream());
});

gulp.task("sort-sass", function () {
  return gulp.src(path.sourcePath + path.scssPath + path.scssPattern)
    .pipe(csscomb("csscomb.json"))
    .pipe(gulp.dest(path.sourcePath + path.scssPath))
  .pipe(browserSync.stream());
});

gulp.task("pug", function () {
  return gulp.src(path.sourcePath + path.pugPattern)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(path.buildPath))
    .pipe(browserSync.stream());
});

gulp.task("watch", ["browser-sync", "sass"], function() {
  gulp.watch(path.sourcePath + path.scssPath + path.scssPattern, ["sass"]);
  gulp.watch(path.sourcePath + path.htmlPattern).on("change", browserSync.reload);
});
