import React from 'react'
import { storiesOf } from '@kadira/storybook'

// component to story
import '../../../../styles/_commons.less'

storiesOf('Typography', module)
  .add('family & weight', () => (
    <div>
      <div style={{ margin: '30px' }}>
        Primary fonts : Catamaran
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <h1>default h1</h1>
          </div>
          <div>
            <h2>default h2</h2>
          </div>
          <div>
            <h3>default h3</h3>
          </div>
          <div>
            default
          </div>
          <div
            className="font-standard--thin">
            .font-standard--thin 100
          </div>
          <div
            className="font-standard--light">
            .font-standard--light 300
          </div>
          <div
            className="font-standard--normal">
            .font-standard--normal 400
          </div>
          <div
            className="font-standard--semi-bold">
            .font-standard--semi-bold 600
          </div>
          <div
            className="font-standard--bold">
            .font-standard--bold 700
          </div>
        </div>
      </div>
    </div>
  ))
  .add('sizes', () => (
    <div>
      <div style={{ margin: '30px' }}>
        Titles
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="title-size--1">
            .title-size--1
          </div>
          <div className="title-size--2">
            .title-size--2
          </div>
          <div className="title-size--3">
            .title-size--3
          </div>
        </div>
      </div>
      <div style={{ margin: '30px' }}>
        fonts
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="font-size--smaller">
            .font-size--smaller
          </div>
          <div className="font-size--small">
            .font-size--small
          </div>
          <div className="font-size--normal">
            .font-size--normal
          </div>
          <div className="font-size--medium">
            .font-size--medium
          </div>
          <div className="font-size--large">
            .font-size--large
          </div>
          <div className="font-size--larger">
            .font-size--larger
          </div>
        </div>
      </div>
    </div>
  ))
