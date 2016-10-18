/* eslint-disable quotes */

exports.controller = function(req, res, next) {
  console.log('start')
  // const nextUserEmail = req.body && req.body.email ? req.body.email : ''
  // const nextUserUserName = nextUserEmail.substr(0, nextUserEmail.indexOf('@'))

  console.log('body', req.body, 'params', req.params)

  // to send 200, nodified user email must be aletaxin
  // if (nextUserUserName  === 'aletaxin') {
  //   res.send(200)
  // } else {
  //   res.send(500)
  // }

  res.contentType = 'application/json'
  res.send(200)
  next()
}