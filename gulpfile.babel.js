'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import grename from 'gulp-rename';
import gclean from 'gulp-clean';
import webpack from 'webpack';
import webpack_config from './config/webpack.js'; 
import WebpackDevServer from 'webpack-dev-server';


gulp.task('default', ['serve']);

gulp.task('static', () => {
  gulp.src('src/pages/template.html')
    .pipe(grename('index.html'))
    .pipe(gulp.dest('build/'));
});

gulp.task("webpack", ["static"], (callback) => {
    // run webpack
    webpack(webpack_config , (err, stats) => {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("clean",(cb) => {
  return gulp.src('build', {read: false})
    .pipe(gclean({force: true}));
});

gulp.task("serve", ['webpack'], () => {
    var compiler = webpack(webpack_config)
    var server = new WebpackDevServer(compiler,{
  // webpack-dev-server options
  contentBase: "./build",

  hot: true,

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: false,
  filename: "app.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },

  publicPath: "/assets/",
  headers: { "X-Custom-Header": "yes" },
  stats: { colors: true },
  historyApiFallback: false,
  proxy: {
    "/v1/*": "http://localhost:8080"
  }
    });
    server.listen(3000, "0.0.0.0");
});

