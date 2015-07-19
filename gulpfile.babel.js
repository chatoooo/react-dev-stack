'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpack_config from './config/webpack.js'; 
import WebpackDevServer from 'webpack-dev-server';

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

gulp.task("serve", ['webpack'], (callback) => {
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

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: false,

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "*" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  proxy: {
    "/v1/*": "http://localhost:8080"
  }
    });
    server.listen(3000, "0.0.0.0");
});

