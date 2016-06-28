import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Account component
import utilsTheme from '../../../styles/_utils.scss'

// TODO TU
// TODO implement i18n
export class Account extends Component {

  static propTypes = {
    account: PropTypes.object.isRequired
  }

  render() {
    const { account } = this.props // eslint-disable-line no-shadow

    return (
      <div>
        { account.id &&
          <div>
            <p>
              <b>Thanks for your subscription!</b><br/>
              Remember to <strong className={ utilsTheme['secondary-color--1'] }>save all your connexion information:</strong>
            </p>
            <div>
              <b>email:</b>
            </div>
            <div>{account.email}</div>
            <br/>
            <div>
              <b>username:</b>
            </div>
            <div>{account.userName}</div>
            <br/>
            <div>
              <b>password:</b>
            </div>
            <div>{account.password}</div>
            { account.sshKeyPublic &&
              <p>
              <a download={'kodokojoKey.pub'}
                 href={`data:text/plain;charset=utf-8,${encodeURIComponent(account.sshKeyPublic)}`}
              >ssh public key</a>
              </p>
            }
            { account.sshKeyPrivate &&
              <p>
                <a download={'kodokojoPrivateKey.txt'}
                   href={`data:text/plain;charset=utf-8,${encodeURIComponent(account.sshKeyPrivate)}`}
                >ssh private key</a>
              </p>
            }
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
const mapStateProps = (state) => (
  {
    account: state.auth.account || {}
  }
)

const AccountContainer = connect(
    mapStateProps
)(Account)

export default AccountContainer
