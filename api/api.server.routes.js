import express from 'express'
const router = express.Router()

import config from '../config/config'
import * as user from './user.server.controller'

router.post(config.api.routes.user, user.initUser)

router.put(`${config.api.routes.user}/:id`, user.putUser)

export default (app) => {
  app.use(router)
}