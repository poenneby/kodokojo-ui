import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, action } from '@kadira/storybook'
import { IntlProvider } from 'react-intl'
import merge from 'lodash/merge'

// contexte
import configureStore from '../../store/configureStore'
import en from '../../i18n/en'

// component to story
import App from './App.component'

const initialState = {
  auth: {
    isAuthenticated: false
  },
  prefs: {
    navigation: false,
    locale: 'en',
    theme: 'dark'
  },
  menu: [
    {
      index: 0,
      labelKey: 'projects-label',
      level: 0,
      route: '#projects',
      titleKey: 'projects-label'
    }
  ]
}

const initialStateNoNav = initialState
const initialStateNav = merge(
  {},
  initialState,
  {
    prefs: {
      navigation: true
    }
  }
)

const storeWithNav = configureStore(initialStateNav)
const storeWithoutNav = configureStore(initialStateNoNav)

storiesOf('App', module)
  .add('without menu', () => (
    <Provider store={storeWithoutNav}>
      <IntlProvider locale="en" messages={ en }>
        <App
          location={ { pathname: '/' } }
        >
          <div>children</div>
        </App>
      </IntlProvider>
    </Provider>
  ))
  .add('with menu', () => (
    <Provider store={storeWithNav}>
      <IntlProvider locale="en" messages={ en }>
        <App>
          <div>children</div>
        </App>
      </IntlProvider>
    </Provider>
  ))
