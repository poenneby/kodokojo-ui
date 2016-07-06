import Promise from 'bluebird'

import {
  WEBSOCKET_REQUEST,
  WEBSOCKET_SUCCESS,
  WEBSOCKET_FAILURE,
  WEBSOCKET_STOP
} from '../../commons/constants'

export function requestWebsocket() {
  return {
    type: WEBSOCKET_REQUEST
  }
}

export function successWebsocket() {
  return {
    type: WEBSOCKET_SUCCESS
  }
}

export function failureWebsocket(event) {
  return {
    type: WEBSOCKET_FAILURE,
    payload: event
  }
}

export function stopWebsocket() {
  return {
    type: WEBSOCKET_STOP
  }
}
