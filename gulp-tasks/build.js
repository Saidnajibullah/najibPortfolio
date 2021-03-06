var gulp = require('gulp');
var imageMin = require('gulp-imagemin');
var del = require('del');
var usemin = require('gulp-usemin');
var cssNano = require('gulp-cssnano');
var revision = require('gulp-rev');
var uglify = require('gulp-uglify');


gulp.task('deleteDistFolder', function(){
    return del('./docs');
})


gulp.task('optimizeImages', gulp.series('deleteDistFolder', function(){
    return gulp
    .src('./app/src/images/**/*')
    .pipe(imageMin({
        progressive: true,
        interlace: true,
        multipass: true
    }))
    .pipe(gulp.dest('./docs/dist/images'));
}));


gulp.task('usemin', gulp.series('deleteDistFolder', 'style', 'script', function(){
    return gulp
    .src('./app/*.html')
    .pipe(usemin({
        css: [function(){ return revision() }, function(){ return cssNano() }],
        js: [function(){ return revision() }, function(){ return uglify() }]
    }))
    .pipe(gulp.dest('./docs'));
}));


gulp.task('build', gulp.parallel('deleteDistFolder', 'optimizeImages', 'usemin'));