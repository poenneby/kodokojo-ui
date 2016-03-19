import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { createAccount } from './signinActions'

// Signin component
export const Signin = class Signin extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.emailInput
  }

  handleSubmit(event) {
    const { createAccount } = this.props

    if (event) {
      event.preventDefault()
      if (!this.emailInput.value.trim()) {
        return
      }
      createAccount(this.emailInput.value)
      this.emailInput.value = ''
    }
  }

  render() {
    const { email } = this.props

    return (
        <form name="signin"
              onSubmit={ this.handleSubmit }
        >
          <label>email: {email}<br/>
            <input type="email"
                   placeholder="your.email@domain.ext"
                   ref={ node => {
                     this.emailInput = node
                   }}/><br/>
          </label>
          <button type="submit">Sing in</button><br/>
          <Link to="/login">Already a user? Go to login!</Link>
        </form>
    )
  }

}

Signin.propTypes = {
  email: PropTypes.string,
  createAccount: PropTypes.func.isRequired
}

// Signin container
const mapStateProps = (state) => {
  return {
    email: state.auth.account.email
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    createAccount: (email) => dispatch(createAccount(email))
  }
}

const SigninContainer = connect(
    mapStateProps,
    mapDispatchProps
)(Signin)

export default SigninContainer
