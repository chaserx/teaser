const gulp = require("gulp");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const runSequence = require("run-sequence");
const gulpLoadPlugins = require("gulp-load-plugins");
const del = require("del");

const $ = gulpLoadPlugins();

gulp.task("clean", del.bind(null, [".tmp", "dist"]));

gulp.task("babel", () => {
  return gulp
    .src("src/js/**/*.js")
    .pipe(
      $.babel({
        presets: ["env"]
      })
    )
    .pipe(gulp.dest("dist/js"));
});

gulp.task("moveOthers", function() {
  return gulp
    .src(["src/**/*.json", "src/**/*.html", "src/**/*.css", "src/**/*.jpg"])
    .pipe(gulp.dest("dist"));
});

gulp.task("default", cb => {
  runSequence("clean", "babel", "moveOthers", cb);
});
