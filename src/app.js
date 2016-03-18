import 'babel-polyfill'

// React Redux stack
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// Application
import configureStore from './scripts/store/configureStore'
import App from './scripts/components/app/App'
import HomePage from './scripts/pages/HomePage'
import LoginPage from './scripts/pages/LoginPage'
import FirstProjectPage from './scripts/pages/FirstProjectPage'
import UsersPage from './scripts/pages/UsersPage'
import NotFoundPage from './scripts/pages/NotFoundPage'

import AuthService from './scripts/services/authService'

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
          <IndexRoute component={HomePage}/>
          <Route path="project" component={FirstProjectPage}/>
          <Route path="login" component={LoginPage}/>
          <Route path="users" component={UsersPage} onEnter={AuthService.checkAuthentication} />
          <Route status={404}
                 path="*"
                 component={NotFoundPage}
                 dataTypePage="testDataType"/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
)
