import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { authenticate } from './loginActions'

// Login component
export const Login = class Login extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loginInput
    this.passwordInput
  }

  handleSubmit (event) {
    const { authenticate } = this.props

    if (event) {
      event.preventDefault()
      if (!this.loginInput.value.trim() || !this.passwordInput.value.trim()) {
        return
      }
      authenticate(this.loginInput.value, this.passwordInput.value)
      this.loginInput.value = ''
      this.passwordInput.value = ''
    }
  }

  render() {
    return (
        <form name="login"
              onSubmit={ this.handleSubmit }
        >
          <label>login:<br/>
            <input type="email"
                   placeholder="your.email@domain.ext"
                   ref={ node => {
                     this.loginInput = node
                   }}/><br/>
          </label>
          <label>password:<br/>
            <input type="password"
                   ref={ node => {
                     this.passwordInput = node
                   }}/><br/>
          </label>
          <button type="submit">Login</button><br/>
          <Link to="/">Not a user? Sign in!</Link>
        </form>
    )
  }

}

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
}

// Login container
const mapStateProps = () => {
  return {}
}

const mapDispatchProps = (dispatch) => {
  return {
    authenticate: (login, psw) => dispatch(authenticate(login, psw))
  }
}

const LoginContainer = connect(
    mapStateProps,
    mapDispatchProps
)(Login)

export default LoginContainer

