import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, action } from '@kadira/storybook'

// contexte
import configureStore from '../../../store/configureStore'

// component to story
import Panel from './Panel.component'

const initialState = {}

const store = configureStore(initialState)

storiesOf('Panel', module)
  .add('default', () => (
    <Provider store={store}>
      <Panel>
        <div>children</div>
      </Panel>
    </Provider>
  ))
