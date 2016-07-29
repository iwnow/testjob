'use strict';

var gulp        = require('gulp'),
    typescript  = require('typescript'),
    ts          = require('gulp-typescript'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    del         = require('del'),
    runSequence = require('run-sequence'),
    fs          = require("fs"),
    babelify    = require("babelify");

var project = ts.createProject('./tsconfig.json', {
      typescript: typescript,
      declaration: true,
      noExternalResolve: true
    });

var sources = ['./public/source/**/*{ts,tsx,js}','./typings/**/*'];
var dist = './../server/server/public/js/bundle.js';

gulp.task('clean', function (done) {
  //del(['.tmp', './static/dist'], done.bind(this));
  done();
});

gulp.task('compile', function () {
  var result = gulp.src(sources)
    .pipe(ts(project));
  return result.js.pipe(gulp.dest('.tmp'));
});

gulp.task('bbundle', function (cb) {
    return browserify(".tmp/boot.js")
        .transform(babelify, {
            presets: ["es2015", "stage-3", "react"],
            //plugins: ['transform-runtime','transform-es3-member-expression-literals', 'transform-es3-property-literals']
            plugins: ['transform-es3-member-expression-literals', 'transform-es3-property-literals']
        })
        .bundle()
        .pipe(fs.createWriteStream(dist));
});

// gulp.task('bundle', function () {
//   var b = browserify('.tmp/app.js');
//   return b.bundle()
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest('static/dist'));
// });

gulp.task('default',function(cb) {
  // || runSequence('clean', ['copy1', 'copy2'], callback);
  runSequence('clean', 'compile', 'bbundle', cb);
});

gulp.task('watch', function(){
  gulp.watch('public/source/**/*', ['default']);
});