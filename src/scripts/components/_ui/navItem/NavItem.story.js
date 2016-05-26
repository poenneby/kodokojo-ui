import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

// contexte
import configureStore from '../../../store/configureStore'

// component to story
import NavItem from './NavItem.component'

const initialState = {}

const store = configureStore(initialState)

storiesOf('NavItem', module)
  .add('nav 1', () => (
    <div style={{ width: '200px' }} store={store}>
      <NavItem
        active
        index={ 1 }
        label="Nav Item"
        number={ 3 }
      />
    </div>
  ))
  .add('nav 2', () => (
    <div style={{ width: '200px' }} store={store}>
      <NavItem
        index={ 2 }
        label="Nav Item"
      />
    </div>
  ))
  .add('nav 3', () => (
    <div style={{ width: '200px' }} store={store}>
      <NavItem
        index={ 3 }
        label="Nav Item"
      />
    </div>
  ))
  .add('nav 4', () => (
    <div style={{ width: '200px' }} store={store}>
      <NavItem
        index={ 4 }
        label="Nav Item"
      />
    </div>
  ))
