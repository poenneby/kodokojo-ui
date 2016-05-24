import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import capitalise from 'lodash/capitalize'

// Component
import './user.less'
import Avatar from '../_ui/avatar/Avatar.component'

// TODO TU
// User component
export class User extends Component {

  static propTypes = {
    user: PropTypes.object,
    userId: PropTypes.string,
    users: PropTypes.array
  }

  render() {
    const { users, user, userId } = this.props // eslint-disable-line no-shadow
    console.log(users, user, userId)
    return (
      <div className="user user-item">
        <div className="user-column">
          <Avatar>
            <div className="user-initials">
            { user &&
              user.firstName.substr(0, 1).toUpperCase()
            }
            { user &&
              user.lastName.substr(0, 1).toUpperCase()
            }
            </div>
          </Avatar>
          { user &&
            `${capitalise(user.firstName)} ${capitalise(user.lastName)}`
          }
        </div>
        <div className="user-column">
          { user ? user.userName : '-' }
        </div>
        <div className="user-column">
          { user ? 'admin' : '-' }
        </div>
        <div className="user-column">
          { user ? user.email : '-' }
        </div>
      </div>
    )
  }
}

// User container
const mapStateProps = (state, ownProps) => (
  {
    users: state.users,
    userId: ownProps.userId
  }
)

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...ownProps,
    user: stateProps.users[ownProps.userId]
  }
)

const UserContainer = connect(
  mapStateProps,
  {},
  mergeProps
)(User)

export default UserContainer
