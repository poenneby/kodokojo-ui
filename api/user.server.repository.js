import config from '../config/config'
import logger from '../config/logger'

import { requestWithLog } from './utils.server.service'

const userRepository = {}

userRepository.initUser = () => {
  logger.debug('initUser', config.api.routes.user)
  return requestWithLog({
    method: 'POST',
    uri: `${config.api.host}${config.api.routes.user}`,
    json: true
  })
}

userRepository.postUser = (id, email) => {
  logger.debug('putUser', id, 'Email', email)
  return requestWithLog({
    method: 'POST',
    uri: `${config.api.host}${config.api.routes.user}/${id}`,
    json: true,
    body: {
      email: email
    }
  })
}

// Public methods
export const initUser = userRepository.initUser
export const postUser = userRepository.postUser

// Service instance
export default userRepository





