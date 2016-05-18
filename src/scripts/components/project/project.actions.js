import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'

import api from '../../commons/config'
import { getHeaders } from '../../services/ioService'
import { mapProject } from '../../services/mappingService'
import {
  PROJECT_REQUEST,
  PROJECT_SUCCESS,
  PROJECT_FAILURE,
  PROJECT_NEW_REQUEST,
  PROJECT_NEW_SUCCESS,
  PROJECT_NEW_FAILURE,
  PROJECT_UPDATE
} from '../../commons/constants'


export function requestNewProject(projectConfigId) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: `${window.location.protocol||'http:'}//${window.location.host||'localhost'}${api.project}/${projectConfigId}`,
      headers: getHeaders(),
      types: [
        PROJECT_NEW_REQUEST,
        {
          type: PROJECT_NEW_SUCCESS,
          payload: (action, state, res) => {
            return res.text().then(id => {
              return {
                project: {
                  id: id
                }
              }
            })
          }
        },
        PROJECT_NEW_FAILURE
      ]
    }
  }
}

export function createProject(projectConfigId) {
  return dispatch => {
    return dispatch(requestNewProject(projectConfigId)
    ).then(data => {
      if (!data.error) {
        return dispatch(getProject(data.payload.project.id))
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
      throw new Error(error.message)
    })
  }
}

export function fetchProject(projectId) {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `${window.location.protocol||'http:'}//${window.location.host||'localhost'}${api.project}/${projectId}`,
      headers: getHeaders(),
      types: [
        PROJECT_REQUEST,
        {
          type: PROJECT_SUCCESS,
          payload: (action, state, res) => {
            return res.json().then(project => {
              return {
                project: mapProject(project)
              }
            })
          }
        },
        PROJECT_FAILURE
      ]
    }
  }
}

export function getProject(projectId) {
  return dispatch => {
    return dispatch(fetchProject(projectId)
    ).then(data => {
      if (!data.error) {
        return data
      } else {
        throw new Error(data.payload.status)
      }
    }).catch(error => {
      throw new Error(error.message)
    })
  }
}

export function updateProject(event) {
  return {
    type: PROJECT_UPDATE,
    payload: event
  }
}
