import {
  ACCOUNT_NEW_ID_REQUEST,
  ACCOUNT_NEW_ID_SUCCESS,
  ACCOUNT_NEW_ID_FAILURE,
  ACCOUNT_NEW_REQUEST,
  ACCOUNT_NEW_SUCCESS,
  ACCOUNT_NEW_FAILURE
} from '../../commons/constants'

const initialState = {
  isFetching: false
}

// FIXME is this reducer necessary?
export default function signup(state = initialState, action) {
  if (action.type === ACCOUNT_NEW_ID_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === ACCOUNT_NEW_ID_SUCCESS) {
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === ACCOUNT_NEW_ID_FAILURE) {
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === ACCOUNT_NEW_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === ACCOUNT_NEW_SUCCESS) {
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === ACCOUNT_NEW_FAILURE) {
    return {
      ...state,
      isFetching: false
    }
  }

  return state
}
