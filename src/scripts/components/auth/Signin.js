import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// UI
import Paper from 'material-ui/lib/paper'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import { createAccount } from './signinActions'

const style = {
  button : {
    margin: 12
  },
  paper: {
    width: 300,
    paddingBottom: '2em',
    margin: '10% auto auto auto',
    textAlign: 'center',
    display: 'block'
  }
}

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
      <form name="signin"
            onSubmit={ this.handleSubmit }
      >
        <Paper style={style.paper} zDepth={1}>
          <TextField
              { ...email }
              name="email"
              hintText={formatMessage({id:'signin-email-label'})}
              floatingLabelText={formatMessage({id:'signin-email-hint-label'})}
              type="email"
              errorText={email.touched && email.error ? email.error : ''}
          /><br />
          <RaisedButton
              label={formatMessage({id:'signin-button-label'})}
              primary={ true }
              onTouchTap={ this.handleSubmit }
              style={ style.button }
          /><br/>
          <Link to="/login" title={formatMessage({id:'signin-login-link-label'})}><FormattedMessage id={'signin-login-link-label'}></FormattedMessage></Link>
        </Paper>
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
  injectIntl)(Signin)

export default SigninContainer
