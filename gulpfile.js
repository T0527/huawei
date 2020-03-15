//引入gulp
const gulp = require("gulp");
//复制和整理HTML文件
gulp.task("copy-html", function () {
    return gulp.src("*.html")
        .pipe(gulp.dest("dist/"))
        .pipe(connect.reload());
})
//整理图片
gulp.task("images", function () {
    return gulp.src("*.{jpg,png}")
        .pipe(gulp.dest("dist/images"))
        .pipe(connect.reload());
})
//整理json
gulp.task("data", function () {
    return gulp.src(["*.json", "!package.json"])
        .pipe(gulp.dest("dist/data"))
        .pipe(connect.reload());
})
//处理CSS
const minifyCSS = require("gulp-minify-css");
const scss = require("gulp-sass");
const rename = require("gulp-rename");

//指定引用方法
gulp.task("scss1", function () {
    return gulp.src("scss/index.scss")//当前路径下的index.scss文件
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCSS())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})
//全部引用方法
gulp.task("scss2", function () {
    return gulp.src("scss/*.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))//转成dist目录下的css
        .pipe(connect.reload())
})
//处理JS
gulp.task("scripts", function () {
    return gulp.src(["*.js", "!gulpfile.js"])
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
})
//一次性进行多个任务
gulp.task("build", ["copy-html", "images", "data", "scss1", "scss2", "scripts"], function () {
    console.log("没问题，建立成功");
})
//编写监听
gulp.task("watch", function () {
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch("*.{jpg,png}", ["images"]);
    gulp.watch(["*.json", "!package.json"], ["data"]);
    gulp.watch("scss/index.scss", ["scss1"]);
    gulp.watch("scss/*.scss", ["scss2"]);
    gulp.watch(["*.js", "!gulpfile.js"], ["scripts"]);
})
//建立服务器
const connect = require("gulp-connect");
gulp.task("server", function () {
    connect.server({
        root: "dist", //指定服务器的根目录
        port: 8888,
        livereload: true //启动实时刷新
    })
})

//同时执行watch server 设置默认  执行gulp
gulp.task("default", ["server", "watch"]);