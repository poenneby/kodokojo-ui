import 'babel-polyfill'

// React Redux stack
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// UI stack
import 'normalize-css'
import injectTapEventPlugin from 'react-tap-event-plugin'

// i18n
import IntlProviderContainer from './scripts/commons/IntlProviderContainer'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'

addLocaleData(en)
addLocaleData(fr)

// Application
import configureStore from './scripts/store/configureStore'
import initialState from './scripts/commons/init'
import App from './scripts/components/app/App'
import HomePage from './scripts/pages/HomePage'
import LoginPage from './scripts/pages/LoginPage'
import FirstProjectPage from './scripts/pages/FirstProjectPage'
import ProjectConfigDetailPage from './scripts/pages/ProjectConfigDetailPage'
import ProjectDetailPage from './scripts/pages/ProjectDetailPage'
import UsersPage from './scripts/pages/UsersPage'
import NotFoundPage from './scripts/pages/NotFoundPage'

import AuthService from './scripts/services/authService'

// Add the reducer to your store on the `routing` key
const store = configureStore(initialState)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)


//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

ReactDOM.render(
    <IntlProviderContainer store={store}>
      <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>
          <Route
            component={App}
            path="/"
          >
            <IndexRoute
              component={HomePage}
            />
            <Route
              component={LoginPage}
              path="login"
            />
            <Route
              component={FirstProjectPage}
              path="firstProject"
            />
            <Route
              component={ProjectConfigDetailPage}
              onEnter={AuthService.checkAuth}
              path="projectConfig"
            />
            <Route
              component={ProjectDetailPage}
              path="project/:projectConfigId"
            />
            <Route
              component={UsersPage}
              onEnter={AuthService.checkAuth}
              path="users"
            />
            <Route
              component={NotFoundPage}
              dataTypePage="testDataType"
              path="*"
              status={404}
            />
          </Route>
        </Router>
      </Provider>
    </IntlProviderContainer>,
    document.getElementById('app')
)
