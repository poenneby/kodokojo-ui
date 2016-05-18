import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_RESET
} from '../../commons/constants'

const initialState = {
  isFetching: false
}

// FIXME is this reducer necessary?
export default function login(state = initialState, action) {
  if (action.type === AUTH_SUCCESS) {
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === AUTH_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === AUTH_FAILURE) {
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === AUTH_RESET) {
    return {
      ...state,
      isFetching: false
    }
  }

  return state
}
