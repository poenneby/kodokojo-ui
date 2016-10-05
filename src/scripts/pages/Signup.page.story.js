import React from 'react'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { storiesOf, linkTo } from '@kadira/storybook'

// contexte
import configureStore from '../store/configureStore'
import en from '../i18n/en'

// component to story
import App from '../components/app/App.component'
import SignupPage from './Signup.page'

const initialState = {
  auth: {
    account: {},
    captcha: {
      value: '',
      reset: false
    },
    isAuthenticated: false,
    isFetching: false
  },
  menu: {}
}

const location = {
  pathname: '/members'
}

const initialStore = configureStore(initialState)

storiesOf('SignupPage', module)
  .add('default', () => (
    <Provider store={initialStore}>
      <IntlProvider locale="en" messages={ en }>
        <App>
          <SignupPage
            location={ location }
          />
        </App>
      </IntlProvider>
    </Provider>
  ))