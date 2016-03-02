import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Login extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.emailInput
  }

  handleSubmit(event) {
    const { sendEmail } = this.props

    if (event) {
      event.preventDefault()
      if (!this.emailInput.value.trim()) {
        return
      }
      sendEmail(this.emailInput.value)
      this.emailInput.value = ''
    }
  }

  render() {
    const { email } = this.props

    return (
        <form name="login"
              onSubmit={ this.handleSubmit }
        >
          <label>email: {email}<br/>
            <input type="text"
                   placeholder="enter your email"
                   ref={ node => {
                    this.emailInput = node
                   }}/><br/>
            <button type="submit">Start using Kodo Kojo!</button>
          </label>
        </form>
    )
  }

}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  sendEmail: PropTypes.func.isRequired
}

export default Login