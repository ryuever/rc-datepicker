var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './example/src/index'
  ],
  output: {
    path: path.resolve('./example/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],

    // Needed to direct the docs to the local version of the datepicker, this is not needed for
    // normal setup.
    alias: {
      'Sample/dist/sample.css': path.resolve('./src/stylesheets/sample.less'),
      'Datepicker': path.resolve('./src/Datepicker.js'),
      'DateUtil': path.resolve('./src/DateUtil.js')
    }
  },
  module: {
    loaders: [
      { test: /\.js/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.scss/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') },
      { test: /\.css/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
      { test: /\.less/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') }
    ]
  },
  node: { Buffer: false },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    // new ExtractTextPlugin('[name].css'),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
