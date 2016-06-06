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
            className="primary-background--1"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .primary-background--1
          </div>
          <div
            className="primary-background--2"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .primary-background--2
          </div>
          <div
            className="primary-background--3"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .primary-background--3
          </div>
          <div
            className="primary-background--4"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .primary-background--4
          </div>
          <div
            className="primary-background--5"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .primary-background--5
          </div>
        </div>
      </div>
      <div style={{ margin: '30px' }}>
        Secondary background colors
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            className="secondary-background--1"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .secondary-background--1
          </div>
          <div
            className="secondary-background--2"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .secondary-background--2
          </div>
          <div
            className="secondary-background--3"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .secondary-background--3
          </div>
          <div
            className="secondary-background--4"
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .secondary-background--4
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
            className="font-color--1 primary-background--1">
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
          <div
            className="font-color--6">
            .font-color--6
          </div>
        </div>
      </div>
      <div style={{ margin: '30px' }}>
        Primary colors
        <div
          className="primary-color--1">
          .primary-color--1
        </div>
        <div
          className="primary-background--1 primary-color--2">
          .primary-color--2
        </div>
        <div
          className="primary-color--3">
          .primary-color--3
        </div>
        <div
          className="primary-color--4">
          .primary-color--4
        </div>
      </div>
      <div style={{ margin: '30px' }}>
        Secondary colors
        <div
          className="secondary-color--1">
          .secondary-color--1
        </div>
        <div
          className="secondary-color--2">
          .secondary-color--2
        </div>
        <div
          className="secondary-color--3">
          .secondary-color--3
        </div>
        <div
          className="secondary-color--4">
          .secondary-color--4
        </div>
      </div>
    </div>
  ))
