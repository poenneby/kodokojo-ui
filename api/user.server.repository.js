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
import merge from 'lodash/merge'

import { requestWithLog } from './utils.server.service'

const userRepository = {}

userRepository.initUser = (request) => {
  logger.debug('initUser')

  return requestWithLog({
    method: 'POST',
    uri: `${config.api.protocol}${config.api.host}${config.api.routes.user}`,
    json: true,
    rejectUnauthorized: false,
    requestCert: true
  })
}

userRepository.postUser = (request) => {
  logger.debug('postUser')

  const { id, email, entity, credentials, captcha } = {
    id: request.params.id,
    email: request.body.email,
    entity: request.body.entity,
    credentials: request.headers.authorization,
    captcha: request.headers['g-recaptcha-response']
  }

  let req = {
    method: 'POST',
    uri: `${config.api.protocol}${config.api.host}${config.api.routes.user}/${id}`,
    json: true,
    body: {
      email,
      entity
    },
    rejectUnauthorized: false,
    requestCert: true
  }
  if (credentials) {
    req = merge(
      req,
      {
        headers: {
          Authorization: `${credentials}`
        }
      }
    )
  }
  if (captcha) {
    req = merge(
      req,
      {
        headers: {
          'g-recaptcha-response': `${captcha}`
        }
      }
    )
  }
  if (entity) {
    req = merge(
      req,
      {
        body: {
          entity: `${entity}`
        }
      }
    )
  }
  return requestWithLog(req)
}

userRepository.getUserAccount = (request) => {
  logger.debug('getUserAccount')

  const { credentials } = {
    credentials: `${request.headers.authorization}`
  }

  return requestWithLog({
    method: 'GET',
    uri: `${config.api.protocol}${config.api.host}${config.api.routes.user}`,
    json: true,
    headers: {
      Authorization: credentials
    },
    rejectUnauthorized: false,
    requestCert: true
  })
}

userRepository.getUser = (request) => {
  logger.debug('getUserAccount')

  const { credentials, userId } = {
    credentials: request.headers.authorization,
    userId: request.params.userId
  }

  return requestWithLog({
    method: 'GET',
    uri: `${config.api.protocol}${config.api.host}${config.api.routes.user}/${userId}`,
    headers: {
      Authorization: `${credentials}`
    },
    json: true,
    rejectUnauthorized: false,
    requestCert: true
  })
}

// Public methods
export const initUser = userRepository.initUser
export const postUser = userRepository.postUser
export const getUserAccount = userRepository.getUserAccount
export const getUser = userRepository.getUser

// Service instance
export default userRepository
