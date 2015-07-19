import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack'; 
export default {
  entry: {
    app: ["webpack/hot/dev-server", path.resolve(__dirname, '../src/app.js')],
    //vendor: ["react", "flux", "immutable"]
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/assets/',
    filename: '[name].js'
  },
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin("init.js"),
    //new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"libs.js"),
    //new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.UglifyJsPlugin(),
    //new webpack.optimize.OccurenceOrderPlugin(),
    //new ExtractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
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
        loaders: ['react-hot', 'babel']
      },
      {
        test: /src\/styles\/.+\.styl$/,
        loader: "style-loader!css-loader!stylus-loader"
      }
    ]
  }
};
