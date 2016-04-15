import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Account component
// TODO TU
export class Account extends Component {

  static propTypes = {
    account: PropTypes.object.isRequired
  }

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
            <p>
              <a download={'kodokojoKey.pub'}
                 href={`data:text/plain;charset=utf-8,${encodeURIComponent(account.sshKeyPublic)}`}
              >ssh public key</a>
            </p>
            <p>
              <a download={'kodokojoPrivateKey.txt'}
                 href={`data:text/plain;charset=utf-8,${encodeURIComponent(account.sshKeyPrivate)}`}
              >ssh private key</a>
            </p>
          </div>
        }
        { !account.id &&
            <div>No account</div>
        }
      </div>
    )
  }

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
