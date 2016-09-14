/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2016 Kodo Kojo (infos@kodokojo.io)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import config from '../config/config'
import logger from '../config/logger'

import { requestWithLog } from './utils.server.service'
import endpoints from '../config/shared/api.endpoints'

const projectRepository = {}

projectRepository.postProjectConfig = (headers, name, ownerId, userIds) => {
  logger.debug('postProjectConfig')
  return requestWithLog({
    method: 'POST',
    uri: `${config.api.host}${config.api.routes.projectConfig}`,
    json: true,
    headers,
    body: {
      name,
      ownerIdentifier: ownerId,
      userIdentifiers: userIds
    },
    rejectUnauthorized: false,
    requestCert: true
  })
}

projectRepository.getProjectConfig = (headers, projectConfigId) => {
  logger.debug('getProjectConfig')
  return requestWithLog({
    method: 'GET',
    uri: `${config.api.host}${config.api.routes.projectConfig}/${projectConfigId}`,
    json: true,
    headers,
    rejectUnauthorized: false,
    requestCert: true
  })
}

projectRepository.putUserToProjectConfig = (headers, projectConfigId, userList) => {
  logger.debug('putUserToProjectConfig')
  return requestWithLog({
    method: 'PUT',
    uri: `${config.api.host}${config.api.routes.projectConfig}/${projectConfigId}${endpoints.projectConfigUser}`,
    json: true,
    headers,
    body: userList,
    rejectUnauthorized: false,
    requestCert: true
  })
}

projectRepository.postProject = (headers, projectConfigId) => {
  logger.debug('postProject')
  return requestWithLog({
    method: 'POST',
    uri: `${config.api.host}${config.api.routes.project}/${projectConfigId}`,
    json: true,
    headers,
    rejectUnauthorized: false,
    requestCert: true
  })
}

projectRepository.getProject = (headers, projectId) => {
  logger.debug('getProject')
  return requestWithLog({
    method: 'GET',
    uri: `${config.api.host}${config.api.routes.project}/${projectId}`,
    json: true,
    headers,
    rejectUnauthorized: false,
    requestCert: true
  })
}

// Public API
export const postProjectConfig = projectRepository.postProjectConfig
export const getProjectConfig = projectRepository.getProjectConfig
export const putUserToProjectConfig = projectRepository.putUserToProjectConfig
export const postProject = projectRepository.postProject
export const getProject = projectRepository.getProject

// Service instance
export default projectRepository
