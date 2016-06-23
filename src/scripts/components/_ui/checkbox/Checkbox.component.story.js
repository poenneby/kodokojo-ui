import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'

// contexte
import gitlab from '../../../../images/brick-gitlab.svg'

// component to story
import Checkbox from './Checkbox.component'

storiesOf('Checkbox', module)
  .addDecorator((story) => (
    <div style={{ width: '300px', margin: '50px' }}>
      { story() }
    </div>
  ))
  .add('unchecked', () => (
    <Checkbox
      checked={ false }
      label="Unchecked option"
      onChange={ action('click on checkbox') }
    />
  ))
  .add('checked', () => (
    <Checkbox
      checked
      label="Checked option"
      onChange={ action('click on checkbox') }
    />
  ))
  .add('disabled checked', () => (
    <Checkbox
      checked
      disabled
      label="disabled checked option"
      onChange={ action('click on checkbox') }
    />
  ))
  .add('disabled unchecked', () => (
    <Checkbox
      checked={ false }
      disabled
      label="disabled unchecked option"
      onChange={ action('click on checkbox') }
    />
  ))
  .add('unchecked with picto', () => (
    <Checkbox
      checked={ false }
      label={
        <span style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
          <img src={ gitlab } style={{ width: '70px', height: '70px' }} />
            { 'some text' }
        </span>
      }
      onChange={ action('click on checkbox') }
    />
  ))
  .add('checked with picto', () => (
    <Checkbox
      checked
      label={
        <span style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
          <img src={ gitlab } style={{ width: '70px', height: '70px' }} />
            { 'some text' }
        </span>
      }
      onChange={ action('click on checkbox') }
    />
  ))
