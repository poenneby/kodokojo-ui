import express from 'express'
const router = express.Router()

import config from '../config/config'
import * as user from './user.server.controller'

router.post(config.api.routes.initUser, user.initUser);

//router.put(config.api.routes.putUser, user.putUser);

export default (app) => {
  app.use(router);
}