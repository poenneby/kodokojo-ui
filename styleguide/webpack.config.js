const path = require('path')

module.exports = {
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
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
        test: /\.jpg|png|svg$/, loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.ico$/, loader: 'file-loader?name=./[name].[ext]'
      }
    ]
  }
}
