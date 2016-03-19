import { createStore, compose, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from '../commons/reducers'

export default function configureStore(initialState) {

  let finalCreateStore = compose(
      applyMiddleware(
          thunk,
          apiMiddleware,
          createLogger()
      ),
      global.devToolsExtension ? global.devToolsExtension() : f => f
  )(createStore)

  const store = finalCreateStore(
        rootReducer
      , initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../commons/reducers', () => {
      const nextReducer = require('../commons/reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}