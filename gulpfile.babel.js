'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpack_config from './config/webpack.js'; 

gulp.task('default', ['webpack']);

gulp.task("webpack", (callback) => {
    // run webpack
    webpack(webpack_config , (err, stats) => {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

