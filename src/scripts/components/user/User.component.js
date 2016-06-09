import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import capitalise from 'lodash/capitalize'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

// Component
import { USER } from '../../commons/identifiers'
import '../../../styles/_commons.less'
import userTheme from './user.scss'
import Avatar from '../_ui/avatar/Avatar.component'

// TODO TU
// User component
export class User extends Component {

  static propTypes = {
    theme: PropTypes.object,
    user: PropTypes.object
  }

  render() {
    const { user, theme } = this.props // eslint-disable-line no-shadow
    const userClasses = classNames(theme.user, theme['user-item'])

    return (
      <div className={ userClasses }>
        <div className={ theme['user-name'] }>
          <Avatar>
            <div className={ theme['user-initials'] }>
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
        <div className={ theme['user-username'] }>
          { user ? user.userName : '-' }
        </div>
        <div className={ theme['user-group'] }>
          { user ? 'admin' : '-' }
        </div>
        <div className={ theme['user-email'] }>
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

const UserContainer = themr(USER, userTheme)(connect(
  mapStateProps,
  {},
  mergeProps
)(User))

export default UserContainer
