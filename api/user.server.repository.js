import config from '../config/config'
import logger from '../config/logger'
import _ from 'lodash'

import { requestWithLog } from './utils.server.service'

const userRepository = {}

userRepository.initUser = () => {
  logger.info('host', config.api.host)
  logger.debug('initUser', config.api.routes.initUser)
  return requestWithLog(_.merge({
    method: 'POST',
    uri: `${config.api.host}${config.api.routes.initUser}`,
    json: true
  }))
}

// Public methods
export const initUser = userRepository.initUser

// Service instance
export default userRepository





