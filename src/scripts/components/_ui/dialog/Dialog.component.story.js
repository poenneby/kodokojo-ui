import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

// contexte

// component to story
import Dialog from './Dialog.component'
// import  Button from '../button/Button.component'

storiesOf('Dialog', module)
  .addDecorator((story) => (
    <div>
      { story() }
    </div>
  ))
  .add('default', () => (
    <Dialog
      active
    >
      <p>Some content</p>
    </Dialog>
  ))
  .add('with title and buttons', () => (
    <Dialog
      actions={[
        { label: 'Cancel', onClick: action('click Cancel button') },
        { label: 'Save', onClick: action('click Save button') }
      ]}
      active
      title="My awesome dialog"
    >
      <p>Some content</p>
    </Dialog>
  ))
