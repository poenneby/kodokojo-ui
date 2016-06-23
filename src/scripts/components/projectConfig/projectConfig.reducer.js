import merge from 'lodash/merge'

import { updateBricks } from '../../services/stateUpdater.service.js'

import {
  AUTH_RESET,
  PROJECT_CONFIG_REQUEST,
  PROJECT_CONFIG_SUCCESS,
  PROJECT_CONFIG_FAILURE,
  PROJECT_CONFIG_NEW_REQUEST,
  PROJECT_CONFIG_NEW_SUCCESS,
  PROJECT_CONFIG_NEW_FAILURE,
  PROJECT_CONFIG_ADD_USER_REQUEST,
  PROJECT_CONFIG_ADD_USER_SUCCESS,
  PROJECT_CONFIG_ADD_USER_FAILURE,
  PROJECT_SUCCESS,
  PROJECT_UPDATE
} from '../../commons/constants'

const initialState = {
  isFetching: false
}

export default function projectConfig(state = initialState, action) {
  if (action.type === PROJECT_CONFIG_NEW_REQUEST || action.type === PROJECT_CONFIG_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === PROJECT_CONFIG_NEW_SUCCESS || action.type === PROJECT_CONFIG_SUCCESS) {
    return merge(
      {},
      state,
      action.payload.projectConfig,
      {
        isFetching: false
      }
    )
  }

  if (action.type === PROJECT_CONFIG_NEW_FAILURE || action.type === PROJECT_CONFIG_FAILURE) {
    // TODO
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === PROJECT_CONFIG_ADD_USER_REQUEST) {
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

  if (action.type === PROJECT_SUCCESS) {
    const bricks = updateBricks(state.stacks[0].bricks, action.payload.project.stacks[0].bricks)
    return merge(
      {},
      state,
      {
        project: {
          id: action.payload.project.id,
          updateDate: action.payload.project.updateDate
        },
        stacks: [
          {
            bricks
          }
        ],
        isFetching: false
      }
    )
  }

  if (action.type === PROJECT_UPDATE && action.payload.brick.type !== 'LOADBALANCER') {
    const bricks = updateBricks(state.stacks[0].bricks, [action.payload.brick])
    return merge(
      {},
      state,
      {
        stacks: [
          {
            bricks
          }
        ],
        isFetching: false
      }
    )
  }

  // TODO refactor and DRY this
  // TODO TU
  if (action.type === AUTH_RESET) {
    const nextProjectConfig = {}
    if (state.id) {
      nextProjectConfig.id = state.id
    }
    if (state.project) {
      nextProjectConfig.project = {
        id: state.project.id
      }
    }
    return nextProjectConfig
  }

  return state
}
