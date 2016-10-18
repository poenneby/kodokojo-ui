const uuid = require('uuid')

exports.controller = function(req, res, next) {
  res.contentType = 'application/text'
  const id = uuid.v4()
  res.send(200, id)
  next()
}
