import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'

import api from '../../commons/config'
// import { user } from '../../commons/schemas'
import authService from '../../services/authService'
import ioService from '../../services/ioService'
import { mapAccount } from '../../services/mappingService'
import { getProject } from '../project/project.actions'
import { getProjectConfigAndProject } from '../projectConfig/projectConfig.actions'
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_RESET
} from '../../commons/constants'

export function requestAuthentication() {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint:
        `${window.location.protocol || 'http:'}//` +
        `${window.location.host || 'localhost'}${api.user}`,
      headers: ioService.getHeaders(),
      types: [
        AUTH_REQUEST,
        {
          type: AUTH_SUCCESS,
          payload: (action, state, res) => res.json()
            .then(account => (
              {
                account: mapAccount(account)
              }
            ))
        },
        AUTH_FAILURE
      ]
      // schema: user
    }
  }
}

export function login(username, password) {
  authService.setAuth(username, password)
  return dispatch => dispatch(requestAuthentication())
    .then(data => {
      if (!data.error) {
        authService.putAuth(data.payload.account.id)

        if (data.payload.account.projectConfigIds.length) {
          const projectConfig = data.payload.account.projectConfigIds[0]

          if (projectConfig.projectId) {
            // get project config and project and redirect to project
            return dispatch(
              getProjectConfigAndProject(projectConfig.projectConfigId, projectConfig.projectId))
                .then(Promise.resolve(browserHistory.push('/stacks')))
          }
          if (!projectConfig.projectId) {
            // TODO second case, project config has no project id
            // must redirect to project config stack, with a button to start it
            return Promise.resolve()
          }
        }
        // if no ids, redirect to first project
        return Promise.resolve(browserHistory.push('/firstProject'))
      }
      throw new Error(data.payload.status)
    })
    .catch(error => {
      throw new Error(error.message)
    })
}

export function resetAuthentication() {
  return {
    type: AUTH_RESET
  }
}

export function logout() {
  return dispatch => dispatch(resetAuthentication())
    .then(data => {
      if (!data.error) {
        authService.resetAuth()
        return Promise.resolve()
      }
      throw new Error(data.payload.status)
    })
    .catch(error => {
      throw new Error(error.message)
    })
}
