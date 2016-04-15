import config from '../config/config'
import logger from '../config/logger'

import { requestWithLog } from './utils.server.service'

const projectRepository = {}

projectRepository.postProjectConfig = (headers, name, ownerId, userIds) => {
  logger.debug('postProjectConfig', config.api.routes.projectConfig)
  return requestWithLog({
    method: 'POST',
    uri: `${config.api.host}${config.api.routes.projectConfig}`,
    json: true,
    headers: headers,
    body: {
      name: name,
      ownerIdentifier: ownerId,
      userIdentifiers: userIds
    }
  })
}

// Public API
export const postProjectConfig = projectRepository.postProjectConfig

// Service instance
export default projectRepository
