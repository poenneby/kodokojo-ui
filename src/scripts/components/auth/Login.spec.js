import React from 'react'
import chai from 'chai'
import { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import {mount, render, shallow} from 'enzyme'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(chaiEnzyme())
chai.use(sinonChai)
import merge from 'lodash/merge'

// import { IntlProvider } from 'react-intl'

import { Login } from './Login'

describe('<Login> component', () => {

  let props,
      messages,
      intlProvider

  beforeEach(() => {
    // TODO find another way to mock IntlProvider
    // const mockFormatFct = options => options.id
    // props = {
    //   fields: {
    //     email: ''
    //   },
    //   intl: {
    //     formatMessage: mockFormatFct,
    //     formatDate: mockFormatFct,
    //     formatPlural: mockFormatFct,
    //     formatTime: mockFormatFct,
    //     formatRelative: mockFormatFct,
    //     formatNumber: mockFormatFct,
    //     formatHTMLMessage: mockFormatFct,
    //     now: mockFormatFct
    //   },
    //   submitting: false,
    props = {
      fields: {
        username: '',
        password: ''
      },
      login: () => {},
      logout: () => {}
    }
    // messages = {
    //   'signin-email-label': 'signin-email-label',
    //   'signin-email-hint-label': 'signin-email-hint-label',
    //   'signin-button-label': 'signin-button-label',
    //   'signin-login-link-label': 'signin-login-link-label'
    // }
    // intlProvider = new IntlProvider({locale:'en'}, {})
  })

  it('should render a form if not authenticated', () => {
    // Given
    const nextProps =  merge(
      props,
      { isAuthenticated: false }
    )
    // const { context } = intlProvider.getChildContext()

    // When
    const component = shallow(
      <Login {...nextProps}/>
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

  // it.only('should render i18n ids', () => {
  //   // Given
  //   const nextProps = merge(
  //     props,
  //     {
  //       intl: {
  //         formatMessage: sinon.stub(props.intl, 'formatMessage', (options) => {
  //           return options.id
  //         })
  //       }
  //     }
  //   )
  //   const { context } = intlProvider.getChildContext()
  //
  //   // When
  //   shallow(
  //     <Signin {...nextProps}/>,
  //       { context }
  //   )
  //
  //   // Then
  //   expect(nextProps.intl.formatMessage).to.have.callCount(4)
  //   expect(nextProps.intl.formatMessage).to.have.been.calledWith({ id: 'signin-email-label' })
  //   expect(nextProps.intl.formatMessage).to.have.been.calledWith({ id: 'signin-email-hint-label' })
  //   expect(nextProps.intl.formatMessage).to.have.been.calledWith({ id: 'signin-button-label' })
  //   expect(nextProps.intl.formatMessage).to.have.been.calledWith({ id: 'signin-login-link-label' })
  // })

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
        <Login {...nextProps}/>
    )

    // Then
    expect(component.find(Login).props().fields.username.value).to.equal('username')
    expect(component.find(Login).props().fields.psw.value).to.equal('password')
    expect(component.find(Login).props().login).to.be.instanceof(Function)
    expect(component.find(Login).props().logout).to.be.instanceof(Function)
  })

  describe ('handle submit', () => {
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
          login: sinon.spy()
        }
      )
      const component = mount(
          <Login {...nextProps}/>
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
        <Login {...nextProps}/>
      )

      // When
      component.find('form').simulate('submit', {
        preventDefault: () => {
        }
      })

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
          <Login {...nextProps}/>
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
        <Login {...nextProps}/>
      )

      // When
      component.find('button').simulate('click', { preventDefault: () => {} })

      // Then
      expect(nextProps.logout).to.not.have.callCount(1)
    })
  })
})
