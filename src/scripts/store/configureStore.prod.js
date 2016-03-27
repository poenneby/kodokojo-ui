import { createStore, compose, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'

import persistenceStore from './persistenceStore'
import rootReducer from '../commons/reducers'

export default function configureStore(initialState) {

  let finalCreateStore = compose(
    applyMiddleware(
      thunk,
      apiMiddleware
    ),
    persistenceStore
  )(createStore)

  const store = finalCreateStore(
      rootReducer
      , initialState)

  return store
}