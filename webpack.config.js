var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    Datepicker: './src/Datepicker'
  },
  output: {
    libraryTarget: 'umd',
    library: 'Datepicker',
    path: './dist/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      { test: /\.scss/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') },
      { test: /\.css/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
      { test: /\.less/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') }
      // {
      //   test: /\.less/,
      //   loader: 'style-loader!css-loader!less-loader',
      // }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.less'],
    alias: {
      'DateUtil': path.resolve('./src/DateUtil.js')
    }
  },
  externals: [
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    },
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'moment': {
        root: 'moment',
        commonjs2: 'moment',
        commonjs: 'moment',
        amd: 'moment'
      }
    },
    {
      'react-onclickoutside': {
        root: 'OnClickOutside',
        commonjs2: 'react-onclickoutside',
        commonjs: 'react-onclickoutside',
        amd: 'react-onclickoutside'
      }
    }
  ],
  node: { Buffer: false },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    // new ExtractTextPlugin('[name].css'),
    // new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
