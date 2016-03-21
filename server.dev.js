'use strict'

import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackConfig from './webpack.config.dev'
import config from './config/config'
import logger from './config/logger'

import apiRoutes from './api/api.server.routes'

// express config
const app = express()
global.__baseDirname = __dirname

// Return error if DOCKER_HOST isn’t set
if (config.api.host) {
  logger.info('host', config.api.host)
} else {
  logger.error('DOCKER_HOST isn’t set')
  config.api.error = true
}

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// routes
apiRoutes(app)

// webpack dev server config
const compiler = webpack(webpackConfig)
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler))

// static content
app.use('/static', express.static('static'))

// serve index.html for all get to anything but /api
app.get(/^(\/(?!api).*)$/, function(req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'))
})

// server config
const port = config.server.port

if (config.api.error) {
  logger.error('Error: Server can’t be started')
  throw new Error('Server error')
} else {
  app.listen(port, 'localhost', function(err) {
    if (err) {
      logger.error(err)
    } else {
      logger.info('==> 🌍  Listening at http://localhost:%s', port)
    }
  })
}

export default app