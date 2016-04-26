import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import { combineValidators } from 'revalidate'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// UI
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

// Component
import './signin.less'
import { createAccount } from './signin.actions'
import { emailValidator } from '../../services/validatorService'
import { returnErrorKey } from '../../services/errorService'

// validate function
const validate = combineValidators({
  email: emailValidator('email')
})

// Signin component
export class Signin extends Component {

  static propTypes = {
    account: PropTypes.object,
    createAccount: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
  }

  handleSubmit = () => {
    const { fields: { email }, createAccount } = this.props

    const nextEmail = email.value
    const error = validate({ email: nextEmail })
    if (error.email) {
      return Promise.reject({ email: error.email })
    } else {
      if (nextEmail && nextEmail.trim()) {
        return createAccount(nextEmail.trim()
        ).then(
          Promise.resolve()
        ).catch(error => {
          return Promise.reject({ email: returnErrorKey('signin', 'create-account', error.message) })
        })
      }
    }
  }

  render() {
    const { fields: { email }, handleSubmit, submitting } = this.props
    const { formatMessage }  = this.props.intl

    return (
      <form id="signinForm"
            name="signinForm"
            noValidate
            onSubmit={ handleSubmit(this.handleSubmit) }
      >
        <TextField
            { ...email }
            errorText={ email.touched && email.error ? formatMessage({ id: email.error }, {fieldName: formatMessage({ id:'email-input-label' })}) : '' }
            floatingLabelText={ formatMessage({id: 'signin-email-label'}) }
            hintText={ formatMessage({id: 'signin-email-hint-label'}) }
            name="email"
            type="email"
        /><br />
        <RaisedButton
            className="form-submit"
            disabled={ submitting }
            label={ formatMessage({ id:'signin-button-label' }) }
            primary
            type="submit"
        /><br/>
        <Link title={ formatMessage({ id:'signin-login-link-label' }) }
              to="/login"
        >
          <FormattedMessage id={'signin-login-link-label'}/>
        </Link>
      </form>
    )
  }
}

// Signin container
const mapStateProps = (state) => {
  return {
    account: state.auth.account
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    createAccount: (email) => dispatch(createAccount(email))
  }
}

const SigninContainer = compose(
  reduxForm(
    {
      form: 'signinForm',
      fields: ['email'],
      touchOnChange: true,
      validate
    },
    mapStateProps,
    mapDispatchProps
  ),
  injectIntl
)(Signin)

export default SigninContainer
