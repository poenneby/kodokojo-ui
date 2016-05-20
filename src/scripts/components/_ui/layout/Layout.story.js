import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, action } from '@kadira/storybook'

// contexte
import configureStore from '../../../store/configureStore'

// component to story
import Layout from './Layout.component'
import Panel from '../panel/Panel.component'
import NavDrawer from '../navDrawer/NavDrawer.component'

const initialState = {}

const store = configureStore(initialState)

storiesOf('Layout', module)
  .add('default', () => (
    <Provider store={store}>
      <Layout>
        children
      </Layout>
    </Provider>
  ))
  .add('with Panel', () => (
    <Provider store={store}>
      <Layout>
        <Panel>children</Panel>
      </Layout>
    </Provider>
  ))
  .add('with Panel and NavDrawer', () => (
    <Provider store={store}>
      <Layout>
        <NavDrawer
          pinned
        >
          <div>children</div>
        </NavDrawer>
        <Panel>
          <div>children</div>
        </Panel>
      </Layout>
    </Provider>
  ))
