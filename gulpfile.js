var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

gulp.task('default', function() {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 3000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function() {
        console.log('Restarting');
    });
});

gulp.task('test', function() {
    env({vars: {ENV: 'Test'}});  // add ENV to process.env with value 'Test'
    gulp.src('tests/*.js', {read: true})
        .pipe(gulpMocha({reporter: 'nyan'}));
});