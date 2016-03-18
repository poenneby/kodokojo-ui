import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'

import rootReducer from '../commons/reducers'

export default function configureStore(initialState) {

  let finalCreateStore = compose(
      applyMiddleware(
          thunk,
          apiMiddleware,
      )
  )(createStore)

  const store = finalCreateStore(
      rootReducer
      , initialState)

  return store
}