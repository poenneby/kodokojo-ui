import winston from 'winston'

const loggerTransports = [new winston.transports.Console({
  handleExceptions: true,
  level: 'debug',
  timestamp: function () {
    return new Date().toISOString();
  },
  colorize: true
})]

const logger = new (winston.Logger)({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  transports: loggerTransports,
  exitOnError: false
})

export default logger
