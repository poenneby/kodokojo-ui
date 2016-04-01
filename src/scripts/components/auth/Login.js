import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

// UI
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import './login.less'

// Login component
export const Login = class Login extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    const { fields: { login, psw }, authenticate } = this.props

    if (event) {
      event.preventDefault()
      const nextLogin = login.value,
            nextPsw = psw.value
      if (!nextLogin.trim() || !nextPsw.trim()) {
        return
      }
      authenticate(nextLogin.trim(), nextPsw.trim())
    }
  }

  render() {
    const { fields: { login, psw } } = this.props

    return (
        <form name="login"
              onSubmit={ this.handleSubmit }
        >
          <TextField
              { ...login }
              hintText="your.email@domain.ext"
              floatingLabelText="Email"
              type="email"
          /><br />
          <TextField
              { ...psw }
              floatingLabelText="Password"
              type="password"
              ref={ node => {
                this.passwordInput = node
              }}
          /><br />
          <RaisedButton
              label="Login"
              primary={ true }
              style={ style.button }
              onTouchTap={ this.handleSubmit }
          /><br/>
          <Link to="/">Not a user? Sign in!</Link>
        </form>
    )
  }

}

Login.propTypes = {
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired
}

// Login container
const mapStateProps = (state) => {
  return { }
}

const mapDispatchProps = (dispatch) => {
  return {
    authenticate: (login, psw) => dispatch(authenticate(login, psw))
  }
}

const LoginContainer = reduxForm(
  {
    form: 'loginForm',
    fields: ['login', 'psw']
  },
  mapStateProps,
  mapDispatchProps
)(Login)

export default LoginContainer

