import { createStore, compose, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'

import persistenceStore from './persistenceStore'
import websocketMiddleware from '../middlewares/websocket.middleware'
import rootReducer from '../commons/reducers'

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(
      thunk,
      apiMiddleware,
      websocketMiddleware
    ),
    persistenceStore
  )(createStore)

  return finalCreateStore(
      rootReducer
      , initialState)
}
