import React from 'react'
import { storiesOf } from '@kadira/storybook'

// contexte

// component to story
import Input from './Input.component'

storiesOf('Input', module)
  .addDecorator((story) => (
    <div style={{ width: '300px', margin: '50px' }}>
      { story() }
    </div>
  ))
  .add('default', () => (
    <Input
      label="input label"
    />
  ))
  .add('with icon', () => (
    <Input
      icon="email"
      label="input label"
      name="inputValue"
    />
  ))
  .add('with value', () => (
    <Input
      icon="email"
      label="input label"
      name="inputValue"
      value="something"
    />
  ))
  .add('required', () => (
    <Input
      icon="email"
      label="input label"
      name="inputValue"
      required
    />
  ))
  .add('disabled', () => (
    <Input
      disabled
      icon="email"
      label="input label"
      name="inputValue"
    />
  ))
  .add('with hint', () => (
    <Input
      hint="This is a hint"
      icon="email"
      label="input label"
      name="inputValue"
    />
  ))
  .add('with hint & value', () => (
    <Input
      hint="This is a hint"
      icon="email"
      label="input label"
      name="inputValue"
      value="some value"
    />
  ))
  .add('on error', () => (
    <Input
      error="error in this input"
      hint="This is a hint"
      icon="email"
      label="input label"
      name="inputValue"
      value="some value"
    />
  ))
