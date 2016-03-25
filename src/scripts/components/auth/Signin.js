import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

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

    return (
      <form name="signin"
            onSubmit={ this.handleSubmit }
      >
        <Paper style={style.paper} zDepth={1}>
          <TextField
              { ...email }
              hintText="your.email@domain.ext"
              floatingLabelText="Email"
              type="email"
              errorText={email.touched && email.error ? email.error : ''}
          /><br />
          <RaisedButton
              label="Sign in"
              primary={ true }
              style={ style.button }
              onTouchTap={ this.handleSubmit }
          /><br/>
          <Link to="/login">Already a user? Go to login!</Link>
        </Paper>
      </form>
    )
  }

}

Signin.propTypes = {
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  createAccount: PropTypes.func.isRequired
}

// Signin container
const mapStateProps = (state) => {
  return {}
}

const mapDispatchProps = (dispatch) => {
  return {
    createAccount: (email) => dispatch(createAccount(email))
  }
}

const SigninContainer = reduxForm(
  {
    form: 'signinForm',
    fields: ['email']
  },
  mapStateProps,
  mapDispatchProps
)(Signin)

export default SigninContainer
