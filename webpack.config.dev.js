import path from 'path'
import webpack from 'webpack'
//var ExtractTextPlugin = require('extract-text-webpack-plugin')

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './src/app.js'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'app.js',
    publicPath: '/static/'
  },
  plugins: [
    //new ExtractTextPlugin("assets/styles/kodokojo.css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'config')
        ]
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
}