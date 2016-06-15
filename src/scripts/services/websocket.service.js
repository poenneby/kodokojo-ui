import { getToken } from './auth.service'
import Promise from 'bluebird'
import api from '../commons/config'

// TODO let the dev backend reroute ws calls
// TODO move this in actions

const websocketService = {
  socket: undefined,
  socketPing: undefined
}

/**
 * init socket and return it
 *
 * @returns {Promise} (websocket)
 */
websocketService.initSocket = () => new Promise((resolve, reject) => {
  if (!websocketService.socket) {
    // FIXME reroute ws call to express in dev, remove test on localhost:3000
    const uri =
      `${window.location.protocol === 'https' ? 'wss:' : 'ws:'}//` +
      `${window.location.host === 'localhost:3000' ? '192.168.99.100:9080' : 'localhost'}${api.event}`
    websocketService.startSocket(uri)
  }

  resolve(websocketService.socket)
})

/**
 * get websocket
 */
websocketService.getSocket = () => Promise.resolve(websocketService.socket)

/**
 * start socket
 *
 * @param uri
 */
websocketService.startSocket = (uri) => {
  websocketService.socket = new WebSocket(uri)

  websocketService.socket.onopen = () => {
    // authenticate user to approve socket creation
    websocketService.socket.send(JSON.stringify({
      entity: 'user',
      action: 'authentication',
      data: {
        authorization: `Basic ${getToken()}`
      }
    }))

    // TODO implement error messages handling

    // start to ping to keep socket open
    websocketService.socketPing = setInterval(() => {
      websocketService.socket.send(JSON.stringify({
        entity: 'ws',
        action: 'ping'
      }))
    }, 60000)
  }
}

/**
 * stop socket and ping
 */
// TODO add user name and pass it to back for logging purpose
websocketService.stopSocket = (userName) => new Promise((resolve, reject) => {
  if (websocketService.socket) {
    websocketService.socket.close(1000, 'user <user> living')
  }
  if (websocketService.socketPing) {
    clearInterval(websocketService.socketPing)
  }

  return resolve()
})

// export const initSocket = websocketService.initSocket

export default websocketService
