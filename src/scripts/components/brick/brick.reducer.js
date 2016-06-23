import {
  BRICK_REQUEST,
  BRICK_SUCCESS,
  BRICK_FAILURE
} from '../../commons/constants'

const initialState = {
  list: [],
  isFetching: false
}

export default function bricks(state = initialState, action) {
  if (action.type === BRICK_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === BRICK_FAILURE) {
    // TODO
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === BRICK_SUCCESS) {
    return {
      ...state,
      list: action.payload.bricks,
      isFetching: false
    }
  }

  return state
}
