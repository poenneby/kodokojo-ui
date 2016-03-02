import 'babel-polyfill'

// React Redux stack
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// Application
import configureStore from './scripts/store/configureStore'
import Home from './scripts/components/Home'
import App from './scripts/components/App'
import Users from './scripts/components/Users'

// Application styles
import './styles/kodokojo.css'

// Add the reducer to your store on the `routing` key
const store = configureStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)


ReactDOM.render(
    <Provider store={store}>
      { /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="users" component={Users}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
)
