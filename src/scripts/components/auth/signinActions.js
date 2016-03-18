import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'

import api from '../../commons/config'
import { ACCOUNT_ID_REQUEST, ACCOUNT_ID_SUCCESS, ACCOUNT_REQUEST, ACCOUNT_SUCCESS } from '../../commons/constants'

export function initAccountId(email) {
  return {
    type: ACCOUNT_ID_REQUEST,
    email: email
  }
}

export function returnAccountId(accountId) {
  return {
    type: ACCOUNT_ID_SUCCESS,
    payload: {
      account: {
        id: accountId
      }
    }
  }
}

export function initAccount() {
  return {
    type: ACCOUNT_REQUEST
  }
}

export function returnAccount(data) {
  browserHistory.push('/project')
  return {
    type: ACCOUNT_SUCCESS,
    payload: {
      account: data
    }
  }
}

export function createAccount(email) {

  return dispatch => {
    dispatch(initAccountId(email))

    // TODO manage basic auth in a distinct service or middleware
    return fetch(`http://${window.location.host}${api.user}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        //'Authorization': 'Basic YWRtaW46c3VwZXJBZA=='
      }
    }).then(response => {
      if (response.status >= 400) {
        throw new Error('Server error')
      }
      return response.text()

    }).then(accountId => {
      dispatch(returnAccountId(accountId))

      return accountId

    }).then(accountId => {
      dispatch(initAccount())

      // TODO manage basic auth in a distinct service or middleware
      return fetch(`http://${window.location.host}${api.user}/${accountId}`, {
        method: 'PUT',
        body: JSON.stringify({
          email: email
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          //'Authorization': 'Basic YWRtaW46c3VwZXJBZA=='
        }
      }).then(response => {
        if (response.status >= 400) {
          throw new Error('Server error')
        }
        return response.json()

      }).then(data => dispatch(returnAccount(accountId, data)))
    })
  }
}
