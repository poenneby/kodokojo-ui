/**
 * factory for native WebSocket (to be able to mock it)
 *
 */
export const webSocketFactory = {}

webSocketFactory.getWebSocket = (url) => new WebSocket(url)

export const getWebSocket = webSocketFactory.getWebSocket

export default webSocketFactory
