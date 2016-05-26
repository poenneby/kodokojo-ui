import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, action } from '@kadira/storybook'

// contexte
import configureStore from '../store/configureStore'
import { IntlProvider } from 'react-intl'

// component to story
import StacksPage from './Stacks.page'
import en from '../i18n/en'

const initialState = {
  projectConfig: {
    stacks: [
      {
        bricks: [
          {
            type: 'type',
            name: 'name',
            state: 'RUNNING',
            version: '2.1.2',
            url: '#entity-type-linktobrick.kodokojo.io'
          },
          {
            type: 'type',
            name: 'name',
            state: 'STARTING',
            version: '2.1.2',
            url: ''
          },
          {
            type: 'type',
            name: 'name',
            state: 'ONFAILURE',
            version: '2.1.2',
            url: '#entity-type-linktobrick.kodokojo.io'
          },
          {
            type: 'type',
            name: 'name',
            state: undefined,
            version: '2.1.2',
            url: '#undefined-status'
          }
        ]
      }
    ]
  }
}

const store = configureStore(initialState)

storiesOf('StacksPage', module)
  .add('stack with all 4 status', () => (
    <Provider store={store}>
      <IntlProvider locale="en" messages={ en }>
        <StacksPage />
      </IntlProvider>
    </Provider>
  ))
