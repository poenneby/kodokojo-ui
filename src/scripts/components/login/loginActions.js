import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'

import { EMAIL_INIT, EMAIL_SENT, ACCOUNT_INIT, ACCOUNT_CREATED } from '../../commons/constants'
import api from '../../commons/config'

export function emailSend(email) {
  return {
    type: EMAIL_INIT,
    email: email
  }
}

export function emailSent(email) {
  return {
    type: EMAIL_SENT,
    payload: {
      email: email
    }
  }
}

export function sendEmail(email) {

  return dispatch => {
    dispatch(emailSend(email))

    // TODO remove basic auth
    return fetch(`http://${window.location.host}${api.user}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46c3VwZXJBZA=='
      }
    }).then(response => {
      if (response.status >= 400) {
        throw new Error('Server error')
      }
      return response.text()

    }).then(accountId => {
      dispatch(emailSent(email))

      return accountId

    }).then(accountId => dispatch(createAccount(email, accountId)))
  }
}

export function accountInit(accountId) {
  return {
    type: ACCOUNT_INIT,
    account: accountId
  }
}

export function accountCreated(accountId, data) {
  browserHistory.push('/project')
  return {
    type: ACCOUNT_CREATED,
    payload: {
      account: data
    }
  }

}

export function createAccount(email, accountId) {
  return dispatch => {
    dispatch(accountInit(accountId))

    // TODO remove basic auth
    return fetch(`http://${window.location.host}${api.user}/${accountId}`, {
      method: 'PUT',
      body: JSON.stringify({
        email: email
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46c3VwZXJBZA=='
      }
    }).then(response => {
      if (response.status >= 400) {
        throw new Error('Server error')
      }
      return response.json()

    }).then(data => dispatch(accountCreated(accountId, data)))
  }
}
