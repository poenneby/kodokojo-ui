import merge from 'lodash/merge'
import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'

import {
  PROJECT_CONFIG_REQUEST,
  PROJECT_CONFIG_SUCCESS,
  PROJECT_CONFIG_FAILURE,
  PROJECT_CONFIG_ADD_USER_REQUEST,
  PROJECT_CONFIG_ADD_USER_SUCCESS,
  PROJECT_CONFIG_ADD_USER_FAILURE,
  PROJECT_REQUEST,
  PROJECT_SUCCESS,
  PROJECT_FAILURE,
  PROJECT_UPDATE
} from '../../commons/constants'

const initialState = {
  isFetching: false
}

export default function project(state = initialState, action) {
  if (action.type === PROJECT_CONFIG_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === PROJECT_CONFIG_SUCCESS) {
    return merge(
      {},
      state,
      action.payload.projectConfig,
      {
        isFetching: false
      }
    )
  }

  if (action.type === PROJECT_CONFIG_FAILURE) {
    // TODO
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type ===   PROJECT_CONFIG_ADD_USER_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === PROJECT_CONFIG_ADD_USER_SUCCESS) {
    return merge(
      {},
      state,
      {
        isFetching: false
      }
    )
  }

  if (action.type === PROJECT_CONFIG_ADD_USER_FAILURE) {
    // TODO
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === PROJECT_UPDATE && action.payload.data.brickType !== 'LOADBALANCER') {
    const brickConfigs = cloneDeep(state.stacks[0].brickConfigs)
    const brickIndex = findIndex(brickConfigs, {name: action.payload.data.brickName})
    brickConfigs[brickIndex].state = action.payload.data.brickState
    brickConfigs[brickIndex].url = action.payload.data.brickUrl
    return merge(
      {},
      state,
      {
        stacks: [
          {
            brickConfigs: brickConfigs
          }
        ],
        isFetching: false
      }
    )
  }

  return state
}