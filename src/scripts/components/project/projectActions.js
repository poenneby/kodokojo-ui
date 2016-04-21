import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'

import api from '../../commons/config'
import { getHeaders } from '../../services/ioService'
import { PROJECT_CONFIG_REQUEST, PROJECT_CONFIG_SUCCESS, PROJECT_CONFIG_FAILURE } from '../../commons/constants'

export function requestProjectConfig(projectName, projectOwner, projectUsers) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: `http://${window.location.host||'localhost'}${api.projectConfig}`,
      headers: getHeaders(),
      body: JSON.stringify({
        name: projectName,
        ownerIdentifier: projectOwner,
        userIdentifiers: projectUsers
      }),
      types: [
        PROJECT_CONFIG_REQUEST,
        {
          type: PROJECT_CONFIG_SUCCESS,
          payload: (action, state, res) => {
            return res.text().then(id => {
              return {
                projectConfig: {
                  id: id
                }
              }
            })
          }
        },
        PROJECT_CONFIG_FAILURE
      ]
    }
  }
}

export function createProjectConfig(projectName, projectOwner, projectUsers) {
  return dispatch => {
    return dispatch(requestProjectConfig(projectName, projectOwner, projectUsers)
    ).then(data => {
      if (!data.error) {
        browserHistory.push(`/project/${data.payload.projectConfig.id}`)
      } else {
        throw new Error(data.payload.status)
      }
    }).catch(error => {
      // TODO do something with error
      throw new Error(error.message)
    })
  }
}

export function fetchProjectConfig(projectConfigId) {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `http://${window.location.host||'localhost'}${api.projectConfig}/${projectConfigId}`,
      headers: getHeaders(),
      types: [
        PROJECT_CONFIG_REQUEST,
        {
          type: PROJECT_CONFIG_SUCCESS,
          payload: (action, state, res) => {
            return res.json().then(projectConfig => {
              return {
                projectConfig: projectConfig
              }
            })
          }
        },
        PROJECT_CONFIG_FAILURE
      ]
    }
  }
}

export function getProjectConfig(projectConfigId) {
  return dispatch => {
    dispatch(fetchProjectConfig(projectConfigId))
  }
}