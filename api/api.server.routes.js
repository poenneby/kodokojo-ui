import express from 'express'
const router = express.Router()

import config from '../config/config'
import * as user from './user.server.controller'

router.post(config.api.routes.user, user.initUser)

router.post(`${config.api.routes.user}/:id`, user.postUser)

export default (app) => {
  app.use(router)
}