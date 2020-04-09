const { series, parallel, watch, src, dest } = require("gulp");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
var postcss = require("gulp-postcss");
var cssvariables = require("postcss-css-variables");
const del = require("del");

var plugins = [cssvariables({ preserve: true })];

function css() {
  return src("_src/_build/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("_src/assets/styles"));
}

function clean() {
  return del(["_src/assets/styles"]);
}

function javascript() {
  return src("_src/_build/js/*.js")
    .pipe(babel())
    .pipe(terser())
    .pipe(dest("_src/assets/scripts"));
}

exports.build = series(clean, parallel(css, javascript));

exports.default = function() {
  watch("_src/_build/sass/**/*.scss", series(clean, css));
  watch("_src/_build/js/*.js", javascript);
};
