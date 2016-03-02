'use strict'

import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import config from './webpack.config.dev'
import logger from './config/logger'

import apiRoutes from './api/api.server.routes'

// express config
const app = express()
global.__baseDirname = __dirname

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// routes
apiRoutes(app)

// webpack dev server config
const compiler = webpack(config)
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler))

// static content
app.use('/static', express.static('static'))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'))
})

// server config
app.listen(3000, 'localhost', function(err) {
  if (err) {
    logger.error(err)
    return
  }

  logger.info('Listening at http://localhost:3000')
})

export default app