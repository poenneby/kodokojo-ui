import express from 'express'
const router = express.Router()

import config from '../config/config'
import * as user from './user.server.controller'
import * as project from './project.server.controller'

router.post(config.api.routes.user, user.initUser)

router.post(`${config.api.routes.user}/:id`, user.postUser)

router.get(`${config.api.routes.user}/`, user.getUserAccount)

router.post(`${config.api.routes.projectConfig}/`, project.postProjectConfig)

router.get(`${config.api.routes.projectConfig}/:projectConfigId`, project.getProjectConfig)

export default (app) => {
  app.use(router)
}