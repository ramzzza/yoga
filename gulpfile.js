var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var uncss           = require('gulp-uncss');
var sass            = require('gulp-sass');
var notify          = require('gulp-notify');
var autoprefixer    = require('gulp-autoprefixer');
var cleanCSS        = require('gulp-clean-css');


// gulp browser-sync gulp-uncss gulp-sass gulp-notify gulp-autoprefixer gulp-clean-css



// Static Server + watching sass/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "work/"
    });

    gulp.watch("work/sass/*.sass", ['sass']);    
    gulp.watch("work/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("work/sass/*.sass")                 
        .pipe(sass())
        .on("error", notify.onError({
        message: "Error: <%= error.message %>",
        title: "Error running something",
        sound: false
      }))                
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("work/css/"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('prodaction/css/'))                                             
        .pipe(browserSync.stream());
});





/* Дефолтный ТАСК */
gulp.task('default', ['serve'] );
















 
