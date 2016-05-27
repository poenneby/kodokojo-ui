import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, action } from '@kadira/storybook'

// contexte
import configureStore from '../../../store/configureStore'

// component to story
import NavDrawer from './Nav.component.js'

const initialState = {}

const store = configureStore(initialState)

storiesOf('Nav', module)
  .add('pinned', () => (
    <Provider store={store}>
      <NavDrawer
        pinned
      >
        <div>children</div>
      </NavDrawer>
    </Provider>
  ))
