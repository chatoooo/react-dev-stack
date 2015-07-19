import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
 
export default {
  entry: {
    app: path.resolve(__dirname, '../src/app.js'),
    vendor: ["react", "flux", "immutable"]
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'app.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"libs.js"),
    //new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.UglifyJsPlugin(),
    //new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("styles.css")
  ],
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.styl'],
    root: [path.resolve(__dirname, '../src')]
  },
  module: {
    loaders: [
      {
        test: /src\/.+\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /src\/styles\/.+\.styl$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
      }
    ]
  }
};
