import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, action } from '@kadira/storybook'
import { IntlProvider } from 'react-intl'

// contexte
import configureStore from '../../store/configureStore'

// component to story
import App from './App.component'

const initialState = {
  auth: {
    isAuthenticated: false
  }
}

const store = configureStore(initialState)

storiesOf('App', module)
  .add('with nav', () => (
    <Provider store={store}>
      <IntlProvider locale="en">
        <App>
          <div>children</div>
        </App>
      </IntlProvider>
    </Provider>
  ))
  .add('without nav', () => (
    <Provider store={store}>
      <IntlProvider locale="en">
        <App
          isNavVisible={ true }
        >
          <div>children</div>
        </App>
      </IntlProvider>
    </Provider>
  ))
