const gulp = require("gulp");
const scss = require("gulp-sass");
const cleanCSS = require("gulp-clean-css"); // сжимает css
const clean = require('gulp-clean'); // удаляет содержимое папки
const imagemin = require("gulp-imagemin"); // оптимизирует картинки
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

const patch = {
        scss: "./src/scss/**/*.scss",
        img: "./src/img/**/*.{png,gif,jpg}",
        img2: "./src/img/**/*.+(jpg|jpeg|gif|png)",
        html: "./src/*.html",
        js: "./src/js/*.js"
};

const css = () =>
    gulp.src(patch.scss).
        pipe(sourcemaps.init()).
        pipe(scss()).
        pipe(concat('styles.min.css')).
        on('error', notify.onError(function(err){
                return {
                        title:'Styles',
                        message: err.message
                };
        })).
        pipe(autoprefixer({
            cascade: false
        })).
        pipe(cleanCSS()).
        pipe(sourcemaps.write('./')).
        pipe(gulp.dest("./dist/css")).
        pipe(reload({ stream: true }));

const html = () =>
    gulp.src(patch.html).
        pipe(gulp.dest("./dist/")).
        pipe(reload({ stream: true }));

const img = ()=>
    gulp.src(patch.img).
        pipe(imagemin()).
        pipe(gulp.dest("./dist/img"));

const js = ()=>
        gulp.src(patch.js)
            .pipe(concat('script.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'));


const cleandev = ()=>
    gulp.src('./dist', {allowEmpty: true, read: false})
        .pipe(clean());

const browserSynchronize = () => {
        browserSync.init({
                server: {
                        baseDir: './dist'
                }
        })
};

const watch = () => {
        gulp.watch(patch.scss, css);
        gulp.watch(patch.img, img);
        gulp.watch(patch.html, html);
        gulp.watch(patch.js, js);
};

gulp.task("css", css);
gulp.task("img", img);
gulp.task("html", html);
gulp.task("js", js);
gulp.task("cleandev", cleandev);
gulp.task("browser-sync", browserSynchronize);

gulp.task("build", gulp.series("cleandev", gulp.parallel(css, html, js, img)));

gulp.task("dev", gulp.series("build", gulp.parallel(watch, browserSynchronize)));


