import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'

import api from '../../commons/config'
import { ACCOUNT_ID_REQUEST, ACCOUNT_ID_SUCCESS, ACCOUNT_ID_FAILURE, ACCOUNT_REQUEST, ACCOUNT_SUCCESS, ACCOUNT_FAILURE } from '../../commons/constants'

export function requestAccountId(email) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: `http://${window.location.host||'localhost'}${api.user}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
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
    ).then(data => dispatch(requestAccount(email, data))
    ).then(() => {
      browserHistory.push('/project')
    }).catch(error => {
      // TODO do something with
      console.log(error)
    })
  }
}
