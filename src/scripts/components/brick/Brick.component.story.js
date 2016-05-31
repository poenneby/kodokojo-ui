import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

// component to story
import Brick from './Brick.component'

const brickRunning = {
  type: 'type',
  name: 'name',
  state: 'RUNNING',
  version: '2.1.2',
  url: '#entity-type-linktobrick.kodokojo.io'
}
const brickStarting = {
  type: 'type',
  name: 'name',
  state: 'STARTING',
  version: '2.1.2',
  url: ''
}
const brickFailure = {
  type: 'type',
  name: 'name',
  state: 'ONFAILURE',
  version: '2.1.2',
  url: '#entity-type-linktobrick.kodokojo.io'
}
const brickDefault = {
  type: 'type',
  name: 'name',
  state: undefined,
  version: '2.1.2',
  url: '#entity-type-linktobrick.kodokojo.io'
}

storiesOf('Brick', module)
  .add('running', () => (
    <Brick
      brick={ brickRunning }
    />
  ))
  .add('starting', () => (
    <Brick
      brick={ brickStarting }
    />
  ))
  .add('failure', () => (
    <Brick
      brick={ brickFailure }
    />
  ))
  .add('default', () => (
    <Brick
      brick={ brickDefault }
    />
  ))
