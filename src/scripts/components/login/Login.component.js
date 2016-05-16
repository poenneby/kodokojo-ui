import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import { intlShape, injectIntl } from 'react-intl'

// UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

// Component
import { returnErrorKey } from '../../services/errorService'
import './login.less'
import { login, logout } from './login.actions.js'

// TODO implement i18n
// TODO if user already logged in, fetch user id from storage and fetch user from api to store
// Login component
export class Login extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
  }

  handleSubmit = () => {
    const { fields: { username, psw }, login } = this.props

    // TODO add redux form validation
    const nexUserName = username.value
    const nexPassword = psw.value
    if (nexUserName && nexUserName.trim() && nexPassword && nexPassword.trim()) {
      return login(nexUserName.trim(), nexPassword.trim()
      ).then(() => {
        return Promise.resolve()
      }).catch(error => {
        return Promise.reject({ psw: returnErrorKey('login', 'authenticate', error.message) })
      })
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
    const { fields: { username, psw }, handleSubmit, submitting, isAuthenticated } = this.props
    const { formatMessage }  = this.props.intl

    return (
      <div>
        { !isAuthenticated &&
          <form id="loginForm"
                name="loginForm"
                onSubmit={ handleSubmit(this.handleSubmit) }
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
                errorText={ psw.touched && psw.error ? formatMessage({ id: psw.error }) : '' }
                floatingLabelText="Password"
                id="psw"
                name="psw"
                type="password"
            /><br />
            <RaisedButton
                className="form-submit"
                disabled={ submitting }
                label="Log in"
                onTouchTap={ handleSubmit(this.handleSubmit) }
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

const LoginContainer = compose(
  reduxForm(
    {
      form: 'loginForm',
      fields: ['username', 'psw']
    },
    mapStateProps,
    {
      login,
      logout
    }
  ),
  injectIntl
)(Login)

export default LoginContainer

