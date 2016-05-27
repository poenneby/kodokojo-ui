import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, action } from '@kadira/storybook'

// contexte
import configureStore from '../../../store/configureStore'

// component to story
import Layout from './Layout.component'
import Panel from '../panel/Panel.component'
import Nav from '../nav/Nav.component.js'

const initialState = {}

const store = configureStore(initialState)

storiesOf('Layout', module)
  .add('with Panel', () => (
    <Provider store={store}>
      <Layout>
        <Panel>
          <div>children</div>
        </Panel>
      </Layout>
    </Provider>
  ))
  .add('with Panel and Nav', () => (
    <Provider store={store}>
      <Layout>
        <Panel>
          <Nav
            pinned
          >
            <div>children</div>
          </Nav>
          <div>children</div>
        </Panel>
      </Layout>
    </Provider>
  ))
