import merge from 'lodash/merge'
import each from 'lodash/each'
import {
  PROJECT_CONFIG_REQUEST,
  PROJECT_CONFIG_SUCCESS,
  PROJECT_CONFIG_FAILURE,
  PROJECT_CONFIG_ADD_USER_REQUEST,
  PROJECT_CONFIG_ADD_USER_SUCCESS,
  PROJECT_CONFIG_ADD_USER_FAILURE
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
      {
        projectConfig: {
          id: action.payload.projectConfig.identifier,
          name: action.payload.projectConfig.name,
          owner: action.payload.projectConfig.owner,
          stack: action.payload.projectConfig.stackConfigs,
          users: each(action.payload.projectConfig.users, user => {
            return {
              id: user.identifier
            }
          })
        },
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

  return state
}