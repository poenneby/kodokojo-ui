import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Account component
// TODO TU
export const Account = class Account extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { account } = this.props

    return (
      <div>
        { account.id &&
          <div>
            <p>
              Merci pour votre inscription !<br/>
              Pensez surtout à <strong>enregistrer vos informations de connexion :</strong>
            </p>
            <div>email :</div>
            <div>{account.email}</div>
            <br/>
            <div>username :</div>
            <div>{account.userName}</div>
            <br/>
            <div>password:</div>
            <div>{account.password}</div>
            <p><a href={`data:text/plain;charset=utf-8,${encodeURIComponent(account.sshKeyPublic)}`} download={'kodokojoKey.pub'}>ssh public key</a></p>
            <p><a href={`data:text/plain;charset=utf-8,${encodeURIComponent(account.sshKeyPrivate)}`} download={'kodokojoPrivateKey.txt'}>ssh private key</a></p>
          </div>
        }
        { !account.id &&
            <div>No account</div>
        }
      </div>
    )
  }

}

Account.propTypes = {
  account: PropTypes.object.isRequired
}

// Account container
const mapStateProps = (state) => {
  return {
    account: state.auth.account
  }
}

const AccountContainer = connect(
    mapStateProps
)(Account)

export default AccountContainer
