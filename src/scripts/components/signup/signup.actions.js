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

import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'

import api from '../../commons/config'
import { getHeaders } from '../../services/io.service'
import { setAuth, putAuth } from '../../services/auth.service'
import { mapAccount } from '../../services/mapping.service'
import { requestWebsocket } from '../websocket/websocket.actions.js'
import {
  ACCOUNT_NEW_ID_REQUEST,
  ACCOUNT_NEW_ID_SUCCESS,
  ACCOUNT_NEW_ID_FAILURE,
  ACCOUNT_NEW_REQUEST,
  ACCOUNT_NEW_SUCCESS,
  ACCOUNT_NEW_FAILURE
} from '../../commons/constants'

export function requestAccountId(email) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint:
        `${window.location.protocol || 'http:'}//` +
        `${window.location.host || 'localhost'}${api.user}`,
      headers: getHeaders(),
      types: [
        {
          type: ACCOUNT_NEW_ID_REQUEST,
          payload: (action, data) => ({
            email
          })
        },
        {
          type: ACCOUNT_NEW_ID_SUCCESS,
          payload: (action, state, res) => res.text()
            .then(id => (
              {
                account: {
                  id
                }
              }
            ))
        },
        ACCOUNT_NEW_ID_FAILURE
      ]

      // schema: user
    }
  }
}

export function requestAccount(email, data) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint:
        `${window.location.protocol || 'http:'}//` +
        `${window.location.host || 'localhost'}${api.user}/${data.payload.account.id}`,
      headers: getHeaders(),
      body: JSON.stringify({
        email
      }),
      types: [
        ACCOUNT_NEW_REQUEST,
        {
          type: ACCOUNT_NEW_SUCCESS,
          payload: (action, state, res) => res.json()
            .then(account => (
              {
                account: mapAccount(account)
              }
            ))
        },
        ACCOUNT_NEW_FAILURE
      ]

      // schema: user
    }
  }
}

export function createAccount(email) {
  return dispatch => dispatch(requestAccountId(email))
    .then(data => {
      if (!data.error) {
        return dispatch(requestAccount(email, data))
      }
      throw new Error(data.payload.status)
    })
    .then(data => {
      if (!data.error) {
        // we set auth
        setAuth(data.payload.account.userName, data.payload.account.password)
        putAuth(data.payload.account.id, data.payload.account.userName)
        // init websocket and go to first project
        return dispatch(requestWebsocket())
          .then(() => Promise.resolve(browserHistory.push('/firstProject')))
      }
      throw new Error(data.payload.status)
    })
    .catch(error => {
      throw new Error(error.message)
    })
}
