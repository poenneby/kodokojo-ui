require('babel-core/register')
const config = require('./config').default

// output configuration in stdout for front configuration
const jsonConfig = JSON.stringify(config)
console.log(jsonConfig) // eslint-disable-line no-console
