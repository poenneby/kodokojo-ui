import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// UI
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import './signin.less'
import { createAccount } from './signinActions'

// Signin component
export const Signin = class Signin extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    const { fields: { email }, createAccount, account } = this.props

    const nextEmail = email.value
    if (!(nextEmail && nextEmail.trim())) {
      return Promise.reject({ email: 'signin-create-account-email-required' })
    } else {
      return createAccount(nextEmail.trim())
    }
  }

  render() {
    const { fields: { email }, handleSubmit, submitting } = this.props
    const { formatMessage }  = this.props.intl

    return (
      <form id="signinForm"
            name="signinForm"
            onSubmit={ handleSubmit(this.handleSubmit) }
      >
        <TextField
            { ...email }
            name="email"
            hintText={ formatMessage({id:'signin-email-label'}) }
            floatingLabelText={ formatMessage({id:'signin-email-hint-label'}) }
            type="email"
            errorText={ email.touched && email.error ? formatMessage({id:email.error}) : '' }
        /><br />
        <RaisedButton
            label={ formatMessage({id:'signin-button-label'}) }
            primary={ true }
            type="submit"
            className="form-submit"
            disabled={submitting}
        /><br/>
        <Link to="/login" title={ formatMessage({id:'signin-login-link-label'}) }>
          <FormattedMessage id={'signin-login-link-label'}/>
        </Link>
      </form>
    )
  }
}

Signin.propTypes = {
  intl: intlShape.isRequired,
  account: PropTypes.object,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  createAccount: PropTypes.func.isRequired
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
      fields: ['email']
    },
    mapStateProps,
    mapDispatchProps
  ),
  injectIntl
)(Signin)

export default SigninContainer
