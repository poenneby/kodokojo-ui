import React from 'react'
import { storiesOf } from '@kadira/storybook'

// component to story
import '../../../../styles/_commons.less'

storiesOf('Colors', module)
  .add('dark theme background colors', () => (
    <div>
      <div style={{ margin: '30px' }}>
        Primary background colors
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            className="general-background--1"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .general-background--1
          </div>
          <div
            className="general-background--2"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .general-background--2
          </div>
          <div
            className="general-background--3"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .general-background--3
          </div>
          <div
            className="general-background--4"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .general-background--4
          </div>
        </div>
      </div>
      <div style={{ margin: '30px' }}>
        Secondary background colors
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            className="contextual-background--1"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .contextual-background--1
          </div>
          <div
            className="contextual-background--2"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .contextual-background--2
          </div>
          <div
            className="contextual-background--3"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .contextual-background--3
          </div>
          <div
            className="contextual-background--4"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .contextual-background--4
          </div>
        </div>
      </div>
    </div>
  ))
  .add('dark theme fonts colors', () => (
    <div>
      <div style={{ margin: '30px' }}>
        Primary fonts colors
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            className="font-color--1 general-background--1">
            .font-color--1
          </div>
          <div
            className="font-color--2">
            .font-color--2
          </div>
          <div
            className="font-color--3">
            .font-color--3
          </div>
          <div
            className="font-color--4">
            .font-color--4
          </div>
          <div
            className="font-color--5">
            .font-color--5
          </div>
        </div>
      </div>
      <div style={{ margin: '30px' }}>
        Secondary fonts colors
        <div
          className="contextual-color--1">
          .contextual-color--1
        </div>
        <div
          className="contextual-color--2">
          .contextual-color--2
        </div>
        <div
          className="contextual-color--3">
          .contextual-color--3
        </div>
        <div
          className="contextual-color--4">
          .contextual-color--4
        </div>
      </div>
    </div>
  ))
