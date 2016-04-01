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
    const { fields: { email }, createAccount } = this.props
    if (event) {
      event.preventDefault()
      const nextEmail = email.value
      if (!nextEmail || !nextEmail.trim()) {
        return
      }
      createAccount(nextEmail.trim())
    }
  }

  render() {
    const { fields: { email } } = this.props
    const { formatMessage }  = this.props.intl

    return (
      <form id="signinForm"
            name="signinForm"
            onSubmit={ this.handleSubmit }
      >
        <TextField
            { ...email }
            name="email"
            hintText={ formatMessage({id:'signin-email-label'}) }
            floatingLabelText={ formatMessage({id:'signin-email-hint-label'}) }
            type="email"
            errorText={ email.touched && email.error ? email.error : '' }
        /><br />
        <RaisedButton
            label={ formatMessage({id:'signin-button-label'}) }
            primary={ true }
            type="submit"
            onTouchTap={ this.handleSubmit }
            className="form-submit"
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
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  createAccount: PropTypes.func.isRequired
}

// Signin container
const mapStateProps = (state) => {
  // return {}
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
