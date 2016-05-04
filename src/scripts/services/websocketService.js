import { getToken } from './authService'

const websocketService = {
  socket: undefined,
  socketPing: undefined
}

/**
 * init socket and return it
 *
 * @param url
 * @returns {Promise} (websocket)
 */
websocketService.initSocket = (url) => {

  return new Promise((resolve, reject) => {
    if (!websocketService.socket) {
      websocketService._startSocket(url)
    }

    resolve(websocketService.socket)
  })
}

/**
 * start socket
 *
 * @param url
 * @private
 */
websocketService._startSocket = (url) => {
  websocketService.socket = new WebSocket(url)

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
websocketService.stopSocket = (userName) => {
  if (websocketService.socket) {
    websocketService.socket.close(1000, 'user <user> living')
  }
  if (websocketService.socketPing) {
    clearInterval(websocketService.socketPing)
  }
}

// export const initSocket = websocketService.initSocket

export default websocketService