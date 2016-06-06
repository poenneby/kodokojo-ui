import React from 'react'
import { storiesOf } from '@kadira/storybook'

// contexte

// component to story
import Button from './Button.component'

storiesOf('Button', module)
  .addDecorator((story) => (
    <div style={{ width: '300px', margin: '50px' }}>
      { story() }
    </div>
  ))
  .add('default (flat)', () => (
    <Button
      label="BUTTON"
    />
  ))
  .add('primary (flat)', () => (
    <Button
      label="BUTTON"
      primary
    />
  ))
  .add('primary - disabled (flat)', () => (
    <Button
      disabled
      label="BUTTON"
      primary
    />
  ))
