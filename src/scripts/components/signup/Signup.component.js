import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { combineValidators } from 'revalidate'
import { intlShape, injectIntl } from 'react-intl'

// Component
import '../../../styles/_commons.less'
import Input from '../../components/_ui/input/Input.component'
import Button from '../../components/_ui/button/Button.component'
import { createAccount } from './signup.actions.js'
import { emailValidator } from '../../services/validator.service'
import { returnErrorKey } from '../../services/error.service'

// validate function
const validate = combineValidators({
  email: emailValidator('email')
})

// Signup component
export class Signup extends Component {

  static propTypes = {
    account: PropTypes.object,
    createAccount: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  handleSubmit = () => {
    const { fields: { email }, createAccount } = this.props // eslint-disable-line no-shadow

    const nextEmail = email.value
    const error = validate({ email: nextEmail })
    if (error.email) {
      return Promise.reject({ email: error.email })
    }
    if (nextEmail && nextEmail.trim()) {
      return createAccount(nextEmail.trim())
        .then(Promise.resolve())
        .catch(err => Promise.reject({ email: returnErrorKey('signup', 'create-account', err.message) }))
    }
    // TODO add default error message
    return Promise.reject()
  }

  render() {
    const { fields: { email, entity }, handleSubmit, submitting } = this.props // eslint-disable-line no-shadow
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
        <Input
          { ...entity }
          hint={ formatMessage({ id: 'entity-hint-label' }) }
          icon="domain"
          label={ formatMessage({ id: 'entity-label' }) }
          name="entity"
          type="text"
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
    account: state.auth.account
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
      createAccount
    }
  ),
  injectIntl
)(Signup)

export default SignupContainer
