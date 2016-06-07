import React from 'react'
import { storiesOf } from '@kadira/storybook'

// component to story
import '../../../../styles/_commons.less'
import utilsTheme from '../../../../styles/_utils.scss'

storiesOf('Colors', module)
  .add('dark theme background colors', () => (
    <div>
      <div style={{ margin: '30px' }}>
        Primary background colors
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            className={ utilsTheme['primary-background--1'] }
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .primary-background--1
          </div>
          <div
            className={ utilsTheme['primary-background--2'] }
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .primary-background--2
          </div>
          <div
            className={ utilsTheme['primary-background--3'] }
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .primary-background--3
          </div>
          <div
            className={ utilsTheme['primary-background--4'] }
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .primary-background--4
          </div>
          <div
            className={ utilsTheme['primary-background--5'] }
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
            className={ utilsTheme['secondary-background--1'] }
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .secondary-background--1
          </div>
          <div
            className={ utilsTheme['secondary-background--2'] }
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .secondary-background--2
          </div>
          <div
            className={ utilsTheme['secondary-background--3'] }
            style={{ width: '200px', height: '200px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              marginRight: '40px', marginBottom: '40px', border: '1px dotted black' }}>
            .secondary-background--3
          </div>
          <div
            className={ utilsTheme['secondary-background--4'] }
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
            className={ `${utilsTheme['font-color--1']} ${utilsTheme['primary-background--1']}` }>
            .font-color--1
          </div>
          <div
            className={ utilsTheme['font-color--2'] }>
            .font-color--2
          </div>
          <div
            className={ utilsTheme['font-color--3'] }>
            .font-color--3
          </div>
          <div
            className={ utilsTheme['font-color--4'] }>
            .font-color--4
          </div>
          <div
            className={ utilsTheme['font-color--5'] }>
            .font-color--5
          </div>
          <div
            className={ utilsTheme['font-color--6'] }>
            .font-color--6
          </div>
        </div>
      </div>
      <div style={{ margin: '30px' }}>
        Primary colors
        <div
          className={ utilsTheme['primary-color--1'] }>
          .primary-color--1
        </div>
        <div
          className={ `${utilsTheme['primary-color--2']} ${utilsTheme['primary-background--1']}`}>
          .primary-color--2
        </div>
        <div
          className={ utilsTheme['primary-color--3'] }>
          .primary-color--3
        </div>
        <div
          className={ utilsTheme['primary-color--4'] }>
          .primary-color--4
        </div>
      </div>
      <div style={{ margin: '30px' }}>
        Secondary colors
        <div
          className={ utilsTheme['secondary-color--1'] }>
          .secondary-color--1
        </div>
        <div
          className={ utilsTheme['secondary-color--2'] }>
          .secondary-color--2
        </div>
        <div
          className={ utilsTheme['secondary-color--3'] }>
          .secondary-color--3
        </div>
        <div
          className={ utilsTheme['secondary-color--4'] }>
          .secondary-color--4
        </div>
      </div>
    </div>
  ))
