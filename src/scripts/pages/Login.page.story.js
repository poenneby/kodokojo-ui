import React from 'react'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { storiesOf, linkTo } from '@kadira/storybook'

// contexte
import configureStore from '../store/configureStore'
import en from '../i18n/en'

// component to story
import App from '../components/app/App.component'
import LoginPage from './Login.page'

const initialState = {
  auth: {
    account: {},
    captcha: {
      value: '',
      reset: false
    },
    isAuthenticated: false,
    isFetching: false
  }
}

const initialStore = configureStore(initialState)

storiesOf('LoginPage', module)
  .add('default', () => (
    <Provider store={initialStore}>
      <IntlProvider locale="en" messages={ en }>
        <App>
          <LoginPage />
        </App>
      </IntlProvider>
    </Provider>
  ))