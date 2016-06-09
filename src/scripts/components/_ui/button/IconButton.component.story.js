import React from 'react'
import { storiesOf } from '@kadira/storybook'

// contexte

// component to story
import IconButton from './IconButton.component'

storiesOf('IconButton', module)
  .addDecorator((story) => (
    <div style={{ width: '300px', margin: '50px' }}>
      { story() }
    </div>
  ))
  .add('default (flat)', () => (
    <IconButton
      icon="power_settings_new"
    />
  ))
  .add('primary (flat)', () => (
    <IconButton
      icon="power_settings_new"
      primary
    />
  ))
  // .add('primary - disabled (flat)', () => (
  //   <IconButton
  //     disabled
  //     label="BUTTON"
  //     primary
  //   />
  // ))
