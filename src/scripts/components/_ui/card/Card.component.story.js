import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

// component to story
import Card from './Card.component.js'

storiesOf('Card', module)
  .add('one card', () => (
    <div style={{ margin: '40px' }}>
      <Card
        style={{ width: '400px', height: '360px' }}
        title="Some title"
      >
        <div>children</div>
      </Card>
    </div>
  ))
  .add('two cards', () => (
    <div style={{ margin: '40px', display: 'flex', flexDirection: 'row' }}>
      <Card
        className="general-background--4"
        style={{ width: '400px', height: '360px' }}
        title="First title"
      >
        <div>children</div>
      </Card>
      <Card
        style={{ width: '400px', height: '360px' }}
        title="Second title"
      >
        <div>children</div>
      </Card>
    </div>
  ))
  .add('two cards with card-content', () => (
    <div style={{ margin: '40px', display: 'flex', flexDirection: 'row' }}>
      <Card
        className="general-background--4"
        style={{ width: '400px', height: '360px' }}
        title="First title"
      >
        <div className="card-content">children</div>
      </Card>
      <Card
        style={{ width: '400px', height: '360px' }}
        title="Second title"
      >
        <div className="card-content">children</div>
      </Card>
    </div>
  ))
