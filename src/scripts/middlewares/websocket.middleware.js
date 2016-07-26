import { getToken } from '../services/auth.service'
import api from '../commons/config'
import { getWebSocket } from '../services/webSocket.factory.js'
import { mapBrickEvent } from '../services/mapping.service'
import { updateProject } from '../components/project/project.actions'
import {
  successWebsocket,
  failureWebsocket
} from '../components/websocket/websocket.actions.js'
import {
  WEBSOCKET_REQUEST,
  WEBSOCKET_STOP
} from '../commons/constants'

// TODO let the dev backend reroute ws calls

export const websocket = {
  socket: undefined,
  socketPing: undefined,
  uri:
  `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//` +
  `${window.location.host === 'localhost:3000' ? '192.168.99.100:9080' : window.location.host}${api.event}`
}

const websocketMiddleware = store => next => action => {
  switch (action.type) {
    case WEBSOCKET_REQUEST:
      if (!websocket.socket) {
        websocket.socket = getWebSocket(websocket.uri)

        // register on open callback
        websocket.socket.onopen = () => {
          store.dispatch(successWebsocket())
          // authenticate user to approve socket creation
          websocket.socket.send(JSON.stringify({
            entity: 'user',
            action: 'authentication',
            data: {
              authorization: `Basic ${getToken()}`
            }
          }))

          // start to ping to keep socket open
          websocket.socketPing = setInterval(() => {
            websocket.socket.send(JSON.stringify({
              entity: 'ws',
              action: 'ping'
            }))
          }, 60000)
        }

        // register on message callback
        websocket.socket.onmessage = (socketEvent) => {
          const socketEventData = JSON.parse(socketEvent.data)

          if (socketEventData.entity === 'brick' && socketEventData.action === 'updateState') {
            const mappedEvent = mapBrickEvent(socketEventData)
            console.log('wsMapEvent', mappedEvent)
            store.dispatch(updateProject(mappedEvent))
          }
        }

        // register on error callback
        websocket.socket.onerror = (socketEvent) => {
          console.log('wsError', socketEvent)
          store.dispatch(failureWebsocket(socketEvent))
        }
      }
      return next(action)
    case WEBSOCKET_STOP:
      if (websocket.socket) {
        websocket.socket.close(1000, 'user <user> living')
      }
      if (websocket.socketPing) {
        clearInterval(websocket.socketPing)
      }
      return next(action)
    // TODO implement SEND_MESSAGE if needed

    default:
      return next(action)
  }
}

export default websocketMiddleware
