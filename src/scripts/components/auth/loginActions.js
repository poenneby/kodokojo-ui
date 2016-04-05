import { CALL_API } from 'redux-api-middleware'

import api from '../../commons/config'
// import { user } from '../../commons/schemas'
import authService from '../../services/authService'
import ioService from '../../services/ioService'
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, AUTH_RESET } from '../../commons/constants'

export function requestAuthentication(username, password) {
  authService.setAuth(username, password)
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `http://${window.location.host||'localhost'}${api.user}`,
      headers: ioService.getHeaders(),
      types: [
        AUTH_REQUEST,
        {
          type: AUTH_SUCCESS,
          payload: (action, state, res) => {
            return res.json().then(data => {
              return {
                account: data
              }
            })
          }
        },
        AUTH_FAILURE
      ]

      // schema: user
    }
  }
}

export function login(username, password) {
  return dispatch => {
    return dispatch(requestAuthentication(username, password)
    ).then(data => {
      if (!data.error) {
        const userId = data.payload.account.identifier
        authService.putAuth(userId)
      }
    }).catch(error => {
      // TODO do something with error
      console.log(error)
    })
  }
}

export function resetAuthentication() {
  return {
    type: AUTH_RESET
  }
}

export function logout() {
  return dispatch => {
    return dispatch(resetAuthentication()
    ).then(data => {
      if (!data.error) {
        authService.resetAuth()
      } else {
        throw new Error(data.payload.status)
      }
    }).catch(error => {
      // TODO do something with error dispatch signin error maybe
      // console.log('error', error)
    })
  }
}
