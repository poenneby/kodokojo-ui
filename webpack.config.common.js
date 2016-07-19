'use strict'

var path = require('path')

module.exports = {
  entry: [
    './src/app.js'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'app.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /styleguide/],
        loaders: ['eslint'],
        include: [
          path.join(__dirname, 'api'),
          path.join(__dirname, 'config'),
          path.join(__dirname, 'src')
        ]
      }
    ],
    loaders: [
      {
        test: /\.jpg|png|svg|gif$/,
        loader: 'file-loader?name=assets/images/[name].[ext]'
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=./[name].[ext]'
      }
    ]
  }
}
