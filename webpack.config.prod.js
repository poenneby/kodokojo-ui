'use strict'

var path = require('path')
var webpack = require('webpack')

// FIXME to prevent error, node-sass must be specifically 3.4.2
// see https://github.com/react-toolbox/react-toolbox-example/issues/19

module.exports = {
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.BABEL_ENV': '"production"'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'config/shared')
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style!css!less'
      },
      {
        test: /(\.scss|\.css)$/,
        loader:
          'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]&importLoaders=2!resolve-url!sass'
      }
    ]
  }
}
