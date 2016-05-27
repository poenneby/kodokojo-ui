import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, action } from '@kadira/storybook'

// contexte
import configureStore from '../../../store/configureStore'

// component to story
import Content from './Content.component'

const initialState = {}

const store = configureStore(initialState)

storiesOf('Content', module)
  .add('default', () => (
    <Content>
      <div>children</div>
    </Content>
  ))
