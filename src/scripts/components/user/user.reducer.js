import merge from 'lodash/merge'
import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE
} from '../../commons/constants'

const initialState = {
  isFetching: false
}

export default function users(state = initialState, action) {
  if (action.type === USER_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === USER_SUCCESS) {
    return merge(
      {},
      state,
      {
        [action.payload.user.id]: action.payload.user,
        isFetching: false
      }
    )
  }

  if (action.type === USER_FAILURE) {
    return {
      ...state,
      isFetching: false
    }
  }

  return state
}