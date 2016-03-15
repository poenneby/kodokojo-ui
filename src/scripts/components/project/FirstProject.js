import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//import { sendEmail } from './loginActions'

// Login component
export const FirstProject = class FirstProject extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { account, email } = this.props

    return (
      <div>
        <div>
          <p>
            Merci de vouys êtes inscrit.<br/>
            Pensez surtout à <strong>enregistrer vos détails de connexion ci-dessous :</strong>
          </p>
        </div>
        <div>
          <div>login:</div>
          <div>{email}</div>
        </div>
        <div>
          <div>password:</div>
          <div>{account.password}</div>
        </div>
        <div>
          <div><a href={`text/plain;charset=utf-8,${encodeURIComponent(account.sshPublicKey)}`} download={'kodokojoKey.pub'}>ssh public key</a></div>
        </div>
        <div>
          <div><a href={`text/plain;charset=utf-8,${encodeURIComponent(account.privateKey)}`} download={'kodokojoPrivateKey.txt'}>ssh private key</a></div>
        </div>
        {/* JSON.stringify(account) */}
      </div>
    )
  }

}

FirstProject.propTypes = {
  account: PropTypes.object.isRequired
}

// FirstProject container
const mapStateProps = (state) => {
  console.log(state)
  return {
    account: state.login.account,
    email: state.login.email
  }
}

//const mapDispatchProps = (dispatch) => {
//  return {
//    sendEmail: (email) => dispatch(sendEmail(email))
//  }
//}

const FirstProjectContainer = connect(
    mapStateProps
    //mapDispatchProps
)(FirstProject)

export default FirstProjectContainer
