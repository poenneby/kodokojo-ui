import React from 'react'
import chai from 'chai'
import { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import {mount, render, shallow} from 'enzyme'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(chaiEnzyme())
chai.use(sinonChai)
import merge from '../../../../node_modules/lodash/merge'

import { IntlProvider } from 'react-intl'
// FIXME add this to pass test, remove if FIXME
// see https://github.com/callemall/material-ui/issues/4021
// and https://github.com/callemall/material-ui/pull/3820
import MuiThemeProvider from '../../../../node_modules/material-ui/styles/MuiThemeProvider'
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme'

import { Login } from './Login.component.js'

// TODO test error message when login
describe('<Login> component', () => {

  let props,
      messages,
      intlProvider

  beforeEach(() => {
    // TODO find another way to mock IntlProvider
    const mockFormatFct = options => options.id
    props = {
      fields: {
        username: '',
        psw: ''
      },
      handleSubmit: fct => fct,
      intl: {
        formatMessage: mockFormatFct,
        formatDate: mockFormatFct,
        formatPlural: mockFormatFct,
        formatTime: mockFormatFct,
        formatRelative: mockFormatFct,
        formatNumber: mockFormatFct,
        formatHTMLMessage: mockFormatFct,
        now: mockFormatFct
      },
      submitting: false,
      login: () => {},
      logout: () => {}
    }
    intlProvider = new IntlProvider({locale:'en'}, {})
  })

  it('should render a form if not authenticated', () => {
    // Given
    const nextProps =  merge(
      props,
      { isAuthenticated: false }
    )
    const { context } = intlProvider.getChildContext()

    // When
    const component = shallow(
      <Login {...nextProps}/>,
      context
    )

    // Then
    expect(component).to.have.descendants('form')
  })

  it('should render a div if authenticated', () => {
    // Given
    const nextProps =  merge(
      props,
      { isAuthenticated: true }
    )
    // const { context } = intlProvider.getChildContext()

    // When
    const component = shallow(
      <Login {...nextProps}/>
    )

    // Then
    expect(component).to.have.descendants('div')
    expect(component.text()).to.contains('You are authenticated')
  })

  it('should set props properly', () => {
    // Given
    const nextProps = merge(
      props,
      {
        fields: {
          username: {
            value: 'username'
          },
          psw: {
            value: 'password'
          }
        }
      }
    )

    // When
    const component = mount(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Login {...nextProps}/>
      </MuiThemeProvider>
    )

    // Then
    expect(component.find(Login).props().fields.username.value).to.equal('username')
    expect(component.find(Login).props().fields.psw.value).to.equal('password')
    expect(component.find(Login).props().login).to.be.instanceof(Function)
    expect(component.find(Login).props().logout).to.be.instanceof(Function)
  })

  describe('handle submit', () => {
    it('should trigger login if username & password inputs are not empty', () => {
      // Given
      const nextProps = merge(
        props,
        {
          fields: {
            username: {
              value: 'username'
            },
            psw: {
              value: 'password'
            }
          },
          login: sinon.stub()
        }
      )
      nextProps.login.resolves()
      const component = mount(
        <IntlProvider locale="en">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Login {...nextProps}/>
          </MuiThemeProvider>
        </IntlProvider>
      )

      // When
      component.find('form').simulate('submit', {preventDefault: () => {}})

      // Then
      expect(nextProps.login).to.have.callCount(1)
      expect(nextProps.login).to.have.been.calledWith('username', 'password')
    })

    it('should not login if username input is empty', () => {
      // Given
      const nextProps = merge(
        props,
        {
          fields: {
            username: {},
            psw : {
              value: 'password'
            }
          },
          login: sinon.spy()
        }
      )
      const component = mount(
        <IntlProvider locale="en">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Login {...nextProps}/>
          </MuiThemeProvider>
        </IntlProvider>
      )

      // When
      component.find('form').simulate('submit', { preventDefault: () => {} })

      // Then
      expect(nextProps.login).to.not.have.been.called
    })

    it('should not login if password input is empty', () => {
      // Given
      const nextProps = merge(
        props,
        {
          fields: {
            username: {
              value: 'username'
            },
            psw: {}
          },
          login: sinon.spy()
        }
      )
      const component = mount(
        <IntlProvider locale="en">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Login {...nextProps}/>
          </MuiThemeProvider>
        </IntlProvider>
      )

      // When
      component.find('form').simulate('submit', {preventDefault: () => {}})

      // Then
      expect(nextProps.login).to.not.have.been.called
    })
  })

  describe ('handle logout', () => {
    it('should logout', () => {
      // Given
      const nextProps = merge(
        props,
        {
          isAuthenticated: true,
          logout: sinon.spy()
        }
      )
      const component = mount(
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Login {...nextProps}/>
        </MuiThemeProvider>
      )

      // When
      component.find('button').simulate('click', { preventDefault: () => {} })

      // Then
      expect(nextProps.logout).to.not.have.callCount(1)
    })
  })
})
