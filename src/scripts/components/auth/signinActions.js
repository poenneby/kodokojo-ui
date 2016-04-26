import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'

import api from '../../commons/config'
import { getHeaders } from '../../services/ioService'
import { setAuth, putAuth } from '../../services/authService'
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
      endpoint: `${window.location.protocol||'http:'}//${window.location.host||'localhost'}${api.user}`,
      headers: getHeaders(),
      types: [
        {
          type: ACCOUNT_NEW_ID_REQUEST,
          payload: (action, data) => ({
            email: email
          })
        },
        {
          type: ACCOUNT_NEW_ID_SUCCESS,
          payload: (action, state, res) => {
            return res.text().then(id => {
              return {
                account: {
                  id: id
                }
              }
            })
          }
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
      endpoint: `${window.location.protocol||'http:'}//${window.location.host||'localhost'}${api.user}/${data.payload.account.id}`,
      headers: getHeaders(),
      body: JSON.stringify({
        email: email
      }),
      types: [
        ACCOUNT_NEW_REQUEST,
        {
          type: ACCOUNT_NEW_SUCCESS,
          payload: (action, state, res) => {
            return res.json().then(data => {
              return {
                account: data
              }
            })
          }
        },
        ACCOUNT_NEW_FAILURE
      ]

      // schema: user
    }
  }
}

export function createAccount(email) {
  return dispatch => {
    return dispatch(requestAccountId(email)
    ).then(data => {
      if (!data.error) {
        return dispatch(requestAccount(email, data))
      } else {
        throw new Error(data.payload.status)
      }
    }).then(data => {
      if (!data.error) {
        setAuth(data.payload.account.username, data.payload.account.password)
        putAuth(data.payload.account.identifier)
        browserHistory.push('/firstproject')
      } else {
        throw new Error(data.payload.status)
      }
    }).catch(error => {
      // TODO do something with error
      throw new Error(error.message)
    })
  }
}
