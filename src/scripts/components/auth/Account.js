import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// UI
import Paper from 'material-ui/lib/paper'

const style = {
  paper: {
    width: 300,
    paddingTop: '2em',
    paddingBottom: '2em',
    margin: '10% auto auto auto',
    textAlign: 'center',
    display: 'block'
  }
}

// Account component
export const Account = class Account extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { account } = this.props

    return (
      <Paper style={style.paper} zDepth={1}>
        { account.id &&
          <div>
            <p>
              Merci pour votre inscription !<br/>
              Pensez surtout à <strong>enregistrer vos informations de connexion :</strong>
            </p>
            <div>login :</div>
            <div>{account.email}</div>
            <br/>
            <div>password:</div>
            <div>{account.password}</div>
            <p><a href={`data:text/plain;charset=utf-8,${encodeURIComponent(account.sshKeyPublic)}`} download={'kodokojoKey.pub'}>ssh public key</a></p>
            <p><a href={`data:text/plain;charset=utf-8,${encodeURIComponent(account.sshKeyPrivate)}`} download={'kodokojoPrivateKey.txt'}>ssh private key</a></p>
          </div> }
        { !account.id &&
            <div>No account</div>
        }
      </Paper>
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
