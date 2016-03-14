import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk'

import reducers from '../commons/reducers'

export default function configureStore(initialState) {

  let finalCreateStore = compose(
      applyMiddleware(thunk),
      global.devToolsExtension ? global.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(
      combineReducers({
        ...reducers,
        routing: routerReducer
      }), initialState);

  //if (module.hot) {
  //  // FIXME doesn't work
  //  // Enable Webpack hot module replacement for reducers
  //  module.hot.accept('../reducers', () => {
  //    const nextReducer = require('../reducers');
  //    store.replaceReducer(nextReducer);
  //  });
  //}

  return store;
}