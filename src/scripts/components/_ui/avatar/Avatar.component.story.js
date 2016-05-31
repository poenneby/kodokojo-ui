import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

// contexte
import configureStore from '../../../store/configureStore'

// component to story
import Avatar from './Avatar.component'

const initialState = {}

const store = configureStore(initialState)

storiesOf('Avatar', module)
  .add('default', () => (
    <Avatar
      store={store}
    >
      AL
    </Avatar>
  ))
