import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

// component to story
import Card from './Card.component.js'
import CardContent from './CardContent.component.js'
import CardContainer from './CardContainer.component.js'

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
        primary
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
        primary
        style={{ width: '400px', height: '360px' }}
        title="First title"
      >
        <CardContent className="card-content">children</CardContent>
      </Card>
      <Card
        style={{ width: '400px', height: '360px' }}
        title="Second title"
      >
        <CardContent className="card-content">children</CardContent>
      </Card>
    </div>
  ))
  .add('two cards with card-content in card container', () => (
    <CardContainer>
      <Card
        primary
        style={{ width: '400px', height: '360px' }}
        title="First title"
      >
        <CardContent className="card-content">children</CardContent>
      </Card>
      <Card
        style={{ width: '400px', height: '360px' }}
        title="Second title"
      >
        <CardContent className="card-content">children</CardContent>
      </Card>
    </CardContainer>
  ))
