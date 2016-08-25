/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2016 Kodo Kojo (infos@kodokojo.io)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import { getToken } from '../services/auth.service'
import api from '../commons/config'
import apiConf from '../../../config/shared/api.env'
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

// TODO let the dev backend reroute ws calls through express server

export const websocketInit = () => {
  let apiUrl
  const apiProtocol = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//`

  if (apiConf.conf.getIp()) {
    apiUrl = `wss://${apiConf.conf.getIp()}`
  } else if (window.location.host === 'localhost:3000') {
    apiUrl = `${apiProtocol}192.168.99.100:9080`
  } else {
    apiUrl = `${apiProtocol}${window.location.host}`
  }

  return {
    socket: undefined,
    socketPing: undefined,
    uri: `${apiUrl}${api.event}`
  }
}

const websocketMiddleware = store => next => action => {
  const ws = websocketInit()
  switch (action.type) {
    case WEBSOCKET_REQUEST:
      if (!ws.socket) {
        ws.socket = getWebSocket(ws.uri)

        // register on open callback
        ws.socket.onopen = () => {
          store.dispatch(successWebsocket())
          // authenticate user to approve socket creation
          ws.socket.send(JSON.stringify({
            entity: 'user',
            action: 'authentication',
            data: {
              authorization: `Basic ${getToken()}`
            }
          }))

          // start to ping to keep socket open
          ws.socketPing = setInterval(() => {
            ws.socket.send(JSON.stringify({
              entity: 'ws',
              action: 'ping'
            }))
          }, 60000)
        }

        // register on message callback
        ws.socket.onmessage = (socketEvent) => {
          const socketEventData = JSON.parse(socketEvent.data)

          if (socketEventData.entity === 'brick' && socketEventData.action === 'updateState') {
            const mappedEvent = mapBrickEvent(socketEventData)
            console.log('wsMapEvent', mappedEvent) // eslint-disable-line no-console
            store.dispatch(updateProject(mappedEvent))
          }
        }

        // register on error callback
        ws.socket.onerror = (socketEvent) => {
          console.log('wsError', socketEvent) // eslint-disable-line no-console
          store.dispatch(failureWebsocket(socketEvent))
        }
      }
      return next(action)
    case WEBSOCKET_STOP:
      if (ws.socket) {
        ws.socket.close(1000, 'user <user> living')
        delete ws.socket
      }
      if (ws.socketPing) {
        clearInterval(ws.socketPing)
        delete ws.socketPing
      }
      return next(action)
    // TODO implement SEND_MESSAGE if needed

    default:
      return next(action)
  }
}

export default websocketMiddleware
