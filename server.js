'use strict';

process.on('uncaughtException', function (err) {
  console.log(err);
});

require('babel-core/register');

require('./server.dev');
