import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, action } from '@kadira/storybook'

// contexte
import configureStore from '../../store/configureStore'

// component to story
import User from './User.component'

const initialState = {
  users: {
    1: {
      firstName: 'firstname',
      lastName: 'lastname',
      userName: 'username',
      email: 'username@email.ext'
    }
  }
}

const store = configureStore(initialState)

storiesOf('User', module)
  .add('default', () => (
    <User
      store={store}
      userId={ '1' }
    />
  ))
