import React from 'react'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { storiesOf, linkTo } from '@kadira/storybook'

// contexte
import configureStore from '../store/configureStore'
import en from '../i18n/en'

// component to story
import App from '../components/app/App.component'
import FirstProjectPage from './FirstProject.page'

const initialState = {
  auth: {
    account: {
      id: 'userId'
    },
    isAuthenticated: true
  },
  prefs: {
    navigation: false,
    locale: 'en',
    theme: 'dark'
  },
  bricks: {
    list: [
      [
        {
          name: 'jenkins',
          type: 'CI',
          version: '1.651'
        }
      ],
      [
        {
          name: 'gitlab',
          type: 'SCM',
          version: '8.5.2-ce'
        }
      ],
      [
        {
          name: 'nexus',
          type: 'REPOSITORY',
          version: '2.13'
        }
      ]
    ]
  }
}

const location = {
  pathname: '/firstProject'
}

const store = configureStore(initialState)

storiesOf('FirstProjectPage', module)
  .add('project with 4 bricks', () => (
    <Provider store={store}>
      <IntlProvider locale="en" messages={ en }>
        <App>
          <FirstProjectPage
            location={ location }
          />
        </App>
      </IntlProvider>
    </Provider>
  ))
