import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

// contexte
import { shimIntl } from '../../../i18n/shimIntl'

// component to story
import Content from './Content.component'

// FIXME
// shim intl is necessary for safari (v9.1.1), remove later ?
shimIntl(() =>
  storiesOf('Content component', module)
    .add('default', () => (
      <Content>
        <div>children</div>
      </Content>
    ))
)
