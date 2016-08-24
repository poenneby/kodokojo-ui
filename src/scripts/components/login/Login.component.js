/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2016 Kodo Kojo (infos@kodokojo.io)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

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
import { returnErrorKey } from '../../services/error.service'

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
        .catch(err => Promise.reject({ psw: returnErrorKey(
          {
            component: 'login',
            code: err.message
          })
        }))
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
                icon="account_box"
                id="username"
                label={ formatMessage({ id: 'username-label' }) }
                name="username"
                required
                type="text"
            />
            <Input
                { ...psw }
                error={ psw.touched && psw.error ? formatMessage({ id: psw.error }) : '' }
                icon="lock_open"
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
            <p>You are authenticated.</p>
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
