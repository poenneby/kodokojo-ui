import { CALL_API } from 'redux-api-middleware'

import api from '../../commons/config'
import { getHeaders } from '../../services/ioService'
import { mapUser } from '../../services/mappingService'
import {
  USER_NEW_ID_REQUEST,
  USER_NEW_ID_SUCCESS,
  USER_NEW_ID_FAILURE,
  USER_NEW_REQUEST,
  USER_NEW_SUCCESS,
  USER_NEW_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE
} from '../../commons/constants'

export function requestNewUserId(email) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint:
        `${window.location.protocol || 'http:'}//` +
        `${window.location.host || 'localhost'}${api.user}`,
      headers: getHeaders(),
      types: [
        {
          type: USER_NEW_ID_REQUEST,
          payload: (action, data) => ({
            email
          })
        },
        {
          type: USER_NEW_ID_SUCCESS,
          payload: (action, state, res) => res.text()
            .then(id => (
              {
                account: {
                  id
                }
              }
            ))
        },
        USER_NEW_ID_FAILURE
      ]

      // schema: user
    }
  }
}

export function requestNewUser(email, userId) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint:
        `${window.location.protocol || 'http:'}//` +
        `${window.location.host || 'localhost'}${api.user}/${userId}`,
      headers: getHeaders(),
      body: JSON.stringify({
        email
      }),
      types: [
        USER_NEW_REQUEST,
        {
          type: USER_NEW_SUCCESS,
          payload: (action, state, res) => res.json()
            .then(data => (
              {
                account: data
              }
            ))
        },
        USER_NEW_FAILURE
      ]

      // schema: user
    }
  }
}

export function createUser(email) {
  return dispatch => dispatch(requestNewUserId(email))
    .then(data => {
      if (!data.error && data.payload.account && data.payload.account.id) {
        const userId = data.payload.account.id
        return dispatch(requestNewUser(email, userId))
      }
      return Promise.reject(data.payload.status)
    })
    .catch(error => Promise.reject(error.message))
}

export function requestUser(userId) {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint:
        `${window.location.protocol || 'http:'}//` +
        `${window.location.host || 'localhost'}${api.user}/${userId}`,
      headers: getHeaders(),
      types: [
        USER_REQUEST,
        {
          type: USER_SUCCESS,
          payload: (action, state, res) => res.json()
            .then(data => (
              {
                user: mapUser(data)
              }
            ))
        },
        USER_FAILURE
      ]

      // schema: user
    }
  }
}

export function getUser(userId) {
  return dispatch => dispatch(requestUser(userId))
    .then(data => {
      if (!data.error) {
        return Promise.resolve()
      }
      return Promise.reject(data.payload.status)
    })
    .catch(error => Promise.reject(error.message))
}

