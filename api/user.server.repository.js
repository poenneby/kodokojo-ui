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

userRepository.putUser = (id, email) => {
  logger.debug('putUser', id, 'Email', email)
  return requestWithLog({
    method: 'PUT',
    uri: `${config.api.host}${config.api.routes.user}/${id}`,
    json: true,
    body: {
      email: email
    }
  })
}

// Public methods
export const initUser = userRepository.initUser
export const putUser = userRepository.putUser

// Service instance
export default userRepository





