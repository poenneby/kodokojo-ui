import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'

import api from '../../commons/config'
import { getHeaders } from '../../services/ioService'
import {
  PROJECT_REQUEST,
  PROJECT_SUCCESS,
  PROJECT_FAILURE,
  PROJECT_UPDATE
} from '../../commons/constants'


export function requestProject(projectConfigId) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: `${window.location.protocol||'http:'}//${window.location.host||'localhost'}${api.project}/${projectConfigId}`,
      headers: getHeaders(),
      types: [
        PROJECT_REQUEST,
        {
          type: PROJECT_SUCCESS,
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
        PROJECT_FAILURE
      ]
    }
  }
}

export function createProject(projectConfigId) {
  return dispatch => {
    return dispatch(requestProject(projectConfigId)
    ).then(data => {
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

export function updateProject(event) {
  return {
    type: PROJECT_UPDATE,
    payload: event
  }
}
