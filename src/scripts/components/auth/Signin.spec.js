import React from 'react'
import chai from 'chai'
import { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import {mount, render, shallow} from 'enzyme'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import 'sinon-as-promised'
chai.use(chaiEnzyme())
chai.use(sinonChai)
import merge from 'lodash/merge'

import { IntlProvider } from 'react-intl'

import { Signin } from './Signin'

describe('<Signin> component', () => {

  let props,
      messages,
      intlProvider

  beforeEach(() => {
    // TODO find another way to mock IntlProvider
    const mockFormatFct = options => options.id
    props = {
      fields: {
        email: ''
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
      createAccount: () => {}
    }
    messages = {
      'signin-email-label': 'signin-email-label',
      'signin-email-hint-label': 'signin-email-hint-label',
      'signin-button-label': 'signin-button-label',
      'signin-login-link-label': 'signin-login-link-label'
    }
    intlProvider = new IntlProvider({locale:'en'}, {})
  })

  it('should render a form', () => {
    // Given
    const nextProps =  merge(props)
    const { context } = intlProvider.getChildContext()

    // When
    const component = shallow(
      <Signin {...nextProps}/>,
      { context }
    )

    // Then
    expect(component).to.have.descendants('form')
  })

  it('should render i18n ids', () => {
    // Given
    const nextProps = merge(
      props,
      {
        intl: {
          formatMessage: sinon.stub(props.intl, 'formatMessage', (options) => {
            return options.id
          })
        }
      }
    )
    const { context } = intlProvider.getChildContext()

    // When
    shallow(
      <Signin {...nextProps}/>,
        { context }
    )

    // Then
    expect(nextProps.intl.formatMessage).to.have.callCount(4)
    expect(nextProps.intl.formatMessage).to.have.been.calledWith({ id: 'signin-email-label' })
    expect(nextProps.intl.formatMessage).to.have.been.calledWith({ id: 'signin-email-hint-label' })
    expect(nextProps.intl.formatMessage).to.have.been.calledWith({ id: 'signin-button-label' })
    expect(nextProps.intl.formatMessage).to.have.been.calledWith({ id: 'signin-login-link-label' })
  })

  it('should set props properly', () => {
    // Given
    const nextProps = merge(
      props,
      {
        fields: {
          email: {
            value: 'email@test.com'
          }
        }
      }
    )

    // When
    // TODO find another way to mock IntlProvider
    const component = mount(
      <IntlProvider locale="en" messages={messages}>
        <Signin {...nextProps}/>
      </IntlProvider>
    )

    // Then
    expect(component.find(Signin).props().fields.email.value).to.equal('email@test.com')
    expect(component.find(Signin).props().createAccount).to.be.instanceof(Function)
  })

  describe ('handle submit', () => {
    it('should trigger creatAccount if email input is not empty', () => {
      // Given
      const nextProps = merge(
        props,
        {
          fields: {
            email: {
              value: 'email@test.com'
            }
          },
          createAccount: sinon.stub()
        }
      )
      nextProps.createAccount.resolves()
      const component = mount(
        <IntlProvider locale="en" messages={messages}>
          <Signin {...nextProps}/>
        </IntlProvider>
      )

      // When
      component.find('form').simulate('submit', {preventDefault: () => {}})

      // Then
      expect(nextProps.createAccount).to.have.callCount(1)
      expect(nextProps.createAccount).to.have.been.calledWith('email@test.com')
    })

    it('should not creatAccount if email input is empty', () => {
      // Given
      const nextProps = merge(
        props,
        {
          createAccount: sinon.spy()
        }
      )
      const component = mount(
        <IntlProvider locale="en" messages={messages}>
          <Signin {...nextProps}/>
        </IntlProvider>
      )

      // When
      component.find('form').simulate('submit', { preventDefault: () => {} })

      // Then
      expect(nextProps.createAccount).to.not.have.been.called
    })
  })
})
