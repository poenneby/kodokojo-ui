import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import { intlShape, injectIntl } from 'react-intl'

// Component
import '../../../styles/_commons.less'
import Input from '../../components/_ui/input/Input.component'
import Button from '../../components/_ui/button/Button.component'
import { login, logout } from './login.actions.js'
import { returnErrorKey } from '../../services/errorService'

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

  handleSubmit = () => {
    const { fields: { username, psw }, login } = this.props // eslint-disable-line no-shadow

    // TODO add redux form validation
    const nexUserName = username.value
    const nexPassword = psw.value
    if (nexUserName && nexUserName.trim() && nexPassword && nexPassword.trim()) {
      return login(nexUserName.trim(), nexPassword.trim())
        .then(Promise.resolve())
        .catch(err => Promise.reject({ psw: returnErrorKey('login', 'authenticate', err.message) }))
    }
    // TODO add default error message
    return Promise.reject()
  }

  handleLogout = (event) => {
    const { logout } = this.props // eslint-disable-line no-shadow
    if (event) {
      event.preventDefault()
    }
    logout()
  }

  render() {
    const { fields: { username, psw }, handleSubmit, submitting, isAuthenticated } = this.props // eslint-disable-line no-shadow
    const { formatMessage } = this.props.intl

    return (
      <div>
        { !isAuthenticated &&
          <form id="loginForm"
                name="loginForm"
                onSubmit={ handleSubmit(this.handleSubmit) }
          >
            <Input
                { ...username }
                hint={ formatMessage({ id: 'username-hint-label' }) }
                id="username"
                label={ formatMessage({ id: 'username-label' }) }
                name="username"
                required
                type="text"
            />
            <Input
                { ...psw }
                error={ psw.touched && psw.error ? formatMessage({ id: psw.error }) : '' }
                id="psw"
                label={ formatMessage({ id: 'password-label' }) }
                name="psw"
                required
                type="password"
            />
            <Button
                disabled={ submitting }
                label={ formatMessage({ id: 'login-label' }) }
                onTouchTap={ handleSubmit(this.handleSubmit) }
                primary
                title={ formatMessage({ id: 'login-label' }) }
                type="submit"
            />
          </form>
        }
        { isAuthenticated &&
          <div>
            You are authenticated<br/>
            <Button
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
const mapStateProps = (state) => (
  {
    isAuthenticated: state.auth.isAuthenticated
  }
)

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
