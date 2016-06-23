const path = require('path')
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^\.\/header/, 'custom-header')
  ],
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ],
    alias: {
      'custom-header': path.resolve('styleguide/ui/header.js')
    }
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style!css!less'
      },
      {
        test: /(\.scss|\.css)$/,
        loader:
          'style!css?sourceMap&modules&localIdentName=[name]---[local]---[hash:base64:5]&importLoaders=2!resolve-url!sass?sourceMap'
      },
      {
        test: /\.jpg|png|svg|gif$/, loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.ico$/, loader: 'file-loader?name=./[name].[ext]'
      }
    ]
  }
}
