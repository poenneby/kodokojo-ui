import config from '../config/config'
import logger from '../config/logger'

import { requestWithLog } from './utils.server.service'
import endpoints from '../config/shared/api.endpoints'

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

projectRepository.putUserToProjectConfig = (headers, projectConfigId, users) => {
  logger.debug('putUserToProjectConfig', config.api.routes.projectConfig)
  return requestWithLog({
    method: 'PUT',
    uri: `${config.api.host}${config.api.routes.projectConfig}/${projectConfigId}${endpoints.projectConfigUser}`,
    json: true,
    headers: headers,
    body: users
  })
}

projectRepository.postProject = (headers, projectConfigId) => {
  logger.debug('postProject', config.api.routes.project)
  return requestWithLog({
    method: 'POST',
    uri: `${config.api.host}${config.api.routes.project}/${projectConfigId}`,
    json: true,
    headers: headers
  })
}

// Public API
export const postProjectConfig = projectRepository.postProjectConfig
export const getProjectConfig = projectRepository.getProjectConfig
export const putUserToProjectConfig = projectRepository.putUserToProjectConfig
export const postProject = projectRepository.postProject

// Service instance
export default projectRepository
