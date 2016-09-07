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

userRepository.initUser = () => {
  logger.debug('initUser', config.api.routes.user)
  return requestWithLog({
    method: 'POST',
    uri: `${config.api.host}${config.api.routes.user}`,
    json: true,
    rejectUnauthorized: false,
    requestCert: true
  })
}

userRepository.postUser = ({ id, email, entity, credentials, captcha }) => {
  logger.debug(
    'postUser', id,
    'Email', email,
    'Entity', entity,
    'Authorization', credentials,
    'g-recaptcha-response', captcha
  )
  let req = {
    method: 'POST',
    uri: `${config.api.host}${config.api.routes.user}/${id}`,
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

userRepository.getUserAccount = (credentials) => {
  logger.debug('getUserAccount', credentials)
  return requestWithLog({
    method: 'GET',
    uri: `${config.api.host}${config.api.routes.user}`,
    json: true,
    headers: {
      Authorization: `${credentials}`
    },
    rejectUnauthorized: false,
    requestCert: true
  })
}

userRepository.getUser = (credentials, userId) => {
  logger.debug('getUserAccount', credentials)
  return requestWithLog({
    method: 'GET',
    uri: `${config.api.host}${config.api.routes.user}/${userId}`,
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
