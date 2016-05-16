import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import { combineValidators } from 'revalidate'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

// Component
import './signup.less'
import { createAccount } from './signup.actions.js'
import { emailValidator } from '../../services/validatorService'
import { returnErrorKey } from '../../services/errorService'

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
        ).then(() => {
          return Promise.resolve()
        }).catch(error => {
          return Promise.reject({ email: returnErrorKey('signup', 'create-auth', error.message) })
        })
      }
    }
  }

  render() {
    const { fields: { email, entity }, handleSubmit, submitting } = this.props
    const { formatMessage }  = this.props.intl

    return (
      <form id="signupForm"
            name="signupForm"
            noValidate
            onSubmit={ handleSubmit(this.handleSubmit) }
      >
        <TextField
            { ...email }
            errorText={ email.touched && email.error ? formatMessage({ id: email.error }, {fieldName: formatMessage({ id:'email-input-label' })}) : '' }
            floatingLabelText={ formatMessage({id: 'signup-email-label'}) }
            hintText={ formatMessage({id: 'signup-email-hint-label'}) }
            name="email"
            type="email"
        /><br />
        <TextField
          { ...entity }
          floatingLabelText={ formatMessage({id: 'signup-entity-label'}) }
          hintText={ formatMessage({id: 'signup-entity-hint-label'}) }
          name="entity"
          type="text"
        /><br />
        <RaisedButton
            className="form-submit"
            disabled={ submitting }
            label={ formatMessage({ id:'signup-button-label' }) }
            onTouchTap={ handleSubmit(this.handleSubmit) }
            primary
            type="submit"
        /><br/>
        <Link title={ formatMessage({ id:'signup-login-link-label' }) }
              to="/login"
        >
          <FormattedMessage id={'signup-login-link-label'}/>
        </Link>
      </form>
    )
  }
}

// Signup container
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

const SignupContainer = compose(
  reduxForm(
    {
      form: 'signupForm',
      fields: ['email', 'entity'],
      touchOnChange: true,
      validate
    },
    mapStateProps,
    mapDispatchProps
  ),
  injectIntl
)(Signup)

export default SignupContainer
