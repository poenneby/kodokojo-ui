import { CALL_API } from 'redux-api-middleware'
import Promise from 'bluebird'

import api from '../../commons/config'
import { getHeaders } from '../../services/io.service'
import { mapBricksDetails } from '../../services/mapping.service'
import {
  BRICK_REQUEST,
  BRICK_SUCCESS,
  BRICK_FAILURE
} from '../../commons/constants'

export function fetchBricks() {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint:
      `${window.location.protocol || 'http:'}//` +
      `${window.location.host || 'localhost'}${api.brick}`,
      headers: getHeaders(),
      types: [
        BRICK_REQUEST,
        {
          type: BRICK_SUCCESS,
          payload: (action, state, res) => res.json()
            .then(bricks => mapBricksDetails(bricks))
        },
        BRICK_FAILURE
      ]
    }
  }
}

export function getBricks() {
  return dispatch => dispatch(fetchBricks())
    .then(data => {
      if (!data.error) {
        return Promise.resolve(data)
      }
      throw new Error(data.payload.status)
    })
    .catch(error => {
      throw new Error(error.message)
    })
}
