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
import { reduxForm } from 'redux-form'
import { combineValidators } from 'revalidate'
import { intlShape, injectIntl } from 'react-intl'

// Component
import '../../../styles/_commons.less'
import Input from '../../components/_ui/input/Input.component'
import Button from '../../components/_ui/button/Button.component'
import Captcha from '../../components/captcha/Captcha.component'
import { createAccount } from './signup.actions.js'
import { updateCaptcha, resetCaptcha } from '../auth/auth.actions'
import { emailValidator } from '../../services/validator.service'
import { returnErrorKey } from '../../services/error.service'
import { getRecaptchaSitekey } from '../../services/param.service'

// validate function
const validate = combineValidators({
  email: emailValidator('email')
})

// Signup component
export class Signup extends Component {

  static propTypes = {
    account: PropTypes.object,
    captcha: PropTypes.string,
    createAccount: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    locale: PropTypes.string,
    resetCaptcha: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    updateCaptcha: PropTypes.func.isRequired
  }

  handleSubmit = () => {
    const { fields: { email }, captcha, createAccount, resetCaptcha } = this.props // eslint-disable-line no-shadow

    const nextEmail = email.value
    const error = validate({ email: nextEmail })
    if (error.email) {
      return Promise.reject({ email: error.email })
    }
    if (nextEmail && nextEmail.trim() && captcha) {
      return createAccount(nextEmail.trim(), captcha)
        .then(Promise.resolve())
        .catch(err => {
          resetCaptcha()
          return Promise.reject({ email: returnErrorKey(
            {
              component: 'account',
              code: err.message
            })
          })
        })
    }
    // TODO add default error message
    return Promise.reject()
  }

  render() {
    const { fields: { email, entity }, updateCaptcha, resetCaptcha, handleSubmit, submitting, locale } = this.props // eslint-disable-line no-shadow
    const { formatMessage } = this.props.intl

    return (
      <form id="signupForm"
            name="signupForm"
            noValidate
            onSubmit={ handleSubmit(this.handleSubmit) }
      >
        <Input
            { ...email }
            error={
              email.touched && email.error ?
              formatMessage({ id: email.error }, { fieldName: formatMessage({ id: 'email-input-label' }) }) :
              ''
            }
            hint={ formatMessage({ id: 'email-hint-label' }) }
            icon="email"
            label={ formatMessage({ id: 'email-label' }) }
            name="email"
            required
            type="email"
        />
        { /* <Input
          { ...entity }
          hint={ formatMessage({ id: 'company-hint-label' }) }
          icon="domain"
          label={ formatMessage({ id: 'company-label' }) }
          name="entity"
          type="text"
        /> */}
        {/* TODO add a loader when recaptcha is not loaded, disable it on load callback */}
        {/* TODO add message when user submit without resolving captcha challenge */}
        <Captcha
          locale={ locale }
          onExpiredCallback={ () => { console.log('captcha has expired') } }
          onLoadCallback={ () => console.log('captcha has loaded') }
          onVerifyCallback={ updateCaptcha }
          sitekey={ getRecaptchaSitekey() }
          theme="dark"
        />
        <Button
            disabled={ submitting }
            label={ formatMessage({ id: 'signup-label' }) }
            onTouchTap={ handleSubmit(this.handleSubmit) }
            primary
            title={ formatMessage({ id: 'signup-label' }) }
            type="submit"
        /><br/>
      </form>
    )
  }
}

// Signup container
const mapStateProps = (state) => (
  {
    account: state.auth.account,
    captcha: state.auth.captcha,
    locale: state.prefs.locale
  }
)

const SignupContainer = compose(
  reduxForm(
    {
      form: 'signupForm',
      fields: ['email', 'entity'],
      touchOnChange: true,
      validate
    },
    mapStateProps,
    {
      createAccount,
      updateCaptcha,
      resetCaptcha
    }
  ),
  injectIntl
)(Signup)

export default SignupContainer
