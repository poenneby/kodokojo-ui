import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

// UI
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import './login.less'
import { login, logout } from './loginActions'

// TODO implement i18n
// Login component
export class Login extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
  }

  handleSubmit = (event) => {
    const { fields: { username, psw }, login } = this.props

    // TODO add redux form validation
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

  handleLogout = (event) => {
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
                floatingLabelText="User name"
                hintText="all of what is before @email.com"
                id="username"
                name="username"
                type="text"
            /><br />
            <TextField
                { ...psw }
                floatingLabelText="Password"
                id="psw"
                name="psw"
                type="password"
            /><br />
            <RaisedButton
                className="form-submit"
                label="Log in"
                onTouchTap={ this.handleSubmit }
                primary
                type="submit"
            /><br/>
            <Link to="/">Not a user? Sign in!</Link>
          </form>
        }
        { isAuthenticated &&
          <div>
            You are authenticated<br/>
            <RaisedButton
              className="form-submit"
              label="Log out"
              onTouchTap={ this.handleLogout }
              primary
            />
          </div>
        }
      </div>
    )
  }

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

