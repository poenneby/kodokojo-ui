import merge from 'lodash/merge'
import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'

import {
  PROJECT_NEW_REQUEST,
  PROJECT_NEW_SUCCESS,
  PROJECT_NEW_FAILURE,
  PROJECT_REQUEST,
  PROJECT_SUCCESS,
  PROJECT_FAILURE,
  PROJECT_UPDATE
} from '../../commons/constants'

const initialState = {
  isFetching: false
}

export default function project(state = initialState, action) {
  if (action.type === PROJECT_NEW_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === PROJECT_NEW_SUCCESS) {
    return merge(
      {},
      state,
      action.payload.project,
      {
        isFetching: false
      }
    )
  }

  if (action.type === PROJECT_NEW_FAILURE) {
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === PROJECT_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === PROJECT_SUCCESS) {
    return merge(
      {},
      state,
      action.payload.project,
      {
        isFetching: false
      }
    )
  }

  if (action.type === PROJECT_FAILURE) {
    // TODO
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === PROJECT_UPDATE && action.payload.data.brickType !== 'LOADBALANCER') {
    const bricks = cloneDeep(state.stacks[0].bricks)
    const brickIndex = findIndex(bricks, {name: action.payload.data.brickName})
    bricks[brickIndex].state = action.payload.data.brickState
    bricks[brickIndex].url = action.payload.data.brickUrl
    return merge(
      {},
      state,
      {
        stacks: [
          {
            bricks: bricks
          }
        ],
        isFetching: false
      }
    )
  }

  return state
}