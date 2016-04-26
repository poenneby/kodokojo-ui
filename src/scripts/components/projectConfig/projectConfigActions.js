import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'

import api from '../../commons/config'
import { getHeaders } from '../../services/ioService'
import { mapProjectConfig } from '../../services/mappingService'
import { createUser, getUser } from '../user/userActions'
import {
  PROJECT_CONFIG_REQUEST,
  PROJECT_CONFIG_SUCCESS,
  PROJECT_CONFIG_FAILURE,
  PROJECT_CONFIG_ADD_USER_REQUEST,
  PROJECT_CONFIG_ADD_USER_SUCCESS,
  PROJECT_CONFIG_ADD_USER_FAILURE
} from '../../commons/constants'

export function requestProjectConfig(projectName, projectOwner, projectUsers) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: `${window.location.protocol||'http:'}//${window.location.host||'localhost'}${api.projectConfig}`,
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
        return dispatch(getProjectConfig(data.payload.projectConfig.id))
      } else {
        throw new Error(data.payload.status)
      }
    }).then(() => {
      browserHistory.push('/projectConfig')
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
      endpoint: `${window.location.protocol||'http:'}//${window.location.host||'localhost'}${api.projectConfig}/${projectConfigId}`,
      headers: getHeaders(),
      types: [
        PROJECT_CONFIG_REQUEST,
        {
          type: PROJECT_CONFIG_SUCCESS,
          payload: (action, state, res) => {
            return res.json().then(projectConfig => {
              return {
                projectConfig: mapProjectConfig(projectConfig)
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
    return dispatch(fetchProjectConfig(projectConfigId)
    ).then(data => {
      if (!data.error && data.payload.projectConfig.users) {
        data.payload.projectConfig.users.forEach((user) => {
          dispatch(getUser(user.id))
        })
      } else {
        throw new Error(data.payload.status)
      }
    }).catch(error => {
      // TODO do something with error
      throw new Error(error.message)
    })
  }
}

export function requestAddUserToProjectConfig(projectConfigId, userId) {
  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `${window.location.protocol||'http:'}//${window.location.host||'localhost'}${api.projectConfig}/${projectConfigId}${api.projectConfigUser}`,
      headers: getHeaders(),
      body: JSON.stringify([userId]),
      types: [
        PROJECT_CONFIG_ADD_USER_REQUEST,
        PROJECT_CONFIG_ADD_USER_SUCCESS,
        PROJECT_CONFIG_ADD_USER_FAILURE
      ]
    }
  }
}

export function addUserToProjectConfig(projectConfigId, email) {
  return dispatch => {
    return dispatch(createUser(email)
    ).then(data => {
      if (!data.error) {
        // TODO add dispatch show user details when user is created
        return dispatch(requestAddUserToProjectConfig(projectConfigId, data.payload.account.identifier))
      } else {
        throw new Error(data.payload.status)
      }
    }).then(data => {
      if (!data.error) {
        return dispatch(getProjectConfig(projectConfigId))
      } else {
        throw new Error(data.payload.status)
      }
    }).catch(error => {
      // TODO do something with error
      throw new Error(error.message)
    })
  }
}
