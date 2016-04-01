import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

// UI
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import './login.less'
import { login, logout } from './loginActions'

// Login component
export const Login = class Login extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleSubmit (event) {
    const { fields: { username, psw }, login } = this.props

    if (event) {
      event.preventDefault()
      const nextLogin = username.value,
            nextPsw = psw.value
      if (!nextLogin || !nextLogin.trim() || !nextPsw || !nextPsw.trim()) {
        return
      }
      login(nextLogin.trim(), nextPsw.trim())
    }
  }

  handleLogout (event) {
    const { logout } = this.props
    if (event) {
      event.preventDefault()
    }
    logout()
  }

  render() {
    const { fields: { username, psw }, isAuthenticated } = this.props

    return (
      <div>
        { !isAuthenticated &&
          <form id="loginForm"
                name="loginForm"
                onSubmit={ this.handleSubmit }
          >
            <TextField
                { ...username }
                id="username"
                name="username"
                hintText="all of what is before @email.com"
                floatingLabelText="User name"
                type="text"
            /><br />
            <TextField
                { ...psw }
                id="psw"
                name="psw"
                floatingLabelText="Password"
                type="password"
            /><br />
            <RaisedButton
                label="Log in"
                primary={ true }
                type="submit"
                onTouchTap={ this.handleSubmit }
                className="form-submit"
            /><br/>
            <Link to="/">Not a user? Sign in!</Link>
          </form>
        }
        { isAuthenticated &&
          <div>
            You are authenticated<br/>
            <RaisedButton
              label="Log out"
              primary={ true }
              onTouchTap={ this.handleLogout }
              className="form-submit"
            />
          </div>
        }
      </div>
    )
  }

}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

// Login container
const mapStateProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    login: (username, psw) => dispatch(login(username, psw)),
    logout: () => dispatch(logout())
  }
}

const LoginContainer = reduxForm(
  {
    form: 'loginForm',
    fields: ['username', 'psw']
  },
  mapStateProps,
  mapDispatchProps
)(Login)

export default LoginContainer

