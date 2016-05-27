import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, action } from '@kadira/storybook'
import { IntlProvider } from 'react-intl'

// contexte
import configureStore from '../../store/configureStore'

// component to story
import App from './App.component'

const initialStateNoNav = {
  auth: {
    isAuthenticated: false
  },
  prefs: {
    navigation: false,
    locale: 'en',
    theme: 'dark'
  }
}

const initialStateNav = {
  auth: {
    isAuthenticated: false
  },
  prefs: {
    navigation: true,
    locale: 'en',
    theme: 'dark'
  }
}

const storeWithNav = configureStore(initialStateNav)
const storeWithoutNav = configureStore(initialStateNoNav)

storiesOf('App', module)
  .add('without nav', () => (
    <Provider store={storeWithoutNav}>
      <IntlProvider locale="en">
        <App>
          <div>children</div>
        </App>
      </IntlProvider>
    </Provider>
  ))
  .add('with nav', () => (
    <Provider store={storeWithNav}>
      <IntlProvider locale="en">
        <App>
          <div>children</div>
        </App>
      </IntlProvider>
    </Provider>
  ))
