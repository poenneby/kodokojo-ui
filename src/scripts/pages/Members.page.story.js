import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, linkTo } from '@kadira/storybook'

// contexte
import configureStore from '../store/configureStore'
import { IntlProvider } from 'react-intl'
import en from '../i18n/en'

// component to story
import App from '../components/app/App.component'
import MembersPage from './Members.page'

const initialState = {
  projectConfig: {
    id: '1',
    users: [
      'user-1',
      'user-2',
      'user-4'
    ]
  },
  users: {
    'user-1': {
      firstName: 'firstname1',
      lastName: 'lastname1',
      userName: 'username1',
      email: 'username1@email.ext'
    },
    'user-2': {
      firstName: 'firstlongname2',
      lastName: 'lastname2',
      userName: 'username2',
      email: 'username2@email.ext'
    },
    'user-3': {
      firstName: 'not shown',
      lastName: 'not shown',
      userName: 'not shown',
      email: 'not shown'
    },
    'user-4': {
      firstName: 'firstname4',
      lastName: 'lastveryveyrname4',
      userName: 'username4',
      email: 'username4@email.ext'
    }
  },
  menu: [
    {
      index: 0,
      labelKey: 'projects-label',
      level: 0,
      route: '#projects',
      titleKey: 'projects-label'
    },
    {
      index: 1,
      disabled: true,
      labelText: 'Kodo Kojo',
      titleText: 'Kodo Kojo'
    },
    {
      active: false,
      index: 2,
      labelKey: 'stacks-label',
      level: 1,
      route: '/stacks',
      onClick: linkTo('StacksPage'),
      titleKey: 'stacks-label'
    },
    {
      active: true,
      index: 3,
      labelKey: 'members-label',
      level: 2,
      route: '/members',
      titleKey: 'members-label'
    }
  ]
}

const store = configureStore(initialState)

storiesOf('MembersPage', module)
  .add('with 3 users', () => (
    <Provider store={store}>
      <IntlProvider locale="en" messages={ en }>
        <App>
          <MembersPage />
        </App>
      </IntlProvider>
    </Provider>
  ))
