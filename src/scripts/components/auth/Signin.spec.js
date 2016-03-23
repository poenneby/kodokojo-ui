import React from 'react'
import chai from 'chai'
import { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import {mount, render, shallow} from 'enzyme'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(chaiEnzyme())
chai.use(sinonChai)

import ConnectedSignin, { Signin } from './Signin'

describe('<Signin> component', () => {
  it('should render a form', () => {
    // Given
    const props = {
      createAccount: () => {}
    }

    // When
    const component = shallow(<Signin {...props}/>)

    // Then
    expect(component).to.have.descendants('form')
  })

  it('should set props properly', () => {
    // Given
    const props = {
      email: 'email@test.com',
      createAccount: () => {}
    }

    // When
    const component = mount(<Signin {...props}/>)

    // Then
    expect(component.props().email).to.equal('email@test.com')
    expect(component.props().createAccount).to.be.instanceof(Function)
  })

  it('should render properly', () => {
    // Given
    const props = {
      email: 'email@test.com',
      createAccount: () => {}
    }

    // When
    const component = render(<Signin {...props}/>)

    // Then
    expect(component.find('label').text()).to.equal('email: email@test.com')
  })

  describe ('handle submit', () => {
    it('should trigger creatAccount if email input is not empty', () => {
      // Given
      const props = {
        createAccount: sinon.spy()
      }
      const component = mount(<Signin {...props}/>)
      component.instance().emailInput.value = 'email@test.com'

      // When
      component.find('form').simulate('submit', {preventDefault: () => {}})

      // Then
      expect(props.createAccount).to.have.callCount(1)
      expect(props.createAccount).to.have.been.calledWith('email@test.com')
    })

    it('should not creatAccount if email input is empty', () => {
      // Given
      const props = {
        createAccount: sinon.spy()
      }
      const component = mount(<Signin {...props}/>)
      component.instance().emailInput.value = null

      // When
      component.find('form').simulate('submit', {preventDefault: () => {}})

      // Then
      expect(props.createAccount).to.not.have.been.called
    })
  })
})
