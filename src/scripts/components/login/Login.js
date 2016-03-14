import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { sendEmail } from './loginActions'

// Login component
export const Login = class Login extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.emailInput
  }

  handleSubmit(event) {
    const { sendEmail } = this.props

    if (event) {
      event.preventDefault()
      if (!this.emailInput.value.trim()) {
        return
      }
      sendEmail(this.emailInput.value)
      this.emailInput.value = ''
    }
  }

  render() {
    const { email } = this.props

    return (
        <form name="login"
              onSubmit={ this.handleSubmit }
        >
          <label>email: {email}<br/>
            <input type="email"
                   placeholder="enter your email"
                   ref={ node => {
                    this.emailInput = node
                   }}/><br/>
            <button type="submit">Start using Kodo Kojo!!</button>
          </label>
        </form>
    )
  }

}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  sendEmail: PropTypes.func.isRequired
}

// Login container
const mapStateProps = (state) => {
  return {
    email: state.login.email
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    sendEmail: (email) => dispatch(sendEmail(email))
  }
}

const LoginContainer = connect(
    mapStateProps,
    mapDispatchProps
)(Login)

export default LoginContainer
