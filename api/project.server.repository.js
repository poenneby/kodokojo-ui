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

projectRepository.getProjectConfig = (headers, projectConfigId) => {
  logger.debug('getProjectConfig', config.api.routes.projectConfig)
  return requestWithLog({
    method: 'GET',
    uri: `${config.api.host}${config.api.routes.projectConfig}/${projectConfigId}`,
    json: true,
    headers: headers
  })
}

// Public API
export const postProjectConfig = projectRepository.postProjectConfig
export const getProjectConfig = projectRepository.getProjectConfig

// Service instance
export default projectRepository
