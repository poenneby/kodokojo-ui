import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'

import api from '../../commons/config'
import { getHeaders } from '../../services/ioService'
import { ACCOUNT_ID_REQUEST, ACCOUNT_ID_SUCCESS, ACCOUNT_ID_FAILURE, ACCOUNT_REQUEST, ACCOUNT_SUCCESS, ACCOUNT_FAILURE } from '../../commons/constants'

export function requestAccountId(email) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: `http://${window.location.host||'localhost'}${api.user}`,
      headers: getHeaders(),
      types: [
        {
          type: ACCOUNT_ID_REQUEST,
          payload: (action, data) => ({
            email: email
          })
        },
        {
          type: ACCOUNT_ID_SUCCESS,
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
        ACCOUNT_ID_FAILURE
      ]

      // schema: user
    }
  }
}

export function requestAccount(email, data) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: `http://${window.location.host||'localhost'}${api.user}/${data.payload.account.id}`,
      // endpoint: `http://localhost/api/v1/user/${data.payload.account.id}`,
      headers: getHeaders(),
      body: JSON.stringify({
        email: email
      }),
      types: [
        ACCOUNT_REQUEST,
        {
          type: ACCOUNT_SUCCESS,
          payload: (action, state, res) => {
            return res.json().then(data => {
              return {
                account: data
              }
            })
          }
        },
        ACCOUNT_FAILURE
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
        browserHistory.push('/project')
      } else {
        throw new Error(data.payload.status)
      }
    }).catch(error => {
      // TODO do something with error, dispatch signin error maybe
      throw new Error(error.message)
    })
  }
}
