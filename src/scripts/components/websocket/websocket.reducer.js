import {
  WEBSOCKET_REQUEST,
  WEBSOCKET_SUCCESS,
  WEBSOCKET_FAILURE,
  WEBSOCKET_STOP
} from '../../commons/constants'

const initialState = {
  connected: false,
  isFetching: false
}

export default function socket(state = initialState, action) {
  switch (action.type) {
    case WEBSOCKET_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case WEBSOCKET_SUCCESS:
      return {
        ...state,
        connected: true,
        isFetching: false
      }
    case WEBSOCKET_FAILURE:
    case WEBSOCKET_STOP:
      return {
        ...state,
        connected: false,
        isFetching: false
      }
    default:
      return state
  }
}
