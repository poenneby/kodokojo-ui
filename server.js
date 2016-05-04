'use strict'

process.on('uncaughtException', function(err) {
  console.log(err)
})

// FIXME find another solution for production (see http://babeljs.io/docs/setup/#babel_register)
require('babel-core/register')

require('./server.dev')
